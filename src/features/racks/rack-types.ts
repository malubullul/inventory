export type RackStatusFilter = "all" | "active" | "inactive";

export type RackQueryParams = {
  search?: string;
  status?: RackStatusFilter;
  page?: string;
  pageSize?: string;
};

export type RackPagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type RackActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type RackRecord = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
};
