import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#0b0f19] px-6 pl-16 md:pl-6">
      <div>
        <h1 className="text-lg font-semibold text-white">
          Dashboard
        </h1>

        <p className="text-xs text-gray-500">
          Portfolio Management System
        </p>
      </div>

      <Link
        href="/"
        className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
      >
        Lihat Website
      </Link>
    </header>
  );
}