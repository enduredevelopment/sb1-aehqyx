export interface Application {
  id: string;
  jobId: number;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: string;
  status: 'pending' | 'accepted' | 'rejected' | 'on_hold';
  submittedAt: string;
}