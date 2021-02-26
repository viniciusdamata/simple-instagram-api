export interface IPaginationParams {
  pageSize: number;
  page: number;
}

export interface IPaginatedData<T> {
  data: T[];
  filters: { total: number; pageSize: number; page: number };
}
