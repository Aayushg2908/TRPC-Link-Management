"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "../LoginModal";
import CreateLinkModal from "../CreateLinkModal";
import UploadImageModal from "../UploadImageModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LoginModal />
      <CreateLinkModal />
      <UploadImageModal />
    </>
  );
};

export default ModalProvider;
