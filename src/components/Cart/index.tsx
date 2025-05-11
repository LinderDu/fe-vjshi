"use client";

import Image from "next/image";
import useCartStore from "@/stores/cartStore";
import { useEffect } from "react";
import Show from "../Show";

export default function Cart() {
  const { setOpenCartDrawer, cartTotal, initCart } = useCartStore();

  const handleOpen = () => {
    setOpenCartDrawer();
  };

  useEffect(() => {
    initCart();
  }, []);

  return (
    <div className="fixed-right-0 top-0 bottom-0 w-0 z-10">
      <div className="absolute right-0 bottom-25 pr-3">
        <div
          className="justify-center items-center flex w-[54px] h-[54px] rounded-[100%] bg-white p-[1px] cursor-pointer shadow-lg group"
          onClick={handleOpen}
        >
          <div className="justify-center items-center group-hover:bg-neutral-300 transition-background flex w-full h-full rounded-[100%]">
            <div className="relative inline-flex">
              <Show when={cartTotal > 0}>
                <div
                  data-position-r
                  data-position-t
                  className="absolute z-1 flex justify-center items-center data-position-t:top-0 data-position-b:bottom-0 data-position-l:left-0 data-position-r:right-0 px-[6px] w-[18px] h-[18px] text-center text-sm text-white rounded-full data-position-t:-translate-y-1/2 data-position-b:translate-y-1/2 data-position-l:translate-x-[calc(-100%+8px)] data-position-r:translate-x-[calc(100%-8px)] bg-blue-600"
                >
                  {cartTotal}
                </div>
              </Show>
              <Image
                src="/image/icon.png"
                quality={90}
                width={24}
                height={24}
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
