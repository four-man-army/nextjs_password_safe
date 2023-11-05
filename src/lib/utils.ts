import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { Password } from "./validators/password";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addHttps(input: string): string {
  if (input.includes("http://") || input.includes("https://")) {
    return input;
  } else {
    const safeInput = encodeURI(input);
    return "https://" + safeInput;
  }
}

export function encrypt(password: Password, key: string) {
  return AES.encrypt(JSON.stringify(password), key).toString();
}

export function decrypt(text: string, key: string) {
  return AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}

export function genPw(
  length: number,
  type: string,
  modes: {
    upperCase: boolean;
    lowerCase: boolean;
    numbers: boolean;
    symbols: boolean;
  },
): string {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%&*()+}{[]\\?></-=";
  var result = "";

  const getList = (): string => {
    var list = "";
    if (modes.upperCase) list += upperCase;
    if (modes.lowerCase) list += lowerCase;
    if (modes.numbers) list += numbers;
    if (modes.symbols) list += specialCharacters;
    return list;
  };

  switch (type) {
    case "say":
      for (var i = 0; i < length; i++) {
        modes.symbols = false;
        modes.numbers = false;
        result += getList().charAt(Math.random() * getList().length);
      }
      break;
    case "read":
      for (var i = 0; i < length; i++) {
        var list = getList();
        var newList = list.replace(
          /([Oo01Iilg9MNmnWVwv\\$#!&*+{}\[\]<>/\(\)])/g,
          "",
        );
        result += newList.charAt(Math.random() * newList.length);
      }
      break;
    case "all":
      for (var i = 0; i < length; i++) {
        var list = getList();
        result += list.charAt(Math.random() * list.length);
      }
      break;
  }
  return result;
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
  title = "Password Safe - The most safe password safe",
  description = "Password Safe is a password manager that is safe and secure.",
  image = "/thumbnail.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@bimbobjorn",
    },
    icons,
    metadataBase: new URL("https://www.password-safe.ch/"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
