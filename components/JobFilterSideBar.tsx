import { Input } from "./ui/input";
import { Label } from "./ui/label";

async function filterJobs(formData:FormData) {
    "use server"
 }

export default function JobFilterSideBar() {
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
        <form action={filterJobs}>
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                <Label htmlFor="search">Search</Label>
                <Input name="search" id="search" placeholder="Title, company, etc." />
                </div>
            </div>
        </form>
    </aside>
  );
}

//https://youtu.be/XD5FpbVpWzk?t=4727 Learn more about server compoenent
