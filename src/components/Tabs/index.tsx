import clsx from "clsx";
import React, { useState, useRef, useEffect, JSX } from "react";

interface TabItem {
  label: string;
  content: string | JSX.Element;
}

interface TabsProps {
  tabs: TabItem[];
  defaultSelectedIndex?: number;
  onTabChange?: (index: number) => void;
  tabClassName?: string;
  sliderClassName?: string;
  tabWrapClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultSelectedIndex = 0,
  onTabChange,
  tabClassName = "",
  sliderClassName = "",
  tabWrapClassName = "",
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelectedIndex);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);

  // 计算每个 tab 的宽度以及每个 tab 的偏移量（包括 margin）
  const updateTabWidthsAndOffsets = () => {
    const widths = tabRefs.current.map((tab) => {
      if (tab) {
        const rect = tab.getBoundingClientRect();
        const style = window.getComputedStyle(tab);
        const marginLeft = parseInt(style.marginLeft, 10);
        const marginRight = parseInt(style.marginRight, 10);
        return { width: rect.width, marginLeft, marginRight };
      }
      return { width: 0, marginLeft: 0, marginRight: 0 };
    });

    setTabWidths(widths.map((item) => item.width));
    setTabOffsets(
      widths.map((item, index) =>
        widths
          .slice(0, index)
          .reduce(
            (acc, current) =>
              acc + current.width + current.marginLeft + current.marginRight,
            0
          )
      )
    );
  };

  useEffect(() => {
    updateTabWidthsAndOffsets();
  }, [tabs]);

  const sliderWidth = tabWidths[selectedTab];
  const sliderOffset = tabOffsets[selectedTab];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col">
      <div className={clsx("flex flex-col", tabWrapClassName)}>
        <div className={clsx("flex space-x-6 relative")}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabChange(index)}
              className={clsx(
                `cursor-pointer pb-2 pt-2 relative font-medium`,
                { "text-black": selectedTab === index },
                { "text-gray-500": selectedTab !== index },
                tabClassName
              )}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="relative mt-2 border-b border-gray-300">
          <div
            className={`absolute bottom-0 left-0 h-1 bg-black transition-all duration-300 ease-in-out ${sliderClassName}`}
            style={{
              width: `${sliderWidth}px`, // 下边框宽度
              transform: `translateX(${sliderOffset}px)`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        {tabs[selectedTab].content}
      </div>
    </div>
  );
};

export default Tabs;
