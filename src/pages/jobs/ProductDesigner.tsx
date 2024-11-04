import { JobInfo } from '@/components/JobInfo';
import { jobs } from '@/data/jobs';

export function ProductDesigner() {
  const job = jobs[1];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <JobInfo job={job} />
    </div>
  );
}