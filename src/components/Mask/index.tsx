"use client";
interface MaskProps {
  visible: boolean;
  onClick: () => void;
}

export default function Mask(props: MaskProps) {
  const { visible, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 bg-black opacity-50 z-40 ${
        visible ? "" : "hidden"
      }`}
    ></div>
  );
}
