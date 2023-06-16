import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { Password } from "./validators/password";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(password: Password, key: string) {
  const dbMember: DBMember = {
    id: password.id,
    ct: AES.encrypt(JSON.stringify(password), key).toString()
  }
  return JSON.stringify(dbMember);
}

export function decrypt(text: string, key: string) {
  return AES.decrypt((JSON.parse(text) as DBMember).ct, key).toString(CryptoJS.enc.Utf8);
}

export function genPw(length: number, specialChars: boolean): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specialCharacters = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
  var result = "";

  if (specialChars) {
    for (var i = 0; i < length; i++) {
      var list = characters + specialCharacters;
      result += list.charAt(Math.random() * list.length);
    }
    return result;
  } else {
    var list = characters;
    for (var i = 0; i < length; i++) {
      result += list.charAt(Math.random() * list.length);
    }
    return result;
  }
}