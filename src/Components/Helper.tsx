import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

export function EthToWei(ethValue: number) {
  return BigInt(Math.floor(ethValue * 10 ** 18));
}

export function WeiToEth(weiValue: any) {
  return Number(weiValue) / 10 ** 18;
}

export function GetRemainingTime(futureTimestamp: BigInt) {
  const now = Date.now(); // Current timestamp in milliseconds
  const diff = Number(futureTimestamp) - now; // Difference in milliseconds

  if (diff <= 0) {
    return "Time expired";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert to days
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Convert to hours

  return { days: days, hours: hours };
}

export const AnimationVariants = (
  type: string = "y",
  start: number = 10,
  end: number = 0,
  duration: number = 0.8,
  staggerChildren: number = 0.5
) => {
  switch (type) {
    case "y":
      return {
        hidden: { y: `${start}vh`, opacity: 0 },
        visible: {
          y: `${end}vh`,
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: duration,
          },
        },
      };
    case "x":
      return {
        hidden: { x: `${start}vw`, opacity: 0 },
        visible: {
          x: `${end}vh`,
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: duration,
          },
        },
      };
    case "upDown":
      return {
        animate: {
          y: ["-10px", "0px", "-10px"], // Loop from 0% to 100% and back to 0%
          transition: {
            duration: 3, // Duration for one loop cycle
            ease: "linear", // Linear easing for smooth motion
            repeat: Infinity, // Repeat the animation infinitely
            repeatType: "loop", // Type of repeat (loop for smooth continuous motion)
          },
        },
      };
    case "leftRight":
      return {
        initial: { x: "-50vw" },
        animate: { x: 0 },
        transition: {
          duration: 1,
          origin: 1,
          delay: 1,
        },
      };
    case "introC":
      return {
        visible: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      };
    case "slideC":
      return {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: duration,
            staggerChildren: staggerChildren,
          },
        },
      };
  }
};

// export const SelectType = {
//     primary:
//         "block w-full rounded-md border-0 py-1.5 text-black ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-primary ring-[#e6e6e6] sm:text-sm sm:leading-6",
// };

export const ImageError = (type: any) => {
  switch (type) {
    case "product":
      return ({ currentTarget }: React.SyntheticEvent<HTMLImageElement>) => {
        currentTarget.onerror = null;
        currentTarget.src = "/assets/img/product_no_image.jpg";
      };
      break;
  }
};

