"use client";
import { cn, genPw } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ClipboardCopy, Info, RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Checkbox } from "./ui/Checkbox";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Progress } from "./ui/Progress";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { Slider } from "./ui/Slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({}) => {
  const [length, setLength] = useState(8);
  const [radio, setRadio] = useState<"all" | "read" | "say">("all");
  const [checked, setChecked] = useState<{
    upperCase: boolean;
    lowerCase: boolean;
    numbers: boolean;
    symbols: boolean;
  }>({
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(genPw(8, "all", checked));
  const [animate, setAnimate] = useState(false);

  const handleCheckbox = (
    cs: CheckedState,
    value: keyof typeof checked,
  ): void => {
    setChecked((prevState) => {
      if (
        Object.entries({ ...prevState, [value]: cs }).every(
          ([_, v]) => v === false,
        )
      )
        return prevState;
      return {
        ...prevState,
        [value]: cs,
      };
    });
  };

  useEffect(() => {
    setPassword(genPw(length, radio, checked));
  }, [checked, length, radio]);

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
                    { "animate-rotate": animate },
                  )}
                  onClick={() => {
                    setPassword(genPw(length, radio, checked));
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
              className="w-1/4 sm:w-fit my-auto"
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
              onValueChange={(e: typeof radio) => {
                setRadio(e);
                switch (e) {
                  case "all":
                    setChecked({
                      upperCase: true,
                      lowerCase: true,
                      numbers: true,
                      symbols: true,
                    });
                    break;
                  case "say":
                    if (!checked.lowerCase && !checked.upperCase) {
                      setChecked({
                        lowerCase: true,
                        upperCase: true,
                        numbers: false,
                        symbols: false,
                      });
                    }
                    break;
                }
              }}
            >
              <TooltipProvider delayDuration={10}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="text-blue-500 sm:w-4 w-2 sm:h-4 h-2"
                    value="say"
                    id="r1"
                  />
                  <Label htmlFor="r1" className="sm:text-xl text-sm">
                    Easy to say
                  </Label>
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
                  <RadioGroupItem
                    className="text-blue-500 sm:w-4 w-2 sm:h-4 h-2"
                    value="read"
                    id="r2"
                  />
                  <Label htmlFor="r2" className="sm:text-xl text-sm">
                    Easy to read
                  </Label>
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
                  <RadioGroupItem
                    className="text-blue-500 sm:w-4 w-2 sm:h-4 h-2"
                    value="all"
                    id="r3"
                  />
                  <Label htmlFor="r3" className="sm:text-xl text-sm">
                    All characters
                  </Label>
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
          <div className="h-fit lg:w-1/3 w-fit my-auto flex flex-col gap-2">
            <div className="flex items-center">
              <Checkbox
                id="uppercase"
                checked={checked.upperCase}
                className="sm:w-4 w-2 sm:h-4 h-2"
                onCheckedChange={(e) => handleCheckbox(e, "upperCase")}
              />
              <Label htmlFor="uppercase" className="sm:text-xl text-sm pl-1">
                Uppercase
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="lowercase"
                checked={checked.lowerCase}
                className="sm:w-4 w-2 sm:h-4 h-2"
                onCheckedChange={(e) => handleCheckbox(e, "lowerCase")}
              />
              <Label htmlFor="lowercase" className="sm:text-xl text-sm pl-1">
                Lowercase
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="numbers"
                checked={checked.numbers}
                disabled={radio === "say"}
                className="sm:w-4 w-2 sm:h-4 h-2"
                onCheckedChange={(e) => handleCheckbox(e, "numbers")}
              />
              <Label htmlFor="numbers" className="sm:text-xl text-sm pl-1">
                Numbers
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="symbols"
                checked={checked.symbols}
                disabled={radio === "say"}
                className="sm:w-4 w-2 sm:h-4 h-2"
                onCheckedChange={(e) => handleCheckbox(e, "symbols")}
              />
              <Label htmlFor="symbols" className="sm:text-xl text-sm pl-1">
                Symbols
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
