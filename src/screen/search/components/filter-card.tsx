import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { Checkbox, Select, Slider, SliderSingleProps } from "antd";
import { TOPIC } from "../../../consts";
import { cn } from "../../../utils/tw";
import { useState } from "react";

const routeApi = getRouteApi("/_layout/_search/search");

const options = [
  { label: "Perceraian", value: "Perceraian" },
  { label: "Harta Gono Gini", value: "Harta Gono Gini" },
  { label: "Pembunuhan", value: "Pembunuhan" },
];

export default function FilterCard() {
  const search = routeApi.useSearch();
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate({ from: "/search" });
  const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (
    value,
  ) => `${value}%`;

  return (
    <div className="flex h-fit w-[326px] flex-col rounded-[10px] bg-white p-4">
      <div className="flex items-center justify-between border-b pb-5">
        <span className="text-lg font-medium text-brand-black">Filter</span>
        <Link
          to="/search"
          search={{ list: true }}
          className="text-brand-green-300 hover:text-inherit"
        >
          Hapus semua
        </Link>
      </div>
      <div className="space-y-3 border-b py-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-brand-black">Kategori</span>
          <Link
            to="/search"
            className="text-brand-green-300 hover:text-inherit"
          >
            Hapus
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {TOPIC.map((val, i) => (
            <Link
              key={i}
              to="/search"
              search={{ ...search, category: val }}
              className={cn(
                "rounded-md bg-brand-green-100 px-5 py-[6px] font-work text-white hover:text-white/50",
                search.category !== val &&
                  "border border-[#C1C1C1] bg-white text-[#C1C1C1] hover:text-[#C1C1C1]",
              )}
            >
              {val}
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-3 border-b py-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-brand-black">
            Top Topic
          </span>
          <Link
            disabled={!search.topic}
            to="/search"
            search={{ ...search, topic: undefined }}
            className={cn(
              "text-brand-green-300 hover:text-brand-green-300/50",
              !search.topic && "text-[#C1C1C1] hover:text-[#C1C1C1]",
            )}
          >
            Hapus
          </Link>
        </div>
        <Checkbox.Group
          className="flex flex-col gap-2"
          value={search.topic}
          onChange={(val) =>
            navigate({ to: "/search", search: { ...search, topic: val } })
          }
        >
          {options.map((val, i) => (
            <Checkbox key={i} value={val.value}>
              {val.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
      <div className="space-y-3 border-b py-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-brand-black">
            Top Lokasi Pengadilan
          </span>
          <Link
            disabled={!search.location}
            to="/search"
            search={{ ...search, location: undefined }}
            className={cn(
              "text-brand-green-300 hover:text-brand-green-300/50",
              !search.location && "text-[#C1C1C1] hover:text-[#C1C1C1]",
            )}
          >
            Hapus
          </Link>
        </div>
        <Select
          onChange={(val) => navigate({ search: { ...search, location: val } })}
          options={[
            {
              value: "Jakarta",
              label: "Jakarta",
            },
            {
              value: "Bandung",
              label: "Bandung",
            },
            {
              value: "Surabaya",
              label: "Surabaya",
            },
          ]}
          value={search.location}
          showSearch
          placeholder="Search"
          className="w-full"
        />
      </div>
      <div className="space-y-3 border-b py-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-brand-black">
            Index Rate
          </span>
          <Link
            disabled={!search.index}
            to="/search"
            onClick={() => setIndex(0)}
            search={{ ...search, index: undefined }}
            className={cn(
              "text-brand-green-300 hover:text-brand-green-300/50",
              !search.index && "text-[#C1C1C1] hover:text-[#C1C1C1]",
            )}
          >
            Hapus
          </Link>
        </div>
        <Slider
          marks={{ 0: "0%", 100: "100%" }}
          value={index}
          tooltip={{ formatter, arrow: false }}
          onChangeComplete={(val) =>
            navigate({ to: "/search", search: { ...search, index: val } })
          }
          onChange={(val) => setIndex(val)}
        />
      </div>
    </div>
  );
}
