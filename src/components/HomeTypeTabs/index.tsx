"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface ITab {
  text: string;
  type: string;
}
export default function HomeTypeTabs() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [data, setData] = useState<ITab[]>([]);

  const mockFetchTabsData = () => {
    const list: ITab[] = [
      {
        text: "全部类型",
        type: "ALL",
      },
      {
        text: "视频素材",
        type: "VIDEO",
      },
      {
        text: "AE模板",
        type: "AE",
      },
      {
        text: "C4D模型",
        type: "C4D",
      },
      {
        text: "Pr模板",
        type: "PR",
      },
      {
        text: "FCP模板",
        type: "FCP",
      },
      {
        text: "3dMax模型",
        type: "3DMAX",
      },
    ];

    setData(list);
  };

  useEffect(() => {
    mockFetchTabsData();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex space-x-6 justify-center">
        {data.map((it, index) => {
          return (
            <button
              className={clsx(
                "flex items-center justify-center relative outline-none text-lg py-2 px-4 rounded-lg text-black bg-neutral-30 disabled:cursor-not-allowed disabled:opacity-40 disabled:text-current hover:bg-neutral-40 data-selected:hover:bg-black-80 transition",
                {
                  "data-selected:text-white data-selected:bg-black data-selected:font-medium":
                    index === currentIndex,
                }
              )}
              data-selected={index === currentIndex}
              key={it.type}
              onClick={() => {
                setCurrentIndex(index);
              }}
            >
              {it.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
