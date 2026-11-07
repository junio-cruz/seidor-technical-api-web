import {
  IListUsersRepository,
  ListUsersRepositoryInput,
  ListUsersRepositoryOutput,
} from '../../../../domain/repositories/IListUsersRepository';
import {UserRole} from "../../../../domain/entities/User";

export class FakeListUsersRepository implements IListUsersRepository {
  public async execute(
    input: ListUsersRepositoryInput,
  ): Promise<ListUsersRepositoryOutput> {
    return {
      "page": 1,
      "page_data": [
        {
          "user_id": "30777c9d-4a8e-4897-962f-21be1d166fbe",
          "auth_token": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
          "name": "Junio Cruz",
          "email": "junio.souza_cruz@outlook.com",
          "email_verified": true,
          "role": UserRole.ADMIN,
          "password": "123456789",
          "bio": "The standard chunk of Lorem Ipsum used since the 1500s",
          "languages": [
            "pt-BR"
          ],
          "deleted_at": new Date("2025-08-05T22:19:49.928Z"),
          "approved_at": new Date("2025-08-05T22:19:33.755Z"),
          "created_at": new Date("2025-08-05T22:19:33.755Z")
        },
        {
          "user_id": "48d285df-1b80-44bc-a540-73148e02d22c",
          "auth_token": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
          "email": "junio.dsasdad@outlook.com",
          "email_verified": false,
          "name": "Casdada Cruz",
          "password": "123456789",
          "role": UserRole.PUBLIC,
          "bio": "The standard chunk of Lorem Ipsum used since the 1500s",
          "languages": [
            "pt-BR"
          ],
          "approved_at": new Date("2025-08-05T22:19:33.755Z"),
          "created_at": new Date("2025-08-05T22:19:33.755Z")
        }
      ],
      "page_count": 2,
      "all_count": 2,
      "all_pages_count": 1
    }
  }
}
