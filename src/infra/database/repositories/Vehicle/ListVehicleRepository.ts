import { databaseInstance } from '../../session';
import {
  IListVehicleRepository,
  ListVehicleRepositoryInput,
  ListVehicleRepositoryOutput,
} from '../../../../domain/repositories/Vehicle/IListVehicleRepository';

export class ListVehicleRepository implements IListVehicleRepository {
  public async execute(
    input: ListVehicleRepositoryInput,
  ): Promise<ListVehicleRepositoryOutput> {
    const queryFilters = {} as {
      mark?: string;
      color?: string;
    };

    if (input?.filter?.mark) {
      queryFilters.mark = input.filter.mark;
    }

    if (input?.filter?.color) {
      queryFilters.color = input.filter.color;
    }

    const vehicles = databaseInstance.getSession();
    const page = input.pagination?.page || 1;
    const pageSize = input.pagination?.page_size || 10;

    const [response, count] = [
      vehicles.filter(() => queryFilters)
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
