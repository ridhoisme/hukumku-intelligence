import CardDecision from "./components/card-decision";
import CardIndexPoint from "./components/card-index-point";
import CardTopCategory from "./components/card-top-category";
import CardTotalCase from "./components/card-total-case";
import TableListClient from "./components/table-list-client";

import TableListLawyer from "./components/table-list-lawyer";
import TableListLocation from "./components/table-list-location";
import TableListTopic from "./components/table-list-topic";

export default function Analysis() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="flex h-[296px] w-full max-w-brand-lg gap-6">
        <CardDecision />
        <div className="grid h-full w-full max-w-[17.5rem] grid-rows-2 gap-6">
          <CardTotalCase />
          <CardIndexPoint />
        </div>
        <CardTopCategory />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLawyer />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListTopic />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListClient />
      </div>
      <div className="w-full max-w-brand-lg">
        <TableListLocation />
      </div>
    </div>
  );
}
