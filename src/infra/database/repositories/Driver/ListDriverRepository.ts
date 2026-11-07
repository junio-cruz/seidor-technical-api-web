import { databaseInstance } from '../../session';
import {
  IListDriversRepository,
  ListDriversRepositoryInput,
  ListDriversRepositoryOutput,
} from '../../../../domain/repositories/Driver/IListDriverRepository';

export class ListDriversRepository implements IListDriversRepository {
  public async execute(
    input: ListDriversRepositoryInput,
  ): Promise<ListDriversRepositoryOutput> {
    const queryFilters = {} as {
      name?: string;
    };

    if (input?.filter?.name) {
      queryFilters.name = input.filter.name;
    }

    const drivers = databaseInstance.getSession();
    const page = input.pagination?.page || 1;
    const pageSize = input.pagination?.page_size || 10;

    const [response, count] = [
      drivers.filter(() => queryFilters)
        .sort()
        .slice(pageSize * page - pageSize),
      drivers.length
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
