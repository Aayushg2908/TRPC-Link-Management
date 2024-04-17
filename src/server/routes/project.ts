import { db } from "@/lib/db";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const projectRouter = router({
  createProject: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(25),
      })
    )
    .mutation(async (opts) => {
      const { userId } = opts.ctx;
      const { name } = opts.input;

      const user = await db.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a group",
        });
      }

      const project = await db.project.create({
        data: {
          name,
          userId: user.id,
        },
      });

      return {
        code: 200,
        project,
      };
    }),
  deleteProject: privateProcedure
    .input(z.string().min(1))
    .mutation(async (opts) => {
      const { userId } = opts.ctx;
      const projectId = opts.input;

      const user = await db.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete a group",
        });
      }

      const project = await db.project.findUnique({
        where: {
          id: projectId,
          userId: user.id,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      await db.project.delete({
        where: { id: projectId, userId: user.id },
      });

      return {
        code: 200,
      };
    }),
  editProject: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(25),
        projectId: z.string().min(1),
      })
    )
    .mutation(async (opts) => {
      const { userId } = opts.ctx;
      const { name, projectId } = opts.input;

      const user = await db.user.findUnique({
        where: { clerkId: userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to edit a group",
        });
      }

      const project = await db.project.findUnique({
        where: {
          id: projectId,
          userId: user.id,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      await db.project.update({
        where: { id: projectId, userId: user.id },
        data: { name },
      });

      return {
        code: 200,
      };
    }),
});

export type AppRouter = typeof projectRouter;
