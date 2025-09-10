export type TResponseError = {
  message: string;
  status: number;
};

export type TResponse<T> =
  | {
      body: T;
      ok: true;
    }
  | {
      ok: false;
      error: TResponseError;
    };

export type TListResponse<T> = {
  totalPages: number;
  totalElements: number;
  items: T[];
  pageSize: number;
  currentPage: number;
};
