import "server-only";
import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import {
  Client,
  Account,
  Storage,
  Users,
  Databases,
  type Databases as DatabasesType,
  type Account as AccountType,
  type Storage as StorageType,
  type Users as UsersType,
  Models,
} from "node-appwrite";
import { AUTH_COOKIE } from "@/feats/auth/constants";

type sessionContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<sessionContext>(
  async (x, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(x, AUTH_COOKIE);
    if (!session) return x.json({ error: "No session found" }, 401);

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    x.set("account", account);
    x.set("databases", databases);
    x.set("storage", storage);
    x.set("user", user);

    await next();
  }
);
