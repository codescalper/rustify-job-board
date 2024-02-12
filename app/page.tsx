import JobFilterSideBar from "@/components/JobFilterSideBar";
import JobListItem from "@/components/JobList";
import JobResults from "@/components/JobResults";
import prisma from "@/lib/prisma";
import { JobFilterValue } from "@/lib/validation";
import Image from "next/image";

interface PageProps{
  searchParams:{
    q?:string,
    location?:string,
    type?:string,
    remote?:boolean

  }
}
export default async function Home({
  searchParams:{q,location,type,remote}
}:PageProps) {

  const filterValues:JobFilterValue = {
    q:q || "",
    location,
    type,
    remote:remote === true
  }
 
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
              <span className="ml-2 text-zinc-300">Rustify</span>{" "}
            </h1>
          </div>
          <p>
            Rustify is a job board for Rust developers. Find your next Rust job
            here! 🦀
          </p>
        </div>
        <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSideBar defaultValues={filterValues} />
        <JobResults filterValues={filterValues}/>
        </section>
      </main>
    </>
  );
}
