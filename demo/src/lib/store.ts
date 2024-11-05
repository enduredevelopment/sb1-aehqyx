import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Application } from '@/types/application';
import { Admin, JobForm } from '@/types/admin';

interface AdminStore {
  applications: Application[];
  admins: Admin[];
  customForms: JobForm[];
  addApplication: (application: Application) => void;
  deleteApplication: (id: string) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  isAuthenticated: boolean;
  currentAdmin: Admin | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addAdmin: (admin: Admin) => void;
  removeAdmin: (username: string) => void;
  setCustomForm: (jobForm: JobForm) => void;
  getCustomForm: (jobId: number) => JobForm | null;
}

const defaultAdmins: Admin[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'recruiter1', password: 'recruit123', role: 'recruiter' },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      applications: [],
      admins: defaultAdmins,
      customForms: [],
      currentAdmin: null,
      isAuthenticated: false,
      
      addApplication: (application) =>
        set((state) => ({
          applications: [...state.applications, application],
        })),
      
      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),
      
      updateApplicationStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status } : app
          ),
        })),
      
      login: (username, password) => {
        const admin = get().admins.find(
          (a) => a.username === username && a.password === password
        );
        if (admin) {
          set({ isAuthenticated: true, currentAdmin: admin });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isAuthenticated: false, currentAdmin: null }),
      
      addAdmin: (admin) =>
        set((state) => ({
          admins: [...state.admins, admin],
        })),
      
      removeAdmin: (username) =>
        set((state) => ({
          admins: state.admins.filter((admin) => admin.username !== username),
        })),
      
      setCustomForm: (jobForm) =>
        set((state) => ({
          customForms: [
            ...state.customForms.filter((form) => form.jobId !== jobForm.jobId),
            jobForm,
          ],
        })),
      
      getCustomForm: (jobId) => {
        const form = get().customForms.find((form) => form.jobId === jobId);
        return form || null;
      },
    }),
    {
      name: 'admin-store',
    }
  )
);