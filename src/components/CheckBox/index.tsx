"use client";

import clsx from "clsx";

interface CheckBoxProps {
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
  checkedColor?: string;
  unCheckedColor?: string;
  labelColor?: string;
  labelSize?: string;
  selected?: boolean;
}

export default function CheckBox(props: CheckBoxProps) {
  const { onChange, label, selected } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onChange(isChecked);
  };

  const checkId = `${props.id}-checkbox`;
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        htmlFor={checkId}
        data-ripple-dark="true"
      >
        <input
          id={checkId}
          type="checkbox"
          onChange={handleChange}
          checked={selected}
          className={clsx(
            "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-[2] border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:before:bg-pink-500",
            `checked:border-[#0071E3] checked:bg-[#0071E3] hover:border-[#0071E3]`,
            `border-[#CCCCCC]`
          )}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <label
        className="text-base text-black data-disabled:text-neutral-50 data-disabled:cursor-not-allowed"
        htmlFor={checkId}
      >
        {label}
      </label>
    </div>
  );
}
