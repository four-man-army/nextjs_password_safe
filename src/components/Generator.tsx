"use client";
import { FC, useEffect, useState } from "react";
import { Slider } from "./ui/Slider";
import { Input } from "./ui/Input";
import { Progress } from "./ui/Progress";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { Label } from "./ui/Label";
import { Checkbox } from "./ui/Checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { genPw } from "@/lib/utils";

interface GeneratorProps {}

const Generator: FC<GeneratorProps> = ({ }) => {
  const [length, setLength] = useState(8);
  const [radio, setRadio] = useState("all");
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

  const handleCheckbox = (
    cs: CheckedState,
    value: "upperCase" | "lowerCase" | "numbers" | "symbols"
  ): void => {
    setChecked((prevState) => {
      if (
        Object.entries({ ...prevState, [value]: cs }).every(
          ([_, v]) => v === false
        )
      )
        return prevState;
      return {
        ...prevState,
        [value]: cs,
      };
    });
    console.log(checked);
  };

  useEffect(() => {
    setPassword(genPw(length, radio, checked));
  }, [checked, length, radio])

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="w-full rounded-md shadow-lg p-10 relative overflow-hidden">
        <p className="text-3xl font-semibold">{password}</p>
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
          className="absolute inset-x-0 bottom-0 bg-slate-300 rounded-none"
        />
      </div>
      <div className="w-full rounded-md shadow-lg p-10 flex-grow">
        <p className="text-4xl font-extrabold border-b-2 border-gray-100 pb-2">
          Customize your password
        </p>
        <div className="w-full h-full flex flex-row gap-4">
          <div className="w-full h-10 flex flex-row gap-4 my-auto relative">
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
          <div className="h-fit w-1/3 my-auto">
            <RadioGroup defaultValue="all" onValueChange={(e) => {
              setRadio(e)
              if (e === "all") setChecked({ upperCase: true, lowerCase: true, numbers: true, symbols: true })
            }}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="text-blue-500" value="say" id="r1" />
                <Label htmlFor="r1" className="text-xl">
                  Easy to say
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  className="text-blue-500"
                  value="read"
                  id="r2"
                />
                <Label htmlFor="r2" className="text-xl">
                  Easy to read
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="text-blue-500" value="all" id="r3" />
                <Label htmlFor="r3" className="text-xl">
                  All characters
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="h-fit w-1/3 my-auto flex flex-col gap-2">
            <div>
              <Checkbox
                id="uppercase"
                checked={checked.upperCase}
                onCheckedChange={(e) => handleCheckbox(e, "upperCase")}
              />
              <Label htmlFor="uppercase" className="text-xl pl-1">
                Uppercase
              </Label>
            </div>
            <div>
              <Checkbox
                id="lowercase"
                checked={checked.lowerCase}
                onCheckedChange={(e) => handleCheckbox(e, "lowerCase")}
              />
              <Label htmlFor="lowercase" className="text-xl pl-1">
                Lowercase
              </Label>
            </div>
            <div>
              <Checkbox
                id="numbers"
                checked={checked.numbers}
                disabled={radio === "say"}
                onCheckedChange={(e) => handleCheckbox(e, "numbers")}
              />
              <Label htmlFor="numbers" className="text-xl pl-1">
                Numbers
              </Label>
            </div>
            <div>
              <Checkbox
                id="symbols"
                checked={checked.symbols}
                disabled={radio === "say"}
                onCheckedChange={(e) => handleCheckbox(e, "symbols")}
              />
              <Label htmlFor="symbols" className="text-xl pl-1">
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
