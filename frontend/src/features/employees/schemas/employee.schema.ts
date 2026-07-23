import { z } from "zod";

export const employeeSchema = z.object({
  // Employee Information
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),

  // Contact Information
  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),

  // Work Information
  department: z
    .string()
    .min(1, "Department is required"),

  designation: z
    .string()
    .min(1, "Designation is required"),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERN",
    "FREELANCE",
  ]),

  status: z.enum([
    "ACTIVE",
    "INACTIVE",
    "ON_LEAVE",
    "TERMINATED",
    "PROBATION",
  ]),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  // Work Details
  location: z
    .string()
    .optional(),

  shift: z
    .string()
    .optional(),

  // Salary
  salary: z
    .coerce
    .number()
    .min(0, "Salary cannot be negative")
    .optional(),

  // Optional Address
  address: z
    .string()
    .optional(),

  city: z
    .string()
    .optional(),

  state: z
    .string()
    .optional(),

  country: z
    .string()
    .optional(),

  postalCode: z
    .string()
    .optional(),

  // Emergency Contact
  emergencyContactName: z
    .string()
    .optional(),

  emergencyContactPhone: z
    .string()
    .optional(),

  emergencyContactRelation: z
    .string()
    .optional(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;