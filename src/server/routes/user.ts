import { db } from "@/lib/db";
import { privateProcedure, router } from "../trpc";

export const userRouter = router({
  currentUser: privateProcedure.query(async (opts) => {
    const { userId } = opts.ctx;

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user;
  }),
});

export type AppRouter = typeof userRouter;
