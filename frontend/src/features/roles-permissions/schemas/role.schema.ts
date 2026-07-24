import { z } from "zod";

export const roleSchema = z.object({
  name: z
    .string()
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name must not exceed 50 characters"),

  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must not exceed 500 characters"),

  department: z.enum(
    [
      "SALES",
      "HR",
      "MARKETING",
      "FINANCE",
      "OPERATIONS",
      "MANAGEMENT",
      "OTHER",
    ],
    {
      message: "Please select a department",
    }
  ),

  level: z.enum(
    [
      "SUPER_ADMIN",
      "ADMIN",
      "MANAGER",
      "TEAM_LEAD",
      "USER",
    ],
    {
      message: "Please select a role level",
    }
  ),

  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Please select a status",
  }),

  permissions: z
    .array(z.string())
    .min(1, "Please select at least one permission"),
});

export type RoleFormData = z.infer<typeof roleSchema>;