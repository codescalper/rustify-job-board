import JobFilterSideBar from "@/components/JobFilterSideBar";
import JobListItem from "@/components/JobList";
import JobResults from "@/components/JobResults";
import prisma from "@/lib/prisma";
import { JobFilterValue } from "@/lib/validation";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    remote?: boolean;
  };
}

export default async function Home({
  searchParams: { q, location, type, remote },
}: PageProps) {
  const filterValues: JobFilterValue = {
    q: q || "",
    location,
    type,
    remote: remote === "true",
  };

  function getTitle({ q, type, location, remote }: JobFilterValue) {
    const titlePrefix = q
      ? `${q} jobs`
      : type
        ? `${type} developer jobs`
        : remote
          ? "Remote developer jobs"
          : "All developer jobs";

    const titleSuffix = location ? ` in ${location}` : "";

    return `${titlePrefix}${titleSuffix}`;
  }

  function generateMetadata({
    searchParams: { q, type, location, remote },
  }: PageProps): Metadata {
    return {
      title: `${getTitle({
        q,
        type,
        location,
        remote: remote === true,
      })} | Rustify Jobs`,
    };
  }

  return (
    <>
      <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
        <div className="space-y-5 text-center">
          <div className="flex items-center justify-center">
            {" "}
            <h1 className="flex text-4xl font-extrabold tracking-tight lg:text-5xl">
              <span className="ml-2 text-zinc-300">
                {getTitle(filterValues)}
              </span>
            </h1>
          </div>
          <p>
            Rustify is a job board for Rust developers. Find your next Rust job
            here! 🦀
          </p>
        </div>
        <section className="flex flex-col gap-4 md:flex-row">
          <JobFilterSideBar defaultValues={filterValues} />
          <JobResults filterValues={filterValues} />
        </section>
      </main>
    </>
  );
}
