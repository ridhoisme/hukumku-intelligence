import CardDecision from "./components/card-decision";
import CardIndexPoint from "./components/card-index-point";
import CardTopCategory from "./components/card-top-category";
import CardTotalCase from "./components/card-total-case";

export default function Analysis() {
  return (
    <div className="flex h-full w-full justify-center px-[50px] py-16">
      <div className="flex h-[296px] w-full max-w-brand-lg gap-6">
        <CardDecision />
        <div className="grid h-full w-full max-w-[17.5rem] grid-rows-2 gap-6">
          <CardTotalCase />
          <CardIndexPoint />
        </div>
        <CardTopCategory />
      </div>
    </div>
  );
}
