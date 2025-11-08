import { useCallback, useEffect, useMemo, useState } from 'react';
import { computeAverageROI, computePerformanceGrade, computeRevenuePerHour, computeTimeEfficiency, computeTotalRevenue, withDerived, sortTasks as sortDerived, } from '@/utils/logic';
import { generateSalesTasks } from '@/utils/seed';
const INITIAL_METRICS = {
    totalRevenue: 0,
    totalTimeTaken: 0,
    timeEfficiencyPct: 0,
    revenuePerHour: 0,
    averageROI: 0,
    performanceGrade: 'Needs Improvement',
};
export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastDeleted, setLastDeleted] = useState(null);
    function normalizeTasks(input) {
        const now = Date.now();
        return (Array.isArray(input) ? input : []).map((t, idx) => {
            const created = t.createdAt ? new Date(t.createdAt) : new Date(now - (idx + 1) * 24 * 3600 * 1000);
            const completed = t.completedAt || (t.status === 'Done' ? new Date(created.getTime() + 24 * 3600 * 1000).toISOString() : undefined);
            return {
                id: t.id,
                title: t.title,
                revenue: Number(t.revenue) ?? 0,
                timeTaken: Number(t.timeTaken) > 0 ? Number(t.timeTaken) : 1,
                priority: t.priority,
                status: t.status,
                notes: t.notes,
                createdAt: created.toISOString(),
                completedAt: completed,
            };
        });
    }
    // Initial load: public JSON -> fallback generated dummy
    useEffect(() => {
        let active = true; // guards setState after unmount/StrictMode test phase
        const ac = new AbortController();
        (async () => {
            try {
                const res = await fetch('/tasks.json', { signal: ac.signal });
                if (!res.ok)
                    throw new Error(`Failed to load tasks.json (${res.status})`);
                const data = (await res.json());
                const normalized = normalizeTasks(data);
                let finalData = normalized.length > 0 ? normalized : generateSalesTasks(50);
                // If you still want to keep the "injected bug" during development, leave it.
                // Otherwise, remove this block entirely to avoid bad rows.
                if (Math.random() < 0.5) {
                    finalData = [
                        ...finalData,
                        { id: undefined, title: '', revenue: NaN, timeTaken: 0, priority: 'High', status: 'Todo' },
                        { id: finalData[0]?.id ?? 'dup-1', title: 'Duplicate ID', revenue: 9999999999, timeTaken: -5, priority: 'Low', status: 'Done' },
                    ];
                }
                if (active)
                    setTasks(finalData);
            }
            catch (e) {
                if (e?.name === 'AbortError')
                    return; // ignore StrictMode abort
                if (active)
                    setError(e?.message ?? 'Failed to load tasks');
            }
            finally {
                if (active)
                    setLoading(false);
            }
        })();
        return () => {
            active = false;
            ac.abort(); // cancel first effect run in StrictMode
        };
    }, []);
    const derivedSorted = useMemo(() => {
        const withRoi = tasks.map(withDerived);
        return sortDerived(withRoi);
    }, [tasks]);
    const metrics = useMemo(() => {
        if (tasks.length === 0)
            return INITIAL_METRICS;
        const totalRevenue = computeTotalRevenue(tasks);
        const totalTimeTaken = tasks.reduce((s, t) => s + t.timeTaken, 0);
        const timeEfficiencyPct = computeTimeEfficiency(tasks);
        const revenuePerHour = computeRevenuePerHour(tasks);
        const averageROI = computeAverageROI(tasks);
        const performanceGrade = computePerformanceGrade(averageROI);
        return { totalRevenue, totalTimeTaken, timeEfficiencyPct, revenuePerHour, averageROI, performanceGrade };
    }, [tasks]);
    const addTask = useCallback((task) => {
        setTasks(prev => {
            const id = task.id ?? crypto.randomUUID();
            const timeTaken = task.timeTaken <= 0 ? 1 : task.timeTaken; // auto-correct
            const createdAt = new Date().toISOString();
            const status = task.status;
            const completedAt = status === 'Done' ? createdAt : undefined;
            return [...prev, { ...task, id, timeTaken, createdAt, completedAt }];
        });
    }, []);
    const updateTask = useCallback((id, patch) => {
        setTasks(prev => {
            const next = prev.map(t => {
                if (t.id !== id)
                    return t;
                const merged = { ...t, ...patch };
                if (t.status !== 'Done' && merged.status === 'Done' && !merged.completedAt) {
                    merged.completedAt = new Date().toISOString();
                }
                return merged;
            });
            // Ensure timeTaken remains > 0
            return next.map(t => (t.id === id && (patch.timeTaken ?? t.timeTaken) <= 0 ? { ...t, timeTaken: 1 } : t));
        });
    }, []);
    const deleteTask = useCallback((id) => {
        setTasks(prev => {
            const target = prev.find(t => t.id === id) || null;
            setLastDeleted(target);
            return prev.filter(t => t.id !== id);
        });
    }, []);
    const undoDelete = useCallback(() => {
        if (!lastDeleted)
            return;
        setTasks(prev => [...prev, lastDeleted]);
        setLastDeleted(null);
    }, [lastDeleted]);
    const clearLastDeleted = useCallback(() => {
        setLastDeleted(null);
    }, []);
    return {
        tasks,
        loading,
        error,
        derivedSorted,
        metrics,
        lastDeleted,
        addTask,
        updateTask,
        deleteTask,
        undoDelete,
        clearLastDeleted,
    };
}
