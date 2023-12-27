import { db } from "@/lib/db";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const linkRouter = router({
  createLink: privateProcedure
    .input(
      z.object({
        url: z.string().min(8),
      })
    )
    .mutation(async (opts) => {
      const { url } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a link",
        });
      }

      const link = await db.links.create({
        data: {
          url,
          userId: user.id,
        },
      });

      return {
        code: 200,
        link,
      };
    }),
  deleteLink: privateProcedure
    .input(
      z.object({
        urlId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { urlId } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a link",
        });
      }

      const link = await db.links.findUnique({
        where: {
          id: urlId,
          userId: user.id,
        },
      });
      if (!link) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      await db.links.delete({
        where: {
          id: urlId,
          userId: user.id,
        },
      });

      return {
        code: 200,
      };
    }),
  uploadImage: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
        imageUrl: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { id, imageUrl } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to upload an image",
        });
      }

      const link = await db.links.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!link) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      await db.links.update({
        where: {
          id,
        },
        data: {
          image: imageUrl,
        },
      });

      return {
        code: 200,
      };
    }),
});

export type AppRouter = typeof linkRouter;
