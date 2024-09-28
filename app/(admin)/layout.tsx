import Footer from "@/components/admin/common/footer";
import AdminNavbar from "@/components/admin/common/navbar";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { ChevronRight } from "lucide-react";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-main dark:bg-background">
      <section className="curved flex-center-center">
        <div className="mt-6 flex-col gap-3 pb-4 flex-align-center">
          <h1 className="text-xl font-bold uppercase text-white sm:text-3xl">
            Infinity UI
          </h1>
        </div>
      </section>
      <AdminNavbar />
      <main className="mx-auto max-w-7xl px-2">
        <div className="mb-2 flex justify-end">
          <Breadcrumbs separator={<ChevronRight className="h-4 w-4" />} />
        </div>
        <div className="min-h-[80vh]">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;
