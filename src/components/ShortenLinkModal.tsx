"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShortenLinkModal } from "@/hooks/use-shortenlink-modal";
import { Label } from "./ui/label";

const formSchema = z.object({
  url: z.string().trim().min(8),
  slug: z.string().trim().min(6).max(10),
});

const ShortenLinkModal = () => {
  const { type, id, url, slug, isOpen, close } = useShortenLinkModal();
  const router = useRouter();
  const params = useParams();

  const { mutateAsync: createShortLink, isLoading } =
    trpc.link.createShortLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Short link created successfully");
          close();
          form.reset();
          router.refresh();
        }
      },
    });

  const { mutateAsync: editShortLink, isLoading: editLoading } =
    trpc.link.editShortLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Short link edited successfully");
          close();
          form.reset();
          router.refresh();
        }
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: url || "",
      slug: slug || "",
    },
  });

  useEffect(() => {
    if (slug && url) {
      form.setValue("slug", slug);
      form.setValue("url", url);
    }
  }, [id, slug, url]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "CREATE") {
        await createShortLink({
          projectId: params.shortenerId as string,
          url: values.url,
          slug: values.slug,
        });
      } else if (type === "EDIT") {
        await editShortLink({
          id,
          url: values.url,
          slug: values.slug,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <div className="flex flex-col gap-y-2">
          <div className="text-xl font-semibold">Shorten a Link</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label>Long URL</Label>
                        <Input placeholder="https://ui.shadcn.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-y-2">
                        <Label>Slug</Label>
                        <Input placeholder="chadcn" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading || editLoading}
                className="w-full rounded-lg"
                type="submit"
              >
                Confirm
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortenLinkModal;
