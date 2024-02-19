import { Metadata } from "next"
import NewJobForm from "./NewJobForm"


export const metadata: Metadata = {
    title: "Create a Job",
    description: "Create a job on the job board",
}

const Page = () => {
  return (
   <NewJobForm />
  )
}

export default Page