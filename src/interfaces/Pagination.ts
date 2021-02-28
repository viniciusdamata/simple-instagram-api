export interface IPaginationParams {
  pageSize: string;
  page: string;
}

export interface IPaginatedData<T> {
  data: T[];
  filters: { total: number; pageSize: string; page: string };
}
