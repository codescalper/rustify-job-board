import JobListItem from "@/components/JobList";
import prisma from "@/lib/prisma";
import Image from "next/image";
export default async function Home() {
  const jobs = await prisma.jOB.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
        <div className="space-y-5 text-center">
          <div className="flex items-center justify-center">
            {" "}
            <h1 className="text-4xl flex font-extrabold tracking-tight lg:text-5xl">
              <Image
                src="/rustify.png"
                alt="Rustify logo"
                width={60}
                height={30}
              />
              <span className="ml-2">Rustify</span>{" "}
            </h1>
          </div>
          <p>
            Rustify is a job board for Rust developers. Find your next Rust job
            here! 🦀
          </p>
        </div>
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </main>
    </>
  );
}
