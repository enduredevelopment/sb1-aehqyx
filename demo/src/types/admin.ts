export interface Admin {
  username: string;
  password: string;
  role: 'admin' | 'recruiter';
}

export interface JobForm {
  jobId: number;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'number' | 'url';
  required: boolean;
  placeholder?: string;
}