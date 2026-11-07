import { databaseInstance } from '../../session';
import {
  IListVehicleUsageRepository,
  ListVehicleUsageRepositoryInput,
  ListVehicleUsageRepositoryOutput,
} from '../../../../domain/repositories/VehicleUsage/IListVehicleUsageRepository';

export class ListVehicleUsageRepository implements IListVehicleUsageRepository {
  public async execute(
    input: ListVehicleUsageRepositoryInput,
  ): Promise<ListVehicleUsageRepositoryOutput> {
    const queryFilters = {} as {
      driver_id?: string;
      vehicle_id?: string;
      use_start_date?: Date;
      use_end_date?: Date;
    };

    if (input?.filter?.driver_id) {
      queryFilters.driver_id = input.filter.driver_id;
    }

    if (input?.filter?.vehicle_id) {
      queryFilters.vehicle_id = input.filter.vehicle_id;
    }

    if (input?.filter?.use_start_date) {
      queryFilters.use_start_date = input.filter.use_start_date;
    }

    if (input?.filter?.use_end_date) {
      queryFilters.use_end_date = input.filter.use_end_date;
    }

    const vehicles = databaseInstance.getSession();
    const page = input.pagination?.page || 1;
    const pageSize = input.pagination?.page_size || 10;

    const [response, count] = [
      vehicles.filter((vehicleUsage) => {
        return Object.keys(queryFilters).every((key) => {
          return vehicleUsage[key as keyof typeof vehicleUsage] === queryFilters[key as keyof typeof queryFilters];
        });
      })
        .sort()
        .slice(pageSize * page - pageSize),
      vehicles.length
    ];

    return {
      page,
      page_data: response,
      page_count: response.length,
      all_count: count,
      all_pages_count: Math.ceil(count / pageSize),
    };
  }
}
