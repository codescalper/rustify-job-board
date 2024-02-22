import { JobFilterValue } from "@/lib/validation";
import JobListItem from "./JobList";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobResultsProps {
  filterValues: JobFilterValue;
  page?: number;
}

export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const { q, location, type, remote } = filterValues;
  const searchString =
    q
      ?.split(" ")
      .filter((word) => word.length > 0)
      .join(" & ") || "";

  const jobsPerPage = 5;

  const skip = (page - 1) * jobsPerPage;
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

  const jobsPromise = prisma.jOB.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.jOB.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/job/${job.slug}`} passHref key={job.id}>
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <div className="mx-auto text-center">
          <p>No jobs found! </p>
        </div>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValue;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
