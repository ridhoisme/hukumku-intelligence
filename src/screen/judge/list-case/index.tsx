import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Pagination, Table } from "antd";
import fetchInterceptor from "../../../config/axios";
import { JudgeListCase } from "../../../type/judge";
import { formatDate } from "../../../utils/date";
import LawyerListCaseColumns from "./columns";

export default function ListCase() {
  const searchParams = useSearch({ from: "/_layout/judge/$tab" });

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["GET_JUDGE_LIST_CASE", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<JudgeListCase>(
        `/judge-list-case/${searchParams.id}`,
      ),
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-[50px] py-16">
      <div className="w-full max-w-brand-lg space-y-6">
        <div className="bg-white p-4">
          <Table
            columns={LawyerListCaseColumns()}
            rowKey={"id"}
            loading={isLoading}
            dataSource={data.data.data}
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
            pagination={false}
          />
        </div>
        <Pagination
          total={data.data.data.length}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          defaultPageSize={5}
          defaultCurrent={1}
          locale={{ items_per_page: "" }}
          align="center"
          pageSizeOptions={[5, 10, 20, 40, 100]}
        />
      </div>
    </div>
  );
}
