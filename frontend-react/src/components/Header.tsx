"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-[65px] items-center justify-between px-4 md:h-[97px]">
      <div className="flex items-center justify-center gap-6">
        <Link href="/">Top</Link>
        <Link href="/samples">Samples</Link>
        <Link href="/videos">VideoList</Link>
        <Link href="/videos/upload">Upload</Link>
      </div>
      <div>?</div>
    </header>
  );
}
