import { JOB } from "@prisma/client";
import Image from "next/image";
import companyLogo from "../public/company-logo-placeholder.png";
import {Briefcase} from 'lucide-react';
interface JobsListProps {
  job: JOB;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobsListProps) {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60 ">
      <Image
        src={companyLogoUrl || companyLogo}
        alt={`${companyName} logo`}
        width={100}
        height={100}
      />

      <div className="flex-grow space-y-3 ">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" /> 
            {type}
          </p>
          
        </div>

      </div>
    </article>
  );
}
