import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(18, "Must be at least 18"),
});

export type UserFormData = z.infer<typeof userSchema>;
