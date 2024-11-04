export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  department: string;
  isNew?: boolean;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applyUrl: string;
}