export default function IconType({
  type,
  onClick,
  w = 20,
  h = 20,
  className = "",
}: {
  type: "view" | "edit" | "delete";
  onClick?: () => void;
  w?: number;
  h?: number;
  className?: string;
}) {
  switch (type) {
    case "view":
      return (
        <Icon
          icon="carbon:view-filled"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
    case "edit":
      return (
        <Icon
          icon="entypo:edit"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
    case "delete":
      return (
        <Icon
          icon="fluent:delete-28-filled"
          className={twMerge("text-gray-600", className)}
          width={w}
          height={h}
          onClick={onClick}
        />
      );
  }
}

const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];
export const toEnglishNumber = (str: any) => {
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};

export const FileSizeFormatter = (size: number) => {
  return size < 1048576
    ? `${(size / 1024).toFixed(2)} KB`
    : `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const addCommas = (num: number) =>
  num != null
    ? removeNonNumeric(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : null;

export const removeNonNumeric = (num: number) =>
  num.toString().replace(/[^0-9]/g, "");

export function SetCookie(name: string, value: any, days: number) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function GetCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function EraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function SaveCart(item: { id: any }, count: number) {
  let cart = GetCart();
  let objIndex = cart.findIndex(
    (obj: { item: { id: any } }) => obj.item.id == item.id
  );
  if (count >= 0) {
    if (objIndex > -1) {
      cart[objIndex].count = count;
    } else {
      cart.push({ item: item, count: count });
    }
  }
  console.log("in basket : ", item);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function GetCart() {
  let items = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];
  return items;
}

export function RemoveCart(id: any) {
  let cart = GetCart();
  var filtered = cart.filter(function (el: { item: { id: any } }) {
    return el.item.id != id;
  });
  localStorage.setItem("cart", JSON.stringify(filtered));
}

export function MakeId({ length = 32 }: { length?: number } = {}): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const UpdateArrayOfObject = (
  items: any[],
  compare: string | number,
  id: string | number,
  filed: string,
  newValue: any
) => {
  const newItems = items.map((item) => {
    if (item.compare === id) {
      return { ...item, filed: newValue };
    }
    return item;
  });
  return newItems;
};

export function ProvincesList() {
  return [
    {
      id: 1,
      label: "آذربایجان شرقی",
      value: "آذربایجان-شرقی",
    },
    {
      id: 2,
      label: "آذربایجان غربی",
      value: "آذربایجان-غربی",
    },
    {
      id: 3,
      label: "اردبیل",
      value: "اردبیل",
    },
    {
      id: 4,
      label: "اصفهان",
      value: "اصفهان",
    },
    {
      id: 5,
      label: "البرز",
      value: "البرز",
    },
    {
      id: 6,
      label: "ایلام",
      value: "ایلام",
    },
    {
      id: 7,
      label: "بوشهر",
      value: "بوشهر",
    },
    {
      id: 8,
      label: "تهران",
      value: "تهران",
    },
    {
      id: 9,
      label: "چهارمحال و بختیاری",
      value: "چهارمحال-بختیاری",
    },
    {
      id: 10,
      label: "خراسان جنوبی",
      value: "خراسان-جنوبی",
    },
    {
      id: 11,
      label: "خراسان رضوی",
      value: "خراسان-رضوی",
    },
    {
      id: 12,
      label: "خراسان شمالی",
      value: "خراسان-شمالی",
    },
    {
      id: 13,
      label: "خوزستان",
      value: "خوزستان",
    },
    {
      id: 14,
      label: "زنجان",
      value: "زنجان",
    },
    {
      id: 15,
      label: "سمنان",
      value: "سمنان",
    },
    {
      id: 16,
      label: "سیستان و بلوچستان",
      value: "سیستان-بلوچستان",
    },
    {
      id: 17,
      label: "فارس",
      value: "فارس",
    },
    {
      id: 18,
      label: "قزوین",
      value: "قزوین",
    },
    {
      id: 19,
      label: "قم",
      value: "قم",
    },
    {
      id: 20,
      label: "کردستان",
      value: "کردستان",
    },
    {
      id: 21,
      label: "کرمان",
      value: "کرمان",
    },
    {
      id: 22,
      label: "کرمانشاه",
      value: "کرمانشاه",
    },
    {
      id: 23,
      label: "کهگیلویه و بویراحمد",
      value: "کهگیلویه-بویراحمد",
    },
    {
      id: 24,
      label: "گلستان",
      value: "گلستان",
    },
    {
      id: 25,
      label: "لرستان",
      value: "لرستان",
    },
    {
      id: 26,
      label: "گیلان",
      value: "گیلان",
    },
    {
      id: 27,
      label: "مازندران",
      value: "مازندران",
    },
    {
      id: 28,
      label: "مرکزی",
      value: "مرکزی",
    },
    {
      id: 29,
      label: "هرمزگان",
      value: "هرمزگان",
    },
    {
      id: 30,
      label: "همدان",
      value: "همدان",
    },
    {
      id: 31,
      label: "یزد",
      value: "یزد",
    },
  ];
}

export function CountryList() {
  return [
    {
      id: 1,
      label: "ایران",
      value: "ایران",
    },
  ];
}

export function FindNestedArray(data: [], field: string, slug: string) {
  function iter(a: { slug: any; children: any[] } & Record<string, any>) {
    if (a.slug === slug) {
      result = a;
      return true;
    }
    return Array.isArray(a[field]) && a[field].some(iter);
  }
  var result: any;
  data.some(iter);
  return result;
}
