import {
  GetUserRepositoryInput,
  GetUserRepositoryOutput,
  IGetUserRepository,
} from '../../../../domain/repositories/IGetUserRepository';
import { UserRole } from '../../../../domain/entities/User';

export class FakeGetUserRepository implements IGetUserRepository {
  public async execute(
      input: GetUserRepositoryInput,
  ): Promise<GetUserRepositoryOutput> {
    return {
      "user_id": "30777c9d-4a8e-4897-962f-21be1d166fbe",
      "auth_token": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
      "name": "Junio Cruz",
      "email": "junio.souza_cruz@outlook.com",
      "email_verified": true,
      "role": UserRole.ADMIN,
      "password": '123456789@',
      "bio": "The standard chunk of Lorem Ipsum used since the 1500s",
      "languages": [
        "pt-BR"
      ],
      "approved_at": new Date("2025-08-05T22:19:33.755Z"),
      "deleted_at": new Date("2025-08-05T22:19:49.928Z"),
      "created_at": new Date("2025-08-05T22:19:33.755Z")
    }
  }
}
