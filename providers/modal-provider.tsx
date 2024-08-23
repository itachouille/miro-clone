"use client";
import { useEffect, useState } from "react";
import RenameModal from "@/components/modals/rename-modal";

export const ModalProvider = () => {
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};
