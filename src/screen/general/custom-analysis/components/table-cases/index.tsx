import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Card } from "../../../../../components/ui/card";
import { GeneralListCaseCustom } from "../../../../../type/general";
import { formatDate } from "../../../../../utils/date";
import TableCasesColumns from "./columns";

type TableCases = {
  data: GeneralListCaseCustom;
};

export default function TableCases({ data }: TableCases) {
  return (
    <Card title="Daftar Klien">
      <Table
        rowKey={"id"}
        pagination={{
          total: data.data?.length ?? 0,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
          locale: { items_per_page: "" },
          position: ["bottomCenter"],
          pageSizeOptions: [5, 10, 20, 40, 100],
        }}
        className="m-4 font-work"
        dataSource={data.data}
        columns={TableCasesColumns()}
        scroll={{ x: true }}
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <UpOutlined onClick={(e) => onExpand(record, e)} />
            ) : (
              <DownOutlined onClick={(e) => onExpand(record, e)} />
            ),
          expandedRowRender: (c) => (
            <div className="grid grid-cols-3 pl-12">
              <div className="space-y-4">
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Nomor Kasus
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {c.case_number}
                  </span>
                </div>
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Jenis Hukuman
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {c.type_punishment}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Tanggal Mulai
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {formatDate(c.start_date)}
                  </span>
                </div>
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Putusan Awal
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {c.initial_claim.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Tanggal Selesai
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {formatDate(c.finish_date)}
                  </span>
                </div>
                <div className="text flex flex-col font-work">
                  <span className="text-sm text-brand-grey-200">
                    Putusan Akhir
                  </span>
                  <span className="text-base font-medium text-brand-black">
                    {c.final_verdict.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ),
        }}
      />
    </Card>
  );
}
