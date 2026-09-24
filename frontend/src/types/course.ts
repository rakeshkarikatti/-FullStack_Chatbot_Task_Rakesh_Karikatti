export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  format: string;
  description: string;
  modules: string[];
  prerequisites?: string;
}
