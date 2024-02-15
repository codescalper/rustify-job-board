import { JobFilterValue } from "@/lib/validation";
import JobListItem from "./JobList";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
  filterValues: JobFilterValue;
}

export default async function JobResults({
  filterValues: { q, location, type, remote },
}: JobResultsProps) {
  const searchString =
    q
      ?.split(" ")
      .filter((word) => word.length > 0)
      .join(" & ") || "";
  const searchFilter: Prisma.JOBWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JOBWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.jOB.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 && (
        <div className="mx-auto text-center">
          <p>No jobs found! </p>
        </div>
      )}
    </div>
  );
}
