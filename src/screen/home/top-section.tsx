import { SearchOutlined } from "@ant-design/icons";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Input } from "antd";
import HammerOutline from "../../assets/icons/hammer-outline";
import LocationOutline from "../../assets/icons/location-outline";
import NeracaOutline from "../../assets/icons/neraca-outline";
import PeopleOutline from "../../assets/icons/people-outline";
import WorkBagOutline from "../../assets/icons/work-bag-outline";
import HeroBg from "../../assets/images/bg-hero.png";
import { getGenerals } from "../../queries/general";
import { getJudges } from "../../queries/judge";
import { getLawyers } from "../../queries/lawyer";
import { getLocations } from "../../queries/location";
import { getTopics } from "../../queries/topic";
import { Lawyers } from "../../type/lawyer";
import { Locations } from "../../type/location";
import { Topics } from "../../type/topic";
import { Generals } from "../../type/general";
import { Judges } from "../../type/judge";

const { Search } = Input;

export default function TopSection() {
  const navigate = useNavigate();
  const result = useSuspenseQueries({
    queries: [
      getLocations<Locations>({ fields: "name" }),
      getTopics<Topics>({ fields: "name" }),
      getLawyers<Lawyers>({ fields: "name" }),
      getGenerals<Generals>({ fields: "name" }),
      getJudges<Judges>({ fields: "name" }),
    ],
    combine: (result) => {
      return {
        location: result[0].data.data,
        topic: result[1].data.data,
        lawyer: result[2].data.data,
        general: result[3].data.data,
        judge: result[4].data.data,
      };
    },
  });

  const handleSearch = (val: string) =>
    navigate({ to: "/search", search: { about: val, list: true } });

  return (
    <section className="relative flex h-[857px] justify-center bg-brand-navy">
      <div className="absolute left-0 top-0 h-full w-full">
        <img alt="hero background" className="" src={HeroBg} loading="eager" />
      </div>
      <div className="absolute -bottom-20 w-[1048px] space-y-20">
        <div className="space-y-[42px]">
          <h1 className="font-work text-[42px] font-medium text-white">
            Apa yang ingin Anda cari hari ini?
          </h1>
          <Search
            prefix={<SearchOutlined classID="text-[#787872]" />}
            placeholder="Search"
            enterButton={<SearchOutlined className="text-3xl" />}
            onSearch={handleSearch}
          />
        </div>
        <div className="space-y-6">
          <div className="grid h-[152px] grid-cols-3 gap-6">
            <Link
              to="/search"
              search={{ category: "Advokat" }}
              className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-6 shadow-brand"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-work text-sm font-medium text-black">
                    Advokat
                  </span>
                  <h1 className="font-work text-4xl font-bold text-black">
                    {result.lawyer.meta.pagination.total}
                  </h1>
                </div>
                <NeracaOutline />
              </div>
              <p className="font-work text-[13px] font-normal text-black">
                Memuat data advokat di Indonesia sampai tahun 2024
              </p>
            </Link>
            <Link
              to="/search"
              search={{ category: "Hakim" }}
              className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-6 shadow-brand"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-work text-sm font-medium text-black">
                    Hakim
                  </span>
                  <h1 className="font-work text-4xl font-bold text-black">
                    {result.judge.meta.pagination.total}
                  </h1>
                </div>
                <HammerOutline />
              </div>
              <p className="font-work text-[13px] font-normal text-black">
                Memuat data hakim di Indonesia sampai tahun 2024
              </p>
            </Link>
            <Link
              to="/search"
              search={{ category: "Umum" }}
              className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-6 shadow-brand"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-work text-sm font-medium text-black">
                    Umum
                  </span>
                  <h1 className="font-work text-4xl font-bold text-black">
                    {result.general.meta.pagination.total}
                  </h1>
                </div>
                <PeopleOutline />
              </div>
              <p className="font-work text-[13px] font-normal text-black">
                Memuat data orang yang terkena kasus hukum di Indonesia sampai
                tahun 2024
              </p>
            </Link>
          </div>
          <div className="grid h-[143] grid-cols-2 gap-6">
            <Link
              to="/search"
              search={{ category: "Topik" }}
              className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-6 shadow-brand"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-work text-sm font-medium text-black">
                    Topik
                  </span>
                  <h1 className="font-work text-4xl font-bold text-black">
                    {result.topic.meta.pagination.total}
                  </h1>
                </div>
                <WorkBagOutline />
              </div>
              <p className="font-work text-[13px] font-normal text-black">
                Memuat data topik hukum yang ada di Indonesia
              </p>
            </Link>
            <Link
              to="/search"
              search={{ category: "Lokasi" }}
              className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-6 shadow-brand"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-work text-sm font-medium text-black">
                    Lokasi Pengadilan
                  </span>
                  <h1 className="font-work text-4xl font-bold text-black">
                    {result.location.meta.pagination.total}
                  </h1>
                </div>
                <LocationOutline />
              </div>
              <p className="font-work text-[13px] font-normal text-black">
                Memuat data lokasi pengadilan yang ada di Indonesia
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
