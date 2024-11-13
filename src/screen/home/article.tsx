import { Link } from "@tanstack/react-router";
import ArticleImg from "../../assets/images/article-image.png";
import ChevronRight from "../../assets/icons/chevron-right";

const CardArticle = () => (
  <div className="space-y-6">
    <div className="relative h-[228px] w-full">
      <img
        alt="image"
        src={ArticleImg}
        className="absolute h-full w-full object-cover"
      />
    </div>
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h2 className="line-clamp-2 text-xl font-semibold leading-7 text-brand-black">
          Apa Itu Hukum Perdata? Simak Penjelasan dan Contoh Kasus Relevannya
        </h2>
        <p className="line-clamp-2 font-work text-sm text-brand-black">
          Hukum perdata adalah salah satu cabang ilmu hukum yang menerapkan
          pengaturan terhadap hubungan individu maupun badan hukum. Secara
          khusus, hukum perdata fokus terhadap kepentingan-kepentingan pribadi
          subjek hukumnya. Artikel ini membahas tentang pengertian hukum
          perdata, berbagai asas yang melingkupi hukum perdata, objek hukum
          perdata, sumber yang digunakan untuk penegakan hukumnya, dan sejumlah
          perkara terkait.
        </p>
      </div>
      <Link href="#" className="flex items-center text-base text-black">
        <span className="leading-4">Baca selengkapnya</span>
        <ChevronRight />
      </Link>
    </div>
  </div>
);

export default function Article() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pb-[100px]">
      <section className="h-full w-full max-w-brand-lg space-y-6">
        <h1 className="font-work text-[2rem] font-semibold text-brand-black">
          Artikel Terbaru
        </h1>
        <div className="grid h-full max-h-[406px] w-full grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardArticle key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
