export type MemberRole = "Brand" | "Dispensary" | "Retailer" | "Sales rep";

export type Profile = {
  slug: string;
  name: string;
  role: MemberRole;
  location: string;
  description: string;
  specialties: string[];
  verified: boolean;
  initials: string;
};
