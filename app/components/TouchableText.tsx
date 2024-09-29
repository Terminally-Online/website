import { FC } from "react";

export const TouchableText: FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative">
      {text}
      <div className="absolute left-0 right-0 bottom-[-5px] z-[-1]">
        <span className="text-[#E5E5E5]">{text}</span>
      </div>
      <div className="absolute left-0 right-0 bottom-[-8px] md:bottom-[-10px] z-[-1]">
        <span className="text-[#E5E5E5]">{text}</span>
      </div>
    </div>
  );
};
