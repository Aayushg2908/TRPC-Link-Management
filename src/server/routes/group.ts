import { z } from "zod";
import { privateProcedure, router } from "../trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const groupRouter = router({
  createGroup: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(25),
      })
    )
    .mutation(async (opts) => {
      const { name } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a group",
        });
      }

      const group = await db.groups.create({
        data: {
          name,
          userId: user.id,
        },
      });

      return {
        code: 200,
        group,
      };
    }),
  deleteGroup: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a group",
        });
      }

      const group = await db.groups.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }

      await db.groups.delete({
        where: {
          id,
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

      const group = await db.groups.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }

      await db.groups.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          image: imageUrl,
        },
      });

      return {
        code: 200,
      };
    }),
  deleteAllLinks: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      const { userId } = opts.ctx;

      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete links",
        });
      }

      const group = await db.groups.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!group) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Group not found",
        });
      }

      await db.groups.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          links: {
            deleteMany: {},
          },
        },
      });

      return {
        code: 200,
      };
    }),
});

export type GroupRouter = typeof groupRouter;
