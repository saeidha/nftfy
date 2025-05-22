import React, { useEffect, useRef } from "react";
import Label from "./Label";
import { twMerge } from "tailwind-merge";

interface TextareaProps {
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  label?: string;
  icon?: string;
  value: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
  parentClass?: string;
  disabled?: boolean;
}

function Textarea({
  name = "",
  onChange,
  error,
  label = "",
  icon = "",
  value,
  required = false,
  className,
  placeholder,
  rows = 1,
  parentClass,
  disabled = false,
}: TextareaProps) {
  const InputType = {
    primary:
      "block w-full rounded-md border-0 py-3 px-3 ring-1 ring-inset ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-background resize-none overflow-none focus:outline-none field-sizing-content",
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const HandleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    onChange(e);
  };

  return (
    <div className={parentClass}>
      <Label label={label} required={required} />
      <div className="relative">
        <textarea
          ref={textareaRef}
          name={name}
          id={name}
          className={twMerge(InputType["primary"], className)}
          rows={rows}
          value={value}
          onChange={HandleInput}
          placeholder={placeholder}
          disabled={disabled}
          style={{ scrollbarWidth: "none" }}
        />
        {icon.length > 0 ? (
          <span className="absolute left-0 top-0 bottom-0 p-2 input-ic rounded-l-md ring-1 ring-inset ring-gray-300">
            {icon}
          </span>
        ) : null}
      </div>
      <span className="text-red-600">{error}</span>
    </div>
  );
}

export default Textarea;
