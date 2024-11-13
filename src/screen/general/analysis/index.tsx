import CardDecision from "./components/card-decision";
import CardIndexPoint from "./components/card-index-point";
import CardPerdata from "./components/card-perdata";
import CardPidana from "./components/card-pidana";
import CardTopCategory from "./components/card-top-category";
import CardTotalCase from "./components/card-total-case";
import TableListJudge from "./components/table-list-judge";
import TableListLawyer from "./components/table-list-lawyer";
import TableListLocation from "./components/table-list-location";
import TableListTopic from "./components/table-list-topic";

export default function Analysis() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="grid h-[123px] w-full max-w-brand-lg grid-cols-4 gap-6">
        <CardPerdata />
        <CardPidana />
        <CardTotalCase />
        <CardIndexPoint />
      </div>
      <div className="grid h-[296px] w-full max-w-brand-lg grid-cols-2 gap-6">
        <CardDecision />
        <CardTopCategory />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLawyer />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListJudge />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListTopic />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLocation />
      </div>
    </div>
  );
}
