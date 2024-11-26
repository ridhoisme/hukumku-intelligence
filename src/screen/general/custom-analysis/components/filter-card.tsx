import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Button, Form, Input } from "antd";
import { General } from "../../../../type/general";
import fetchInterceptor from "../../../../config/axios";

type FormProps = {
  lawyer: string;
  judge: string;
  topic: string;
  location: string;
};

export default function FilterCard() {
  const searchParams = useSearch({ from: "/_layout/general/$tab" });
  const navigate = useNavigate({ from: "/general/$tab" });

  const [form] = Form.useForm<FormProps>();

  const { data } = useSuspenseQuery({
    queryKey: ["GET_GENERAL", searchParams.id],
    queryFn: async () =>
      await fetchInterceptor<General>(`/generals/${searchParams.id}`),
  });

  const handleFinish = ({ judge, lawyer, location, topic }: FormProps) => {
    const searchObj: Record<string, string | undefined> = {};

    if (judge) searchObj.judge = judge;
    if (lawyer) searchObj.lawyer = lawyer;
    if (location) searchObj.location = location;
    if (topic) searchObj.topic = topic;

    navigate({ search: { id: searchParams.id, ...searchObj } });
  };

  const handleReset = () => {
    navigate({
      search: {
        id: searchParams.id,
      },
    }).then(() => form.resetFields());
  };

  return (
    <div className="col-span-3 w-full max-w-[326px] rounded-[10px] bg-white p-6">
      <div className="space-y-3">
        <h1 className="font-work text-2xl font-semibold text-brand-black">
          Custom Analysis
        </h1>
        <p className="font-work text-[#404041]">
          Lihat performa antar {data.data.data.name} dengan kategori lainnya
        </p>
      </div>
      <div className="space-y-3 py-3">
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Advokat Lawan
              </span>
            }
            name="lawyer"
            className="mb-2 border-t pt-3"
            initialValue={searchParams.lawyer ?? ""}
          >
            <Input placeholder="Cari advokat lawan" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Hakim Dihadapi
              </span>
            }
            name="judge"
            className="mb-2 border-t pt-3"
            initialValue={searchParams.judge ?? ""}
          >
            <Input placeholder="Cari hakim yang dihadapi" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Topik
              </span>
            }
            name="topic"
            className="mb-2 border-t pt-3"
            initialValue={searchParams.topic ?? ""}
          >
            <Input placeholder="Cari topik" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Lokasi Pengadilan
              </span>
            }
            name="location"
            className="mb-2 border-t pt-3"
            initialValue={searchParams.location ?? ""}
          >
            <Input placeholder="Cari lokasi pengadilan" className="h-10" />
          </Form.Item>
          <div className="space-y-3 py-3">
            <Button
              htmlType="submit"
              type="primary"
              className="w-full bg-brand-navy font-work text-sm font-semibold text-white hover:!bg-brand-navy/90"
            >
              Lihat Analisis
            </Button>
            <Button
              onClick={handleReset}
              type="link"
              className="w-full text-brand-black hover:!text-brand-black/80"
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
