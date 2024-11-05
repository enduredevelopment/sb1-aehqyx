import { ArrowRight, Briefcase, DollarSign, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  department: string;
  isNew?: boolean;
  type: string;
  onViewJob: () => void;
}

export function JobCard({
  title,
  company,
  location,
  salary,
  department,
  isNew,
  type,
  onViewJob
}: JobCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isNew && <Badge variant="secondary">New</Badge>}
              <Badge variant="outline">{type}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onViewJob}>
              View Job
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{company}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{department}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{salary}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}