"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateLinkModal } from "@/hooks/use-createlink-modal";
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
import { router } from "@/server/trpc";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  url: z.string().min(8, {
    message: "URL must start with https://",
  }),
});

const CreateLinkModal = () => {
  const { isOpen, onClose } = useCreateLinkModal();
  const router = useRouter();

  const { mutateAsync: createLink, isLoading } =
    trpc.link.createLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Link created successfully");
          onClose();
          form.reset();
          router.refresh();
        }
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error(error.message);
        }
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createLink(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col gap-y-2">
          <div className="text-xl font-semibold">Add New Link</div>
          <div className="text-sm opacity-70">
            A new Link will be added to your collection. Click confirm when you
            are done.
          </div>
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
                      <Input placeholder="https://ui.shadcn.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
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

export default CreateLinkModal;
