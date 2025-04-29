export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskFilter {
  status: 'all' | 'active' | 'completed';
  category: string;
}