import { Avatar, Dropdown, Image, Layout, MenuProps } from "antd";
import Logo from "../../assets/images/logo.png";
import { DownOutlined } from "@ant-design/icons";
import { cn } from "../../utils/tw";
import { HTMLProps } from "react";
import { Link } from "@tanstack/react-router";

const { Header: HeaderMain } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Profile
      </a>
    ),
  },
  {
    key: "4",
    danger: true,
    label: "Log Out",
  },
];

type HeaderProps = {
  headerbg?: "transparent" | "default";
  className?: HTMLProps<HTMLElement>["className"];
};

export default function Header({
  headerbg = "default",
  className,
}: HeaderProps) {
  return (
    <HeaderMain
      className={cn(
        "flex h-full max-h-[106px] items-center justify-center border-b border-[#e5e5e5] bg-brand-navy py-8 text-white",
        headerbg === "transparent" && "border-none bg-transparent",
        className,
      )}
    >
      <div className="flex h-full w-full max-w-brand-lg items-center justify-between font-work text-sm">
        <Link href="/" className="space-x-1 font-medium hover:text-inherit">
          <Image
            src={Logo}
            draggable={false}
            preview={false}
            className="logo"
            height={24}
          />
          <span>INTELLIGENCE</span>
        </Link>

        <div className="flex items-center justify-between gap-2">
          <Avatar size={42} className="bg-white" />
          <Dropdown
            menu={{ items }}
            className="flex h-11 cursor-pointer"
            trigger={["click"]}
          >
            <div className="flex h-full items-center gap-1">
              <div className="h-min">Michael Jagadpramana</div>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </HeaderMain>
  );
}
