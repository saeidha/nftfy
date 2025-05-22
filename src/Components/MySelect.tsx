import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type MySelectProps = {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function MySelect({
  options,
  placeholder = "Newest",
  onChange,
}: MySelectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setIsOpen(false); // Close dropdown after selection
  };
  return (
    <div className="relative w-52 z-[999]">
      {/* Selected Option Box */}
      <div
        className="bg-transparent py-3 px-3 text-center border border-(--primary) rounded-md text-(--primary) cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-(--primary)">
          {selected
            ? options.find((opt) => opt.value === selected)?.label
            : placeholder}
        </span>
        <span
          className={`ml-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          &#9662;
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-48 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-market-color cursor-pointer hover:text-(--primary)"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
