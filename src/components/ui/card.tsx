import { ReactNode } from "@tanstack/react-router";
import { cn } from "../../utils/tw";

type Card = {
  children: ReactNode;
  title: string;
  className?: string;
  id?: string;
};

export const CardTitle = ({ str }: { str: string }) => {
  return (
    <div className="border-b border-black border-opacity-10 p-3">
      <h1 className="font-work text-[22px] font-semibold">{str}</h1>
    </div>
  );
};

export function Card({ children, ...props }: Card) {
  return (
    <div
      {...props}
      className={cn(
        "flex cursor-pointer flex-col rounded-[10px] bg-white",
        props.className,
      )}
    >
      {props.title && <CardTitle str={props.title} />}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
