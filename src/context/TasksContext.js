import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useTasks } from '@/hooks/useTasks';
// interface UseTasksState {
//   tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   derivedSorted: DerivedTask[];
//   metrics: Metrics;
//   lastDeleted: Task | null;
//   addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
//   updateTask: (id: string, patch: Partial<Task>) => void;
//   deleteTask: (id: string) => void;
//   undoDelete: () => void;
// }
//  tasks: Task[];
//   loading: boolean;
//   error: string | null;
//   derivedSorted: DerivedTask[];
//   metrics: Metrics;
//   lastDeleted: Task | null;
//   addTask: (task: Omit<Task, 'id'> & { id?: string }) => void;
//   updateTask: (id: string, patch: Partial<Task>) => void;
//   deleteTask: (id: string) => void;
//   undoDelete: () => void;
//   clearLastDeleted: () => void;
const TasksContext = createContext(undefined);
export function TasksProvider({ children }) {
    const value = useTasks();
    return _jsx(TasksContext.Provider, { value: value, children: children });
}
export function useTasksContext() {
    const ctx = useContext(TasksContext);
    if (!ctx)
        throw new Error('useTasksContext must be used within TasksProvider');
    return ctx;
}
