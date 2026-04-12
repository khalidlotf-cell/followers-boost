"use client";
import dynamic from "next/dynamic";

const ShopHome = dynamic(() => import("./ShopHome"), { ssr: false });

export default function ShopWrapper() {
  return <ShopHome />;
}
