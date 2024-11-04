import { ArrowLeft, Briefcase, Building2, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';
import { useNavigate } from 'react-router-dom';

interface JobInfoProps {
  job: Job;
}

export function JobInfo({ job }: JobInfoProps) {
  const navigate = useNavigate();

  const handleApply = () => {
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{job.title}</h1>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{job.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{job.department}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.isNew && <Badge variant="secondary">New</Badge>}
            <Badge variant="outline">{job.type}</Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">About the Role</h2>
              <p className="text-muted-foreground">{job.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>

          <Button size="lg" className="w-full sm:w-auto" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
      </Card>
    </div>
  );
}