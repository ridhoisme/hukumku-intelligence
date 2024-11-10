import { Avatar, Dropdown, Image, Layout, MenuProps } from "antd";
import Logo from "../../assets/images/logo.png";
import { DownOutlined } from "@ant-design/icons";

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
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

export default function Header() {
  return (
    <HeaderMain className="bg-brand-navy flex h-full items-center justify-center border-b border-[#e5e5e5] py-8 text-white">
      <div className="font-work flex h-full w-full max-w-brand-lg items-center justify-between text-sm">
        <div className="space-x-1 font-medium">
          <Image
            src={Logo}
            draggable={false}
            preview={false}
            className="logo"
            height={24}
          />
          <span>INTELIJEN</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Avatar size={42} className="bg-white" />
          <Dropdown
            menu={{ items }}
            className="flex h-11 cursor-pointer"
            trigger={["click"]}
          >
            <div className="flex h-full items-center gap-1">
              <div className="h-min">Lorem ipsum</div>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </HeaderMain>
  );
}
