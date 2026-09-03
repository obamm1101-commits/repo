import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#070a12] text-white">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminNavbar />

        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}