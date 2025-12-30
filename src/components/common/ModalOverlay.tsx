import React from "react";

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalOverlay = ({ children, onClose }: ModalOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-w-3xl w-full px-4">
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;
