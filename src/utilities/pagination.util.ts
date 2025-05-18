export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    limit: number;
  };
}

export const getPaginationParams = (params: PaginationParams) => {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(params.limit) || 10));
  const offset = (page - 1) * limit;
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder || 'desc';

  return {
    take: limit,
    skip: offset,
    orderBy: {
      [sortBy]: sortOrder,
    },
    page,
  };
};

export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> => {
  return {
    data,
    meta: {
      total,
      page,
      lastPage: Math.ceil(total / limit),
      limit,
    },
  };
};
