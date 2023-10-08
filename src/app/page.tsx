import { Bot, HomeIcon, Key } from "lucide-react"
import Link from "next/link";

export default function Home() {
    return (
      <>
        <div className="w-full text-center text-6xl mt-20 flex flex-row justify-center gap-4">
          <HomeIcon className="h-[60px] w-[60px]" />
          <h1>Home</h1>
        </div>
        <div className="w-full max-w-3xl sm:h-2/5 flex mx-auto flex-row gap-10 justify-around mt-16">
          <Link
            href="/safe"
            className="bg-transparent w-1/2 aspect-square flex flex-col justify-center my-auto text-center border-4 border-blue-500 rounded-3xl hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <Key className="w-full h-full p-6" />
            <p className="w-full text-4xl font-semibold mb-5 sm:inline hidden">
              Safe
            </p>
          </Link>
          <Link
            href="/generate"
            className="bg-transparent w-1/2 aspect-square flex flex-col justify-center my-auto text-center border-4 border-blue-500 rounded-3xl hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            <Bot className="w-full h-full p-6" />
            <p className="w-full text-4xl font-semibold mb-5 sm:inline hidden">
              Generate
            </p>
          </Link>
        </div>
      </>
    );
}
