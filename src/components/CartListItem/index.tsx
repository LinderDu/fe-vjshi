import Image from "next/image";
import CheckBox from "@/components/CheckBox";
import { IFotoCart, IVideoCart, IMusicCart, ICart } from "@/types/cartMod";
import Show from "../Show";
import useCartStore from "@/stores/cartStore";
import { LIIC_TYPE_LABEL } from "@/constants/cart";

export interface CartListItemProps {
  data: IVideoCart | IFotoCart | IMusicCart;
  from: "video" | "foto" | "music";
  selected?: boolean;
  onSelect: (checked: boolean, item: ICart) => void;
}
export default function CartListItem(props: CartListItemProps) {
  const { setDeletePotoById, setDeleteMusicById, setDeleteVideoById } =
    useCartStore();
  const { data, from, selected, onSelect } = props;
  const { coverImage, title, price, vid, licType } = data;

  const handleDelete = () => {
    switch (from) {
      case "video":
        setDeleteVideoById(vid);
        break;
      case "foto":
        setDeletePotoById(vid);
        break;
      case "music":
        setDeleteMusicById(vid);
        break;
    }
  };

  return (
    <div className="flex space-x-4 p-5 cursor-pointer group/item hover:bg-[#F5F5F5] transition-background rounded-lg flex-shrink-0">
      <div className="h-[66px] flex justify-center">
        <CheckBox
          onChange={function (checked: boolean): void {
            onSelect(checked, data);
          }}
          id={`cart-item-${vid}`}
          label={""}
          selected={selected}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
        <div className="flex items-center text-base">
          <div className="flex w-[117px] h-[66px] relative flex-shrink-0 rounded-sm overflow-hidden">
            <a>
              <Image
                src={coverImage}
                alt="cover"
                objectFit="cover"
                width={117}
                height={66}
              />
            </a>
          </div>
          <div className="flex space-y-3 flex-1 ml-3 flex-col overflow-hidden">
            <div className="flex flex-1 ">
              <a className="outline-none max-w-full text-lg text-black truncate h-6 font-medium">
                {title}
              </a>
            </div>
            <div className="w-full flex items-center space-x-3">
              <span className="text-[#404040] truncate">ID: {vid}</span>
              <Show when={"softwareType" in data && !!data.softwareType}>
                <hr
                  aria-orientation="vertical"
                  className="border-0 border-l border-current w-[1px] h-[12px] text-[#404040]"
                />
                <span className="text-[#404040] truncate">
                  类型：{"softwareType" in data && data.softwareType}
                </span>
              </Show>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            className="appearance-none items-center justify-center select-none relative whitespace-nowrap transition outline-none cursor-pointer disabled:cursor-not-allowed text-base w-auto h-auto data-loading:text-transparent disabled:text-neutral-50 align-baseline border-0 text-black hover:text-black active:text-black-50 hidden lg:block group-hover/item:block font-medium"
          >
            移除
          </button>
          <div className="flex items-center w-full justify-end">
            <div className="flex space-x-4 items-center text-base">
              <div className="flex text-neutral-60 flex-1">
                {LIIC_TYPE_LABEL[licType]}
              </div>
              <div className="flex items-center text-black flex-shrink-0 space-x-[2px]">
                <span className="text-2xl font-medium">{price}</span>
                <span className="leading-none pt-[9px] pb-[7px]">元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
