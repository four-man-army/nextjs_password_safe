"use client";
import { cn, genPw } from "@/lib/utils";
import { ClipboardCopy, Info, RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Progress } from "./ui/Progress";
import { Slider } from "./ui/Slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";
import { z } from "zod";
import toast from "react-hot-toast";

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({}) => {
  const [length, setLength] = useState(8);
  const [radio, setRadio] = useState<"all" | "read" | "say">("all");
  const [selected, setSelected] = useState<
    ("uppercase" | "lowercase" | "numbers" | "symbols")[]
  >(["uppercase", "lowercase", "numbers", "symbols"]);
  const [password, setPassword] = useState(genPw(8, "all", selected));
  const [animate, setAnimate] = useState(false);

  const handleCheckbox = (value: string[]): void => {
    try {
      const parsedValue = z
        .array(z.enum(["uppercase", "lowercase", "numbers", "symbols"]))
        .parse(value);
      setSelected((prevState) => {
        if (value.length === 0) {
          return prevState;
        } else {
          return parsedValue;
        }
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast.error(e.issues[0].message);
      }
    }
  };

  useEffect(() => {
    setPassword(genPw(length, radio, selected));
  }, [selected, length, radio]);

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="w-full flex flex-row justify-between rounded-md shadow-lg h-fit p-5 pb-7 max-w-full overflow-hidden relative">
        <p className="text-3xl font-semibold w-fit  flex-1 truncate">
          {password}
        </p>
        <div className="flex flex-row my-auto gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ClipboardCopy
                  className="hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(password)}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white">
                <p>Click to copy</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <RefreshCcw
                  className={cn(
                    "hover:text-blue-500 transition-all duration-300 cursor-pointer",
                    { "animate-rotate": animate }
                  )}
                  onClick={() => {
                    setPassword(genPw(length, radio, selected));
                    setAnimate(true);
                  }}
                  onAnimationEnd={() => setAnimate(false)}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-white">
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Progress
          value={
            length >= 12
              ? 100
              : length >= 9
              ? 75
              : length >= 6
              ? 50
              : length >= 4
              ? 25
              : 0
          }
          className="absolute inset-x-0 bottom-0 bg-slate-300 rounded-none rounded-b-md"
        />
      </div>
      <div className="w-full rounded-md shadow-lg p-10">
        <p className="sm:text-4xl text-2xl font-extrabold border-b-2 border-gray-100 pb-2">
          Customize your password
        </p>
        <div className="w-full h-fit flex flex-row flex-wrap lg:flex-nowrap gap-4 pt-10 justify-around">
          <div className="lg:w-1/2 h-10 w-full flex-grow md:flex-grow-0 flex flex-row gap-4 my-auto relative">
            <Label htmlFor="password" className="text-xl absolute -top-full">
              Password Length
            </Label>
            <Input
              type="number"
              id="password"
              min={1}
              max={50}
              step={1}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-fit my-auto"
            />
            <Slider
              min={1}
              max={50}
              step={1}
              value={[length]}
              onValueChange={(e) => setLength(e[0])}
              className="flex-grow"
            />
          </div>
          <div className="h-fit lg:w-1/3 w-fit my-auto">
            <RadioGroup
              defaultValue="all"
              onValueChange={(s) => {
                try {
                  const e = z.enum(["all", "read", "say"]).parse(s);
                  setRadio(e);
                  switch (e) {
                    case "all":
                      setSelected([
                        "uppercase",
                        "lowercase",
                        "numbers",
                        "symbols",
                      ]);
                      break;
                    case "say":
                      if (
                        !selected.includes("lowercase") &&
                        !selected.includes("lowercase")
                      ) {
                        setSelected(["uppercase", "lowercase"]);
                      } else {
                        setSelected((prevState) =>
                          prevState.filter(
                            (item) => item !== "numbers" && item !== "symbols"
                          )
                        );
                      }
                      break;
                  }
                } catch (e) {
                  if (e instanceof z.ZodError) {
                    toast.error(e.issues[0].message);
                  }
                }
              }}
            >
              <TooltipProvider delayDuration={10}>
                <div className="flex items-center space-x-2">
                  <Radio
                    className="text-blue-500"
                    value="say"
                    id="r1"
                  >
                    Easy to say
                  </Radio>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="sm:w-4 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white w-52">
                      <p>Avoid numbers and special characters</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio
                    className="text-blue-500"
                    value="read"
                    id="r2"
                  >
                    Easy to read
                  </Radio>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="sm:w-4 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white w-56">
                      <p>Avoid ambiguous characters like l, 1, O, and 0</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio
                    className="text-blue-500"
                    value="all"
                    id="r3"
                  >
                    All characters
                  </Radio>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="sm:w-4 w-3" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white w-56">
                      <p>Any character combinations like !, 7, h, K, and l1</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </RadioGroup>
          </div>
          <div className="h-fit lg:w-1/3 w-fit my-auto flex flex-col">
            <CheckboxGroup value={selected} onValueChange={handleCheckbox}>
              <Checkbox
                value="uppercase"
                isSelected={selected.includes("uppercase")}
              >
                Uppercase
              </Checkbox>
              <Checkbox
                value="lowercase"
                isSelected={selected.includes("lowercase")}
              >
                Lowercase
              </Checkbox>
              <Checkbox
                value="numbers"
                isSelected={selected.includes("numbers")}
                isDisabled={radio === "say"}
              >
                Numbers
              </Checkbox>
              <Checkbox
                value="symbols"
                isSelected={selected.includes("symbols")}
                isDisabled={radio === "say"}
              >
                Symbols
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
