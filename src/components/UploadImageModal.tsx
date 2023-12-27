"use client";

import { Dialog, DialogContent } from "./ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { useImageModal } from "@/hooks/use-image-modal";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const UploadImageModal = () => {
  const { id, isOpen, close } = useImageModal();
  const router = useRouter();

  const { mutateAsync: uploadImage } = trpc.link.uploadImage.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        router.refresh();
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            uploadImage({ id, imageUrl: res[0].url });
            toast.success("Upload Completed");
            close();
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageModal;
