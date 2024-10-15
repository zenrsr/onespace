import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schema";
import { createAdminClient } from "@/lib/appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { ID } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middlware";

const app = new Hono()
  .get("/current", sessionMiddleware, (x) => {
    const user = x.get("user");
    return x.json({ data: user });
  })
  .post("/login", zValidator("json", loginSchema), async (x) => {
    const { email, password } = x.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(x, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return x.json({ success: true });
  })
  .post("/register", zValidator("json", registerSchema), async (x) => {
    const { name, email, password } = x.req.valid("json");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);
    setCookie(x, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return x.json({ success: true });
  })
  .post("/logout", sessionMiddleware, async (x) => {
    const account = x.get("account");
    deleteCookie(x, AUTH_COOKIE);
    await account.deleteSession("current");

    return x.json({ success: true });
  });

export default app;
