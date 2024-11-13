import { Image, Layout } from "antd";
import { HTMLProps } from "react";
import Logo from "../../assets/images/logo.png";
import { cn } from "../../utils/tw";

const { Footer: FooterMain } = Layout;

type FooterProps = {
  headerbg?: "transparent" | "default";
  className?: HTMLProps<HTMLElement>["className"];
};

export default function Footer({
  headerbg = "default",
  className,
}: FooterProps) {
  return (
    <FooterMain
      className={cn(
        "flex h-full max-h-[106px] items-center justify-center border-t border-[#E2E8F0] bg-brand-grey-300 py-8",
        headerbg === "transparent" && "border-none bg-transparent",
        className,
      )}
    >
      <div className="flex h-full w-full max-w-brand-lg items-center justify-between font-work text-sm">
        <div className="space-x-1 font-medium">
          <Image
            src={Logo}
            draggable={false}
            preview={false}
            className="logo"
            height={24}
          />
          <span>INTELLIGENCE</span>
        </div>

        <div className="font-work text-sm text-[#A1A1A1]">
          © 2024 Hukumku. All rights reserved.
        </div>
      </div>
    </FooterMain>
  );
}
