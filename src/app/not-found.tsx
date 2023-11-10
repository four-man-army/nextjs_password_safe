import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { FC } from "react";

import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
    title: "Password Safe - not found",
    noIndex: true,
});

const PageNotFound: FC = () => {
  return (
    <section className="container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold">Site not found...</h1>
      <p>The site you&apos;re searching for does not exist.</p>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
        href="/"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
};

export default PageNotFound;
