import { ConflictException, NotFoundException } from "../../common/utils/index.js";
import { UserModel, createOne, findOne } from "../../DB/index.js";

export const signup = async (inputs) => {
  const { username, email, password, phone } = inputs;
  const checkUserExist = await findOne({
    model: UserModel,
    filter: { email },
    select: 'email',
    options: {
      lean: true
    }
  });
  console.log({ checkUserExist });

  if (checkUserExist) {
    return ConflictException({ message: "Email exist" });
  }
  const user = await createOne({
    model: UserModel,
    data: { username, email, password, phone }
  });
  return user;
};

export const login = async (inputs) => {
  const { email, password } = inputs;

  const user = await findOne({
    model: UserModel,
    filter: { email, password },
    select: "-password",
    options: {
      lean: true
    }
  });

  if (!user) {
    throw NotFoundException({ message: 'Invalid login credentials' });
  }
  return user;
};