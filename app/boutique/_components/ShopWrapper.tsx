"use client";
import dynamic from "next/dynamic";

interface Platform { label: string; slug: string; emoji: string; color: string; count: number }

const ShopHome = dynamic(() => import("./ShopHome"), { ssr: false });

export default function ShopWrapper({ initialPlatforms = [] }: { initialPlatforms?: Platform[] }) {
  return <ShopHome initialPlatforms={initialPlatforms} />;
}
