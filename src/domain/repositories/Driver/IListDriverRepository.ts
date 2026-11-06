import { Driver } from '../../entities/Driver';

export type ListDriversRepositoryInput = {
  filter?: {
    name?: string;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListDriversRepositoryOutput = {
  page: number;
  page_data: Driver[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};

export interface IListDriversRepository {
  execute(input: ListDriversRepositoryInput): Promise<ListDriversRepositoryOutput>;
}
