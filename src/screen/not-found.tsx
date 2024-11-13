import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        className="font-work"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button className="bg-brand-green-300 font-work text-white" href="/">
            Back Home
          </Button>
        }
      />
    </div>
  );
}
