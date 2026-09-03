"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: "💼",
  },
  {
    name: "Skills",
    href: "/admin/skills",
    icon: "⚡",
  },
  {
    name: "Certificates",
    href: "/admin/certificates",
    icon: "🏆",
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: "💬",
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: "✉️",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tombol buka sidebar di mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-[60] rounded-lg border border-gray-700 bg-[#0b0f19] px-3 py-2 text-xl text-white shadow-lg md:hidden"
        aria-label="Buka menu admin"
      >
        ☰
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Tutup menu admin"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-800 bg-[#0b0f19] transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Portfolio CMS
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Admin Panel
            </p>
          </div>

          {/* Tombol tutup mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xl text-gray-400 hover:text-white md:hidden"
            aria-label="Tutup menu admin"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}