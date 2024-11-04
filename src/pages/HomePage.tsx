import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { JobList } from '@/components/JobList';
import { useState } from 'react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Find your next role</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover opportunities that match your experience and goals
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, keyword, or company"
            className="pl-10 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Latest Opportunities</h2>
          <JobList searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}