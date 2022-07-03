import { AppError } from "../../../../../errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../createUser/CreateuserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

describe("#Authenticate User", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "user@test.com",
      password: "123456",
      name: "User test",
    };
    await createUserUseCase.execute(user);
    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id");
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      email: "user@test.com",
      password: "123456",
      name: "User test",
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existente user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "1234",
        email: "user@test.com",
        password: "123456",
        name: "User test",
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).not.toHaveProperty("token");
  });
});
