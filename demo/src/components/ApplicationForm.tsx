import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAdminStore } from '@/lib/store';
import { Job } from '@/types/job';
import { FormField } from '@/types/admin';

interface ApplicationFormProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultFields: FormField[] = [
  { id: 'fullName', label: 'Full Name', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
  { id: 'experience', label: 'Years of Experience', type: 'number', required: true },
  { id: 'coverLetter', label: 'Cover Letter', type: 'textarea', required: true },
  { id: 'resume', label: 'Resume Link', type: 'url', required: true, placeholder: 'Link to your resume (Google Drive, Dropbox, etc.)' },
];

export function ApplicationForm({ job, open, onOpenChange }: ApplicationFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const addApplication = useAdminStore((state) => state.addApplication);
  const getCustomForm = useAdminStore((state) => state.getCustomForm);
  const { toast } = useToast();
  const [fields, setFields] = useState<FormField[]>(defaultFields);

  useEffect(() => {
    const customForm = getCustomForm(job.id);
    if (customForm) {
      setFields(customForm.fields);
    } else {
      setFields(defaultFields);
    }
  }, [job.id, getCustomForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const application = {
      id: crypto.randomUUID(),
      jobId: job.id,
      jobTitle: job.title,
      ...formData,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
    };

    addApplication(application);
    toast({
      title: 'Application Submitted',
      description: 'Your application has been successfully submitted.',
    });
    onOpenChange(false);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
        </DialogHeader>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.id}
                    required={field.required}
                    className="min-h-[150px]"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    required={field.required}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}