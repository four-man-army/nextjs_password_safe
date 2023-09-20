"use client";
import { cn } from "@/lib/utils";
import { ClipboardCopy, EyeOff } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";
import { FC, useState } from "react";
import RemovePassword from "./RemovePassword";

interface PasswordFieldProps {
  password: string;
  id: string;
}

const PasswordField: FC<PasswordFieldProps> = ({ password, id }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  let width = window.innerWidth;
  const hiddenPassword = width < 640 ? "****" : "**********";

  return (
    <div className="flex flex-row w-full">
      <p
        className={cn({
          secure: !showPassword,
        })}
      >
        {showPassword ? password : hiddenPassword}
      </p>
      <div className="ml-auto flex pl-2 flex-row sm:gap-2 gap-1">
        {!showPassword ? (
          <Eye
            className="hover:text-blue-500 transition-colors duration-300 sm:w-6 w-4 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        ) : (
          <EyeOff
            className="hover:text-blue-500 transition-colors duration-300 sm:w-6 w-4 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        )}{" "}
        <ClipboardCopy
          className="hover:text-blue-500 transition-colors duration-300 sm:w-6 w-4 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(password)}
        />{" "}
        <RemovePassword id={id} />
      </div>
    </div>
  );
};

export default PasswordField;
