import Generator from "@/components/Generator";
import { Bot } from "lucide-react";

export default function page() {
  return (
    <div className="w-full h-full pt-4 flex flex-col">
      <div className="flex justify-center gap-5">
        <Bot className="h-full w-fit" />
        <h1 className="sm:text-6xl text-4xl font-medium w-fit">
          Password Generator
        </h1>
      </div>
      <div className="xl:w-2/3 sm:w-11/12 w-full h-full sm:p-4 mx-auto mt-8">
        <Generator />
      </div>
    </div>
  );
}
