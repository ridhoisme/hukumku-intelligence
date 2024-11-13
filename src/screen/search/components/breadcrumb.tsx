import { Breadcrumb as BreadcrumbAntd } from "antd";

export default function Breadcrumb() {
  const breadcrumbItems = [
    {
      title: "Beranda",
      className: "cursor-pointer",
      href: "/",
    },
    {
      title: "Search",
      className: "font-medium text-brand-black-2",
    },
  ];

  return (
    <div className="flex h-[106px] w-full items-center justify-center bg-white px-[50px]">
      <div className="w-full max-w-brand-lg">
        <BreadcrumbAntd
          className="paragraph-14 text-brand-grey-100"
          separator=">"
          items={breadcrumbItems}
        />
      </div>
    </div>
  );
}
