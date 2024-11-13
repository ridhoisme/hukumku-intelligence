import { Tag } from "antd";
import ArrowRight from "../../assets/icons/arrow-right";
import Pdf from "../../assets/images/icon-pdf.png";

type CardRuleProps = {
  tag: string;
  year: string;
  title: string;
  desc: string;
};

const CardRule = ({ desc, tag, title, year }: CardRuleProps) => {
  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-[#E3EBF6] bg-white">
      <div className="h-full w-full space-y-4 p-6">
        <div>
          <Tag className="border-none bg-brand-green-300 bg-opacity-20 px-3 py-[6px] font-work text-sm leading-4 text-brand-green-300">
            {tag}
          </Tag>
          <Tag className="border-none bg-[#80808033] bg-opacity-20 px-3 py-[6px] font-work text-sm leading-4 text-[#404041]">
            {year}
          </Tag>
        </div>
        <div className="space-y-[10px]">
          <h2 className="line-clamp-2 font-work text-xl font-semibold leading-6 text-brand-black">
            {title}
          </h2>
          <p className="line-clamp-2 overflow-hidden text-sm text-brand-black">
            {desc}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4 border-t px-6 py-3">
        <span>Dokumen</span>
        <img className="aspect-square size-6" src={Pdf} />
        <img className="aspect-square size-6" src={Pdf} />
      </div>
    </div>
  );
};

const rules = [
  {
    tag: "SEMA",
    year: "2020",
    title: "CIRCULAR LETTER NUMBER 9 OF 2020",
    desc: "Circular Letter Number 9 of 2020 on Amendment to Circular Letter of The Supreme Court Number",
  },
  {
    tag: "UUD 1945",
    year: "2020",
    title: "SEMA NOMOR 1 TAHUN 2021",
    desc: "Surat Edaran Nomor 1 Tahun 2021 tentang Peralihan Pemeriksaan Keberatan terhadap Putusan Komisi Pengawas Persaingan Usaha ke Pengadilan Niaga",
  },
  {
    tag: "UUD 1945",
    year: "2020",
    title: "SEMA NOMOR 1 TAHUN 2021",
    desc: "Surat Edaran Nomor 1 Tahun 2021 tentang Peralihan Pemeriksaan Keberatan terhadap Putusan Komisi Pengawas Persaingan Usaha ke Pengadilan Niaga",
  },
];

export default function NewDecisionList() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <section className="h-full w-full max-w-brand-lg space-y-6">
        <h1 className="font-work text-[2rem] font-semibold text-brand-black">
          Peraturan dan Putusan Terbaru
        </h1>
        <div className="grid h-full max-h-[242px] w-full grid-cols-3 gap-6">
          {rules.map((rule, i) => (
            <CardRule {...rule} key={i} />
          ))}
        </div>
        <div className="flex w-full justify-center">
          <div className="flex cursor-pointer items-center text-center text-base font-semibold text-brand-navy">
            <span>Lihat lebih banyak</span>
            <ArrowRight />
          </div>
        </div>
      </section>
    </div>
  );
}
