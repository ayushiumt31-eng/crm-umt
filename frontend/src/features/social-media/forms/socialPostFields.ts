import type { FormField } from "@/components/common/DataForm";

export const socialPostFields: FormField[] = [
  {
    name: "title",
    label: "Post Title",
    type: "text",
    placeholder: "e.g., New Service Announcement",
    required: true,
    validation: (value: string) => {
      if (!value) return "Post title is required";
      if (value.length < 3) return "Title must be at least 3 characters";
      if (value.length > 200) return "Title must be at most 200 characters";
      return null;
    },
  },
  {
    name: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: [
      { label: "Facebook", value: "FACEBOOK" },
      { label: "Instagram", value: "INSTAGRAM" },
      { label: "LinkedIn", value: "LINKEDIN" },
    ],
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    placeholder: "Write your social media post content here...",
    required: true,
    fullWidth: true,
    validation: (value: string) => {
      if (!value) return "Content is required";
      if (value.length < 10) return "Content must be at least 10 characters";
      if (value.length > 2000) return "Content must be at most 2000 characters";
      return null;
    },
  },
  {
    name: "mediaType",
    label: "Media Type",
    type: "select",
    required: false,
    options: [
      { label: "None", value: "NONE" },
      { label: "Image", value: "IMAGE" },
      { label: "Video", value: "VIDEO" },
    ],
  },
  {
    name: "mediaUrl",
    label: "Media URL",
    type: "text",
    placeholder: "https://example.com/image.jpg",
    required: false,
    validation: (value: string) => {
      if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
        return "Media URL must be a valid URL starting with http:// or https://";
      }
      return null;
    },
  },
  {
    name: "campaignId",
    label: "Campaign",
    type: "select",
    required: false,
    options: [
      { label: "None", value: "" },
      { label: "Product Launch Q3", value: "sc-001" },
      { label: "Brand Awareness Q3", value: "sc-002" },
      { label: "Sustainability Campaign", value: "sc-003" },
      { label: "Instagram Engagement Push", value: "sc-004" },
      { label: "LinkedIn Thought Leadership", value: "sc-005" },
    ],
  },
  {
    name: "scheduleType",
    label: "Schedule Type",
    type: "select",
    required: true,
    options: [
      { label: "Save as Draft", value: "DRAFT" },
      { label: "Schedule for Later", value: "SCHEDULE" },
      { label: "Publish Now", value: "PUBLISH_NOW" },
    ],
  },
  {
    name: "scheduledAt",
    label: "Scheduled Date & Time",
    type: "text",
    placeholder: "YYYY-MM-DDTHH:mm (e.g., 2026-09-01T10:00)",
    required: false,
    validation: (value: string) => {
      if (value && new Date(value) <= new Date()) {
        return "Scheduled date cannot be in the past";
      }
      return null;
    },
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Scheduled", value: "SCHEDULED" },
      { label: "Published", value: "PUBLISHED" },
      { label: "Paused", value: "PAUSED" },
      { label: "Failed", value: "FAILED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Enter any additional notes...",
    fullWidth: true,
    required: false,
  },
];

