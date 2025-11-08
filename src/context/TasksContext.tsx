import { createContext, useContext, ReactNode } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { DerivedTask, Metrics, Task } from '@/types';
import { UseTasksState } from '@/hooks/useTasks';
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

const TasksContext = createContext<UseTasksState | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext(): UseTasksState {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used within TasksProvider');
  return ctx as UseTasksState;
}


