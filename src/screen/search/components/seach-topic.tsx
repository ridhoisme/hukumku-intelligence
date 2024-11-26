import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Input, Popover } from "antd";
import { useState } from "react";
import { TopicProps } from "../../../type/topic";
import { cn } from "../../../utils/tw";

type SearchTopic = {
  topics: TopicProps[];
  topicValue?: string[];
  onChange: (val: string[]) => void;
};

const CheckboxRender = ({ topicValue, onChange, topics }: SearchTopic) => {
  const [filteredTopic, setFilteredTopic] = useState(topics);
  const [checked, setChecked] = useState<string[]>(topicValue ?? []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setFilteredTopic(
      topics.filter((t) =>
        t.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  };

  return (
    <div className="flex h-60 w-60 flex-col gap-2">
      <Input
        placeholder="Search topik"
        name="search"
        onChange={handleSearchChange}
      />

      <div className="flex-1 overflow-x-auto">
        <Checkbox.Group
          className="flex flex-col gap-2"
          value={checked}
          onChange={setChecked}
        >
          {filteredTopic.map((val) => (
            <Checkbox key={val.id} value={val.name}>
              {val.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
      <div className="flex justify-end gap-2 font-work text-xs">
        <span
          onClick={() => setChecked([])}
          className={cn(
            "cursor-pointer",
            checked.length === 0 ? "text-brand-black/20" : "text-brand-black",
          )}
        >
          Reset
        </span>
        <span
          className="cursor-pointer text-brand-green-300"
          onClick={() => onChange(checked)}
        >
          Filter
        </span>
      </div>
    </div>
  );
};

export default function SearchTopic({
  topicValue,
  onChange,
  topics,
}: SearchTopic) {
  return (
    <Popover
      className="ml-6"
      content={
        <CheckboxRender
          onChange={onChange}
          topics={topics}
          topicValue={topicValue}
        />
      }
      trigger="click"
      placement="rightBottom"
      arrow={false}
    >
      <span>Lainya</span> <DownOutlined />
    </Popover>
  );
}
