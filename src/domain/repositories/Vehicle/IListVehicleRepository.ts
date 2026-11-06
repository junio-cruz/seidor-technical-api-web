import { Vehicle } from '../../entities/Vehicle';

export type ListVehicleRepositoryInput = {
  filter?: {
    mark?: string;
    color?: string;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListVehicleRepositoryOutput = {
  page: number;
  page_data: Vehicle[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};

export interface IListVehicleRepository {
  execute(input: ListVehicleRepositoryInput): Promise<ListVehicleRepositoryOutput>;
}
