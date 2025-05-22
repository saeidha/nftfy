import React from "react";
import { twMerge } from "tailwind-merge";
import { toEnglishNumber } from "./Helper";
import Label from "./Label";
import { cva } from "class-variance-authority";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputProps {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  type?: string;
  icon?: string;
  value?: string | number;
  required?: boolean;
  placeholder?: string;
  className?: string;
  parentClass?: string;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  readonly?: boolean;
  variant?: InputVariant;
  showArrow?: boolean;
  handleIncrease?: () => void;
  handleDecrease?: () => void;
  disabled?: boolean;
  checked?: boolean;
  step?: number;
  isSearch?: boolean;
  min?: number;
}

type InputVariant = "primary" | "footer" | "none";

export const inputStyle = cva(
  "rounded-md px-8  py-3 text-sm font-semibold shadow-sm relative focus:outline-none",
  {
    variants: {
      variant: {
        primary: [
          "block w-full rounded-md border-0 py-3 px-3  text-main-text ring-1 ring-inset focus:ring-inset ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-background",
        ],
        footer: [
          "block w-full rounded-3xl border-0 py-3 px-3 text-main-text ring-1 ring-inset focus:ring-1 focus:ring-inset ring-main-text sm:text-sm sm:leading-6 bg-footer",
        ],
        none: [
          "block w-full rounded-md border-0 py-3 px-3  text-main-text ring-1 ring-inset focus:ring-inset ring-[#e6e6e6] sm:text-sm sm:leading-6 bg-transparent",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Input({
  name = "",
  onChange,
  error,
  label,
  type = "text",
  icon = "",
  value,
  required = false,
  placeholder = "",
  className = "",
  variant = "primary",
  onBlur,
  readonly = false,
  parentClass = "",
  isSearch = false,
  min,
}: InputProps) {
  function validate(
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.ClipboardEvent<HTMLInputElement>
  ) {
    switch (type) {
      case "number":
        let key =
          e.type === "paste"
            ? (
                e as React.ClipboardEvent<HTMLInputElement>
              ).clipboardData.getData("text/plain")
            : toEnglishNumber((e as React.KeyboardEvent<HTMLInputElement>).key);
        if (key !== "Backspace" && key !== "Delete") {
          if (!/[0-9]/.test(key)) {
            e.preventDefault();
          }
        }
        break;
      case "email":
        if ((e.target as HTMLInputElement).value.includes("@")) {
          e.preventDefault();
        }
        break;
    }
  }

  return (
    <div className={twMerge("", parentClass)} onBlur={onBlur}>
      <Label label={label} required={required} />
      <div className="relative">
        {isSearch && (
          <Icon
            icon="material-symbols:search-rounded"
            className="absolute top-1/2 -translate-y-1/2 left-3 text-(--primary)"
          />
        )}
        <input
          type={type}
          readOnly={readonly}
          name={name}
          id={name}
          className={twMerge(
            inputStyle({ variant }),
            className,
            isSearch && " pl-8"
          )}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={(e) =>
            type == "number" || type == "email" ? validate(e) : null
          }
          min={min}
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

export default Input;
