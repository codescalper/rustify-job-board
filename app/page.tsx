import JobListItem from "@/components/JobList";
import prisma from "@/lib/prisma";

export default async function  Home() {
  const jobs = await prisma.jOB.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return <>
   <main>



      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}

   </main>
  </>;
}
