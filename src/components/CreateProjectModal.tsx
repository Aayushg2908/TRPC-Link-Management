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
import { useRouter } from "next/navigation";
import { useCreateProjectModal } from "@/hooks/use-createproject-modal";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1),
});

const CreateProjectModal = () => {
  const { type, id, name, isOpen, close } = useCreateProjectModal();
  const router = useRouter();

  const { mutateAsync: createProject, isLoading } =
    trpc.project.createProject.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Project created successfully");
          close();
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

  const { mutateAsync: editProject } = trpc.project.editProject.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Project edited successfully");
        close();
        form.reset();
        router.refresh();
      }
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error(error.message);
      } else if (error.data?.code === "NOT_FOUND") {
        toast.error("Project not found");
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
    },
  });

  useEffect(() => {
    if (name) {
      form.setValue("name", name);
    }
  }, [id, name]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "CREATE") {
        await createProject(values);
      } else if (type === "EDIT") {
        await editProject({ name: values.name, projectId: id });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <div className="flex flex-col gap-y-2">
          <div className="text-xl font-semibold">Create New Project</div>
          <div className="text-sm opacity-70">
            A new Project will be added to your account. Click confirm when you
            are done.
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
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

export default CreateProjectModal;
