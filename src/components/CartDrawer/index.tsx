"use client";
import Image from "next/image";
import Drawer, { type DrawerProps } from "@/components/Drawer";
import CheckBox from "@/components/CheckBox";
import Tabs from "@/components/Tabs";
import CartListItem, {
  type CartListItemProps,
} from "@/components/CartListItem";
import useCartStore from "@/stores/cartStore";
import { IMusicCart, IFotoCart, IVideoCart, ICart } from "@/types/cartMod";
import { useEffect, useMemo, useState } from "react";

type CartDrawerProps = Pick<DrawerProps, "open" | "onClose">;

export default function CartDrawer() {
  const { openCartDrawer, setCloseCartDrawer } = useCartStore();

  const handleClose = () => {
    setCloseCartDrawer();
  };

  const cartDrawerProps = {
    open: openCartDrawer,
    onClose: handleClose,
  };

  return (
    <Drawer onClose={handleClose} open={openCartDrawer} width={514}>
      <CartDrawerContent {...cartDrawerProps} />
    </Drawer>
  );
}

interface TabContentProps extends Pick<CartListItemProps, "from"> {
  data?: IVideoCart[] | IFotoCart[] | IMusicCart[];
}
function TabContent(props: TabContentProps) {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectSkuList, setSelectSkuList] = useState<ICart[]>([]);

  const { data = [], from } = props;

  const handleCheckAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectSkuList(data);
    } else {
      setSelectSkuList([]);
    }
  };

  const handleSelect = (checked: boolean, item: ICart) => {
    if (checked) {
      setSelectSkuList((prev) => [...prev, item]);
    } else {
      setSelectSkuList((prev) => prev.filter((i) => i.vid !== item.vid));
    }
  };

  const totalPrice = useMemo(() => {
    if (selectSkuList.length === 0) return 0;
    return selectSkuList.reduce((total, item) => {
      const price = item.price || 0;
      return total + price;
    }, 0);
  }, [selectSkuList]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col w-full overflow-auto pt-5 px-5">
          {data.map((item) => {
            return (
              <CartListItem
                data={item}
                selected={
                  selectAll || selectSkuList.some((i) => i.vid === item.vid)
                }
                key={item.vid}
                from={from}
                onSelect={(checked) => {
                  handleSelect(checked, item);
                }}
              />
            );
          })}
        </div>
      </div>
      <hr className="border-0 border-b w-full h-[0px] border-current text-[#F0F0F0]" />
      <Footer
        disabled={selectSkuList.length <= 0}
        totalPrice={totalPrice}
        onCheckAll={(chcked) => {
          handleCheckAll(chcked);
        }}
        onSubmit={() => {
          console.log("submit");
        }}
      />
    </div>
  );
}

function CartDrawerContent(props: CartDrawerProps) {
  const { videos, potos, musics } = useCartStore();
  const tabsData = [
    {
      label: `视频 ${videos.length}`,
      content: <TabContent data={videos} from="video" />,
    },
    {
      label: `图片 ${potos.length}`,
      content: <TabContent data={potos} from="foto" />,
    },
    {
      label: `音乐 ${musics.length}`,
      content: <TabContent data={musics} from="music" />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <Head onClose={props.onClose} />
      <div className="flex flex-col items-center flex-1 overflow-auto px-0">
        <Tabs tabs={tabsData} tabWrapClassName="mx-10" />
      </div>
    </div>
  );
}

function Head(props: Pick<CartDrawerProps, "onClose">) {
  const { onClose } = props;
  return (
    <div className="w-full font-medium text-black text-3xl px-10 flex-shrink-0 lg:text-xl lg:py-5 flex justify-between items-center text-left pb-8 pt-9 lg:px-5">
      <h3 className="text-3xl">购物车</h3>
      <Image
        src="/image/closed.png"
        width={28}
        height={28}
        alt="close"
        className="cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
}

interface FooterProps {
  onSubmit: () => void;
  onCheckAll: (checked: boolean) => void;
  totalPrice?: number;
  disabled?: boolean;
}
function Footer(props: FooterProps) {
  const { onSubmit, onCheckAll, totalPrice, disabled } = props;
  return (
    <div className="flex flex-col relative space-y-4 px-10 py-7 lg:px-5">
      <div className="flex relative justify-between">
        <CheckBox
          onChange={(chcked) => {
            onCheckAll(chcked);
          }}
          id="all"
          label="全选"
        />
        <div className="flex flex-1 justify-end space-x-3 items-center text-base">
          <div className="flex space-x-1 text-neutral-60">
            <span>已选</span>
            <span>0</span>
            <span>件</span>
          </div>
          <div className="flex space-x-1 items-center">
            <span className="font-medium">总计：</span>
            <div className="flex space-x-1 items-center text-red-500">
              <span className="text-4xl font-medium">{totalPrice || 0}</span>
              <span className="leading-none pt-[18px] pb-[10px]">元</span>
            </div>
          </div>
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={onSubmit}
        type="button"
        className="inline-flex appearance-none items-center justify-center select-none relative whitespace-nowrap align-middle transition outline-none cursor-pointer disabled:cursor-not-allowed h-14 px-10 text-lg font-medium text-white bg-black hover:bg-black-80 active:bg-black disabled:bg-[#cccccc] rounded-full border-0"
      >
        立即购买
      </button>
    </div>
  );
}
