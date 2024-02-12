import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma";
async function filterJobs(formData: FormData) {
  "use server";
}

export default async function JobFilterSideBar() {
  const distinctLocation = (await prisma.jOB
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    })
    .then((locations) =>
      locations
        .map((location) => {
          location;
        })
        .filter(Boolean),
    )) as string[]
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              name="search"
              id="search"
              placeholder="Title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue=""
              placeholder="Select Location"
            >
              <option value="">All locations</option>
              {
                distinctLocation.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))
              }
            </Select>
          </div>
        </div>
      </form>
    </aside>
  );
}
