import { Link } from "@tanstack/react-router";
import { Card } from "../../components/ui/card";
import CardSearch from "./components/card-search";
import SearchInput from "./components/search-input";
import { cn } from "../../utils/tw";
import { TOPIC } from "../../consts";
import EmptyData from "./components/empty-data";

export default function List() {
  const isEmpty = true;
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-brand-grey-300 px-[50px] py-16">
      <div className="w-full max-w-brand-lg space-y-6">
        <SearchInput />
        {isEmpty ? (
          <EmptyData />
        ) : (
          <div className="flex gap-6">
            <div className="h-[225px] w-full max-w-[185px] rounded-[10px] border border-black/10 bg-white py-4">
              <h4 className="pl-3 font-work text-base font-semibold leading-6 text-brand-black">
                Menampilkan Daftar
              </h4>
              <div className="flex flex-col">
                {TOPIC.map((val, i) => (
                  <div
                    key={i}
                    onClick={() => scrollToElement(val.toLocaleLowerCase())}
                    className={cn(
                      "py-2 pl-3 font-work text-sm",
                      i == 0 && "border-l-[3px] border-brand-green-100",
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-[46px]">
              <Card title="Advokat" id="advokat">
                <div className="grid grid-cols-3 grid-rows-3 gap-[18px] p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <CardSearch key={i} />
                  ))}
                </div>
                <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
                  <Link>Lihat semua advokat</Link>
                </div>
              </Card>
              <Card title="Hakim" id="hakim">
                <div className="grid grid-cols-3 grid-rows-3 gap-[18px] p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <CardSearch key={i} />
                  ))}
                </div>
                <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
                  <Link>Lihat semua advokat</Link>
                </div>
              </Card>
              <Card title="Topik" id="topik">
                <div className="grid grid-cols-3 grid-rows-3 gap-[18px] p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <CardSearch
                      key={i}
                      showDetail={false}
                      document={100}
                      showAvatar={false}
                    />
                  ))}
                </div>
                <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
                  <Link>Lihat semua advokat</Link>
                </div>
              </Card>
              <Card title="Umum" id="umum">
                <div className="grid grid-cols-3 grid-rows-3 gap-[18px] p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <CardSearch key={i} />
                  ))}
                </div>
                <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
                  <Link>Lihat semua advokat</Link>
                </div>
              </Card>
              <Card title="Lokasi Pengadilan" id="lokasi">
                <div className="grid grid-cols-3 grid-rows-3 gap-[18px] p-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <CardSearch key={i} showDetail={false} showAvatar={false} />
                  ))}
                </div>
                <div className="flex h-14 w-full items-center justify-center border-t border-black/10">
                  <Link>Lihat semua advokat</Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
