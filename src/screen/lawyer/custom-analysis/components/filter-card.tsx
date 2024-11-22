import { Button, Form, Input } from "antd";

export default function FilterCard() {
  return (
    <div className="w-full max-w-[326px] rounded-[10px] bg-white p-6">
      <div className="space-y-3">
        <h1 className="font-work text-2xl font-semibold text-brand-black">
          Custom Analysis
        </h1>
        <p className="font-work text-[#404041]">
          Lihat performa antar Advokat Fritz Paris Junior Hutapea, S.H., LL. B.
          dengan kategori lainnya
        </p>
      </div>
      <div className="space-y-3 py-3">
        <Form layout="vertical">
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Advokat Lawan
              </span>
            }
            name="lawyer_enemy"
            className="mb-2 border-t pt-3"
          >
            <Input placeholder="Cari advokat lawan" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Hakim Dihadapi
              </span>
            }
            name="lawyer_enemy"
            className="mb-2 border-t pt-3"
          >
            <Input placeholder="Cari hakim yang dihadapi" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Topik
              </span>
            }
            name="lawyer_enemy"
            className="mb-2 border-t pt-3"
          >
            <Input placeholder="Cari topik" className="h-10" />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-work text-base font-semibold text-brand-black">
                Lokasi Pengadilan
              </span>
            }
            name="lawyer_enemy"
            className="mb-2 border-t pt-3"
          >
            <Input placeholder="Cari lokasi pengadilan" className="h-10" />
          </Form.Item>
          <div className="space-y-3 py-3">
            <Button
              type="primary"
              className="w-full bg-brand-navy font-work text-sm font-semibold text-white hover:!bg-brand-navy/90"
            >
              Lihat Analisis
            </Button>
            <Button
              type="link"
              className="w-full text-brand-black hover:!text-brand-black/80"
            >
              Lihat Analisis
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
