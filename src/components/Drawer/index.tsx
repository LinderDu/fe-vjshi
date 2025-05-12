"use client";

import Mask from "@/components/Mask"; // 引入 Mask 组件
import { CSSProperties, useEffect } from "react";

export interface DrawerProps {
  open: boolean;
  closeOnMaskClick?: boolean;
  closeOnEscapeKey?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  width?: number;
  zIndex?: number;
}
function Drawer(props: DrawerProps) {
  const {
    open,
    onClose,
    children,
    closeOnEscapeKey = true,
    closeOnMaskClick = true,
    backgroundColor,
    width = 80,
    zIndex = 50,
  } = props;

  useEffect(() => {
    if (closeOnEscapeKey) {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleEscapeKey);

      return () => {
        window.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [closeOnEscapeKey]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const style: CSSProperties = { zIndex: zIndex, maxWidth: `${width}px` };
  if (backgroundColor) {
    style["backgroundColor"] = backgroundColor;
  }

  return (
    <div>
      <div
        className={`fixed top-0 right-0 w-full bg-white shadow-xl h-full transform transition-transform duration-300 ${
          open ? "translate-x-0 delay-50" : "translate-x-full"
        }`}
        style={style}
      >
        {children}
      </div>

      <Mask
        visible={open}
        onClick={() => {
          if (!closeOnMaskClick) return;
          onClose();
        }}
      />
    </div>
  );
}

export default Drawer;
