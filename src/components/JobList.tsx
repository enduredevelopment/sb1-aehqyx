import { JobCard } from './JobCard';
import { jobs } from '@/data/jobs';
import { useNavigate } from 'react-router-dom';

interface JobListProps {
  searchQuery: string;
}

export function JobList({ searchQuery }: JobListProps) {
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.department.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No jobs found matching your search criteria.</p>
        </div>
      ) : (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            {...job}
            onViewJob={() => navigate(`/job/${job.id}`)}
          />
        ))
      )}
    </div>
  );
}
