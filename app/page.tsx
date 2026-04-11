"use client";
import dynamic from "next/dynamic";

const ShopHome = dynamic(() => import("./boutique/_components/ShopHome"), { ssr: false });

export default function Home() {
  return <ShopHome />;
}
