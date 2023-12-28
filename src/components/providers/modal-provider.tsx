"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "../LoginModal";
import CreateLinkModal from "../CreateLinkModal";
import UploadImageModal from "../UploadImageModal";
import CreateGroupModal from "../CreateGroupModal";
import LinkToGroupModal from "../LinkToGroupModal";

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
      <CreateGroupModal />
      <LinkToGroupModal />
    </>
  );
};

export default ModalProvider;
