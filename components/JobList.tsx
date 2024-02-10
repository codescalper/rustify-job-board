import { JOB } from "@prisma/client";
interface JobsListProps {
    job:JOB
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
    return(
        <article>
            {title}
        </article>
    )

  }