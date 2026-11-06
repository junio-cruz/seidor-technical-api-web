import { VehicleUsage } from '../../entities/VehicleUsage';

export type ListVehicleUsageRepositoryInput = {
  filter?: {
    driver_id?: string;
    vehicle_id?: string;
    use_start_date?: Date;
    use_end_date?: Date;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListVehicleUsageRepositoryOutput = {
  page: number;
  page_data: VehicleUsage[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};

export interface IListVehicleUsageRepository {
  execute(input: ListVehicleUsageRepositoryInput): Promise<ListVehicleUsageRepositoryOutput>;
}
