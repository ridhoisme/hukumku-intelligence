import { useMemo } from "react";
import Hammer from "../../../../assets/icons/hammer";
import Location from "../../../../assets/icons/location";
import Neraca from "../../../../assets/icons/neraca";
import WorkBag from "../../../../assets/icons/work-bag";

type CardTopCategory = {
  lawyer: string;
  judge: string;
  topic: string;
  location: string;
};

export default function CardTopCategory({
  judge,
  lawyer,
  location,
  topic,
}: CardTopCategory) {
  const categories = useMemo(() => {
    return [
      {
        icon: <Neraca />,
        title: "Advokat Lawan",
        content: lawyer,
      },
      {
        icon: <Hammer />,
        title: "Hakim Ketua",
        content: judge,
      },
      {
        icon: <WorkBag />,
        title: "Topik",
        content: topic,
      },
      {
        icon: <Location />,
        title: "Lokasi",
        content: location,
      },
    ];
  }, [judge, lawyer, location, topic]);

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-[10px] bg-white p-4 font-work">
      <div className="text-sm font-medium text-brand-grey-200">
        PALING SERING DIHADAPI
      </div>
      <div className="flex h-full flex-col justify-between">
        {categories.map((category, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="aspect-square size-9">{category.icon}</div>
            <div className="space-y-0.5 font-work">
              <div className="text-sm text-brand-grey-100">
                {category.title}
              </div>
              <div className="font-semibold text-brand-black">
                {category.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
