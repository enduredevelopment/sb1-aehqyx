import { useParams } from 'react-router-dom';
import { JobInfo } from '@/components/JobInfo';
import { jobs } from '@/data/jobs';
import { Navigate } from 'react-router-dom';

export function JobPage() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === Number(id));

  if (!job) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <JobInfo job={job} />
    </div>
  );
}