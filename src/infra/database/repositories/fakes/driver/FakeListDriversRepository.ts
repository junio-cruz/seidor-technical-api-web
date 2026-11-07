import {IListDriversRepository, ListDriversRepositoryInput, ListDriversRepositoryOutput} from '../../../../../domain/repositories/Driver/IListDriverRepository';

export class FakeListDriversRepository implements IListDriversRepository {
  public async execute(
    input: ListDriversRepositoryInput,
  ): Promise<ListDriversRepositoryOutput> {
    return {
      "page": 1,
      "page_data":  [
        {
      driver_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      name:  "John Doe",
    }   ,
        {
      driver_id: "30777c9d-4a8e-4897-962f-21be1d166fbe",
      name:  "Jane Doe",
    }
      ],
      "page_count": 2,
      "all_count": 2,
      "all_pages_count": 1
    }
  }
}
