import { databaseInstance } from '../session';
import { UserRole } from '../../../domain/entities/User';
import {
  IListUsersRepository,
  ListUsersRepositoryInput,
  ListUsersRepositoryOutput,
} from '../../../domain/repositories/IListUsersRepository';

export class ListUsersRepository implements IListUsersRepository {
  public async execute(
    input: ListUsersRepositoryInput,
  ): Promise<ListUsersRepositoryOutput> {
    const queryFilters = {} as {
      name?: string;
      email_verified?: boolean;
      phone_number_verified?: boolean;
      role?: UserRole;
      created_at?: Date;
      approved_at?: Date | null;
      deleted_at?: Date | null;
      updated_at?: Date;
    };

    if (input?.filter?.name) {
      queryFilters.name = input.filter.name;
    }

    if (input?.filter?.email_verified) {
      queryFilters.email_verified = input.filter.email_verified;
    }

    if (input?.filter?.role) {
      queryFilters.role = input.filter.role;
    }

    //FILTRO DE DATAS

    // if (input?.filter?.approved_at) {
    //   if (!queryFilters.$and) queryFilters.$and = [];
    //   queryFilters.$and.push({
    //     approved_at: { $gte: input.filter.approved_at },
    //   });
    // }
    //
    // if (input.filter?.approved_at === null) {
    //   if (!queryFilters.$and) queryFilters.$and = [];
    //   queryFilters.$and.push({
    //     approved_at: { $eq: null },
    //   });
    // }

    // if (input?.filter?.deleted_at) {
    //   if (!queryFilters.$and) queryFilters.$and = [];
    //   queryFilters.$and.push({
    //     deleted_at: { $gte: input.filter.deleted_at },
    //   });
    // }
    //
    // if (input?.filter?.created_at) {
    //   if (!queryFilters.$and) queryFilters.$and = [];
    //   queryFilters.$and.push({
    //     created_at: { $gte: input.filter.created_at },
    //   });
    // }
    //
    // if (input.filter?.deleted_at === null) {
    //   if (!queryFilters) queryFilters.$and = [];
    //   queryFilters.$and.push({
    //     deleted_at: { $eq: null },
    //   });
    // }

    const users = databaseInstance.getSession();
    const page = input.pagination?.page || 1;
    const pageSize = input.pagination?.page_size || 10;

    const [response, count] = [
      users.filter(() => queryFilters)
        .sort()
        .slice(pageSize * page - pageSize),
      users.length
    ];

    return {
      page,
      page_data: response,
      page_count: response.length,
      all_count: response.length,
      all_pages_count: Math.ceil(count / pageSize),
    };
  }
}
