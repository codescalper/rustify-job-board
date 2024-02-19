import {z} from 'zod';
import { jobTypes, locationTypes } from './job-types';

const compnayLogoSchema = z.custom<File | undefined>().refine((val) => {
    if (val) {
      !val || val instanceof File && val.type.startsWith("image/");
    }
},"Must be an image file").refine(val => !val|| val.size < 1024*1024*2,"Image size must be less than 2MB")
  
const numericRegex = (/^\d+$/);

const locationSchema = z
  .object({
    locationType: z.string().min(1, "Required").refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

const applicationSchema = z.object({
  
    applicationEmail:z.string().email().max(100,"Email must be less than 100 characters").optional().or(z.literal("")),
    applicationUrl:z.string().url().max(200,"URL must be less than 200 characters").optional().or(z.literal("")),
}).refine(val => val.applicationEmail || val.applicationUrl,{
    message:"Either email or URL is required",
    path:["applicationEmail"]
})

export const createJobSchema = z.object({
    title:z.string().min(1,"Required").max(100),
    type:z.string().min(1,"Required").refine(val =>jobTypes.includes(val),"Invalid job type"),
    companyName:z.string().min(1,"Required").max(100),
    companyLogo:compnayLogoSchema,
    description:z.string().max(5000).optional(),
    salary:z.string().min(1,"Required").max(9,"Number must be less than 9 digits").regex(numericRegex,"Must be a number"),

}).and(applicationSchema)

export const JobFilterSchema = z.object({
    q:z.string().optional(),
    type :z.string().optional(),
    location:z.string().optional(),
    remote: z.coerce.boolean().optional()
})

export type JobFilterValue = z.infer<typeof JobFilterSchema>
export type CreateJobValue = z.infer<typeof createJobSchema>