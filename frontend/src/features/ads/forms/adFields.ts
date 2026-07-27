import type { FormField } from "@/components/common/DataForm";

export const adFields: FormField[] = [
  {
    name: "name",
    label: "Ad Name",
    type: "text",
    placeholder: "e.g., EV Benefits - Carousel Ad",
    required: true,
  },
  {
    name: "adSetId",
    label: "Ad Set",
    type: "select",
    required: true,
    options: [
      { label: "EV Awareness - Urban Professionals", value: "ads-001" },
      { label: "EV Awareness - Tech Enthusiasts", value: "ads-002" },
      { label: "Solar Leads - Metro Cities", value: "ads-003" },
      { label: "Renewable Energy - Instagram", value: "ads-004" },
      { label: "Business Growth - Enterprise", value: "ads-005" },
      { label: "EV Charging - App Install", value: "ads-006" },
      { label: "Solar Installation - Q4", value: "ads-007" },
      { label: "Brand Awareness - Stories", value: "ads-008" },
      { label: "Engagement - Video Ads", value: "ads-009" },
      { label: "Festive Offers - All Segments", value: "ads-010" },
    ],
  },
  {
    name: "platform",
    label: "Platform",
    type: "select",
    required: true,
    options: [
      { label: "Facebook", value: "FACEBOOK" },
      { label: "Instagram", value: "INSTAGRAM" },
      { label: "Facebook + Instagram", value: "FACEBOOK_INSTAGRAM" },
    ],
  },
  {
    name: "headline",
    label: "Headline",
    type: "text",
    placeholder: "e.g., Switch to Electric Today",
    required: true,
    validation: (value: string) => {
      if (!value) return "Headline is required";
      if (value.length > 100) return "Headline must be at most 100 characters";
      return null;
    },
  },
  {
    name: "primaryText",
    label: "Primary Text",
    type: "textarea",
    placeholder: "Main ad copy text...",
    required: true,
    fullWidth: true,
  },
  {
    name: "description",
    label: "Description (Optional)",
    type: "text",
    placeholder: "e.g., Learn about EV tax credits",
    required: false,
  },
  {
    name: "mediaUrl",
    label: "Media URL (Optional)",
    type: "text",
    placeholder: "https://example.com/image.jpg",
    required: false,
    validation: (value: string) => {
      if (value && !/^https?:\/\/.+/.test(value)) {
        return "Please enter a valid URL starting with http:// or https://";
      }
      return null;
    },
  },
  {
    name: "callToAction",
    label: "Call to Action",
    type: "select",
    required: true,
    options: [
      { label: "Learn More", value: "LEARN_MORE" },
      { label: "Sign Up", value: "SIGN_UP" },
      { label: "Contact Us", value: "CONTACT_US" },
      { label: "Get Quote", value: "GET_QUOTE" },
      { label: "Shop Now", value: "SHOP_NOW" },
      { label: "Apply Now", value: "APPLY_NOW" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Active", value: "ACTIVE" },
      { label: "Paused", value: "PAUSED" },
      { label: "Rejected", value: "REJECTED" },
      { label: "Completed", value: "COMPLETED" },
    ],
  },
];
