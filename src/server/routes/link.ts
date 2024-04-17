import { db } from "@/lib/db";
import { privateProcedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const linkRouter = router({
  createLink: privateProcedure
    .input(
      z.object({
        url: z.string().min(8),
        groupId: z.string().min(1).optional(),
      })
    )
    .mutation(async (opts) => {
      const { ...values } = opts.input;
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
          userId: user.id,
          ...values,
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
  createShortLink: privateProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
        url: z.string().min(8),
        slug: z.string().min(6).max(10),
      })
    )
    .mutation(async (opts) => {
      const { userId } = opts.ctx;
      const { projectId, url, slug } = opts.input;

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

      const existingSlug = await db.shortenLink.findFirst({
        where: {
          slug,
        },
      });
      if (existingSlug) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Slug already exists",
        });
      }

      const shortenLink = await db.shortenLink.create({
        data: {
          projectId,
          longUrl: url,
          slug,
          userId: user.id,
        },
      });

      return {
        code: 200,
        shortenLink,
      };
    }),
  editShortLink: privateProcedure
    .input(
      z.object({
        id: z.string().min(1),
        url: z.string().min(8),
        slug: z.string().min(6).max(10),
      })
    )
    .mutation(async (opts) => {
      const { userId } = opts.ctx;
      const { id, url, slug } = opts.input;

      const user = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to edit a link",
        });
      }

      const shortenLink = await db.shortenLink.findUnique({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!shortenLink) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Short link not found",
        });
      }

      await db.shortenLink.update({
        where: {
          id,
          userId: user.id,
        },
        data: {
          longUrl: url,
          slug,
        },
      });

      return {
        code: 200,
      };
    }),
  deleteShortLink: privateProcedure.input(z.string()).mutation(async (opts) => {
    const { userId } = opts.ctx;
    const id = opts.input;

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

    const shortenLink = await db.shortenLink.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!shortenLink) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Short link not found",
      });
    }

    await db.shortenLink.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return {
      code: 200,
    };
  }),
});

export type AppRouter = typeof linkRouter;
