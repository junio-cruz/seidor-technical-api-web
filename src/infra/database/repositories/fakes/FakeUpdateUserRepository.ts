import {
  IUpdateUserRepository,
  UpdateUserRepositoryInput,
  UpdateUserRepositoryOutput,
} from '../../../../domain/repositories/IUpdateUserRepository';
import {UserRole} from "../../../../domain/entities/User";

export class FakeUpdateUserRepository implements IUpdateUserRepository {
  public async execute(
    input: UpdateUserRepositoryInput,
  ): Promise<UpdateUserRepositoryOutput> {
    return {
      "user_id": "48d285df-1b80-44bc-a540-73148e02d22c",
      "auth_token": "492649ff-fdb6-44c0-943d-3f8e8b50d65b",
      "email": "junio.updated@outlook.com",
      "email_verified": false,
      "name": "Junio Cruz Updated",
      "role": UserRole.PUBLIC,
      password: '@T987654321',
      "bio": "The standard chunk of Lorem Ipsum used since the 1500s",
      "languages": [
        "en-US"
      ],
      "created_at": new Date("2025-08-05T22:19:33.755Z")
    };
  }
}
