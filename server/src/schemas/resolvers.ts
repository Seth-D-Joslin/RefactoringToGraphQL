//----------------------------------------------- ??? FILE COMPLETED ??? ----------------------------------
import User from "../models/User.js";
import type { iBook } from "../models/Book.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  savedBooks: iBook[];
  isCorrectPassword(password: string): Promise<boolean>;
  bookCount: number;
}

interface QuerySavedBookArgs {
  bookId: string;
}

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface SaveBookArgs {
  userId: string;
  bookId: string;
}

interface RemoveBookArgs {
  userId: string;
  bookId: string;
}

interface Context {
  user?: User;
}

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return User.find().populate("savedBooks");
    },
    user: async (_parent: any, username: string) => {
      return User.findOne({ username }).populate("savedBooks");
    },
    savedBooks: async (_parent: any, { bookId }: QuerySavedBookArgs) => {
      return User.findById({ bookId }).populate("savedBooks");
    },
    me: async (
      _parent: any,
      _args: unknown,
      context: Context
    ): Promise<User | null> => {
      if (context.user) {
        return await User.findOne({ _id: context.user.id });
      }
      throw new AuthenticationError("Could not authenticate user.");
    },
  },
  Mutation: {
    addUser: async (
      _parent: unknown,
      { input }: AddUserArgs
    ): Promise<{ token: string; user: User }> => {
      //now use model mongoose model to create new doc in collection & create token
      const user = await User.create({ ...input });

      const token = signToken(user.username, user.email, user.id);

      return { user, token };
    },
    login: async (
      _parent: unknown,
      { email, password }: LoginUserArgs
    ): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      const token = signToken(user.username, user.email, user.id);

      return { token, user };
    },
    saveBook: async (
      _parent: unknown,
      { userId, bookId }: SaveBookArgs,
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              books: {
                savedBooks: bookId,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    removeBook: async (
      _parent: any,
      { userId, bookId }: RemoveBookArgs,
      context: any
    ) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              books: {
                _id: bookId,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
