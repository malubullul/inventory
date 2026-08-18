export type AdminRole = "super_admin" | "inventory_admin" | "viewer";

export type AdminSummary = {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
};
