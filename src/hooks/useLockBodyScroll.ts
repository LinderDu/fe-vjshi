import { useEffect } from "react";

/**
 * 控制页面 body 的滚动状态
 * @param lock 是否锁定（true = 禁止滚动，false = 恢复滚动）
 */

export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [lock]);
}
