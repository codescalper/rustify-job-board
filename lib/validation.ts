import { z } from "zod";
export const JobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValue = z.infer<typeof JobFilterSchema>;
