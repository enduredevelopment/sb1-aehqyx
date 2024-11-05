import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, UserPlus, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Admin } from '@/types/admin';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState<Partial<Admin>>({
    username: '',
    password: '',
    role: 'recruiter',
  });

  const {
    applications,
    updateApplicationStatus,
    deleteApplication,
    isAuthenticated,
    currentAdmin,
    logout,
    addAdmin,
    removeAdmin,
  } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDeleteApplication = (id: string) => {
    deleteApplication(id);
    toast({
      title: 'Application Deleted',
      description: 'The application has been permanently removed.',
    });
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdmin.username && newAdmin.password && newAdmin.role) {
      addAdmin(newAdmin as Admin);
      toast({
        title: 'Admin Added',
        description: `New ${newAdmin.role} account created successfully.`,
      });
      setShowAddAdmin(false);
      setNewAdmin({ username: '', password: '', role: 'recruiter' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Applications Dashboard</h1>
            <p className="text-muted-foreground">
              Logged in as {currentAdmin?.username} ({currentAdmin?.role})
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {currentAdmin?.role === 'admin' && (
              <Button onClick={() => setShowAddAdmin(true)} variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            )}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.jobTitle}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{application.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {application.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(application.submittedAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={application.status}
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          value as typeof application.status
                        )
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(application.resume, '_blank')}
                      >
                        View Resume
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteApplication(application.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No applications yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                value={newAdmin.username}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newAdmin.role}
                onValueChange={(value) =>
                  setNewAdmin({ ...newAdmin, role: value as Admin['role'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddAdmin(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Admin</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}