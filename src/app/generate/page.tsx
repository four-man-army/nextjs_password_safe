import Generator from "@/components/Generator";
import { Bot } from "lucide-react";

export default function page() {


    return (
      <div className="w-full h-full mt-4 flex flex-col">
        <div className="flex justify-center gap-5">
          <Bot className="h-16 w-16" />
          <h1 className="text-6xl font-medium">Password Generator</h1>
        </div>
        <div className="w-2/3 h-1/2 p-4 mx-auto mt-8">
          <Generator />
        </div>
      </div>
    );
}
