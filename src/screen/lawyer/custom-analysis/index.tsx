import CardDiagram from "./components/card-diagram";
import FilterCard from "./components/filter-card";

export default function CustomAnalysis() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="flex w-full max-w-brand-lg gap-6">
        <FilterCard />
        <div className="flex w-full flex-col">
          <CardDiagram granted={0} partially={0} rejected={0} />
        </div>
      </div>
    </div>
  );
}
