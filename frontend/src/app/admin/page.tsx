"use client";

import { useEffect, useState } from "react";
import {
  fetchDashboardStats,
  fetchMessages,
  DashboardStats,
  ContactMessage,
} from "@/data/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [statsData, messagesData] = await Promise.all([
          fetchDashboardStats(),
          fetchMessages(),
        ]);

        setStats(statsData);
        setMessages(messagesData);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Projects",
      value: stats?.projects ?? 0,
      icon: "💼",
    },
    {
      title: "Skills",
      value: stats?.skills ?? 0,
      icon: "⚡",
    },
    {
      title: "Certificates",
      value: stats?.certificates ?? 0,
      icon: "🏆",
    },
    {
      title: "Testimonials",
      value: stats?.testimonials ?? 0,
      icon: "💬",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-gray-400">
          Ringkasan data portfolio dari database.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-800 bg-[#0d1320] p-6 transition hover:border-indigo-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">
                {card.icon}
              </span>

              <span className="text-xs text-gray-500">
                Total
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">
                {card.title}
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {loading ? "..." : card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pesan */}
      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#0d1320]">
        <div className="border-b border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white">
            Pesan Kontak Terbaru
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Lima pesan terbaru dari pengunjung website.
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">
            Memuat pesan...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-6 text-gray-500">
            Belum ada pesan masuk.
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {message.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {message.email}
                    </p>
                  </div>

                  <span className="text-xs text-gray-600">
                    {new Date(
                      message.created_at
                    ).toLocaleString("id-ID")}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}