import CardStats from "@/components/admin/home/card-stats";
import { getStats } from "@/lib/actions/dashboard";
import { getCurrentUser } from "@/lib/auth";
import { EmptyWallet, Layer, Money2, People } from "iconsax-react";
import { redirect } from "next/navigation";

const Admin = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { componentsCount, userCount, purchasesCount, totalAmount } =
    await getStats();

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <CardStats
          icon={<Layer variant="Bulk" size={50} className="text-red-500" />}
          title="total components"
          value={componentsCount}
          url={`/admin/components`}
        />
        <CardStats
          icon={<People variant="Bulk" size={50} className="text-teal-700" />}
          title="total users"
          value={userCount}
          url={`/admin/users`}
        />
        <CardStats
          icon={<Money2 variant="Bulk" size={50} className="text-purple-700" />}
          title="total purchases"
          value={purchasesCount}
          url={`/admin/purchases`}
        />
        <CardStats
          icon={
            <EmptyWallet variant="Bulk" size={50} className="text-yellow-700" />
          }
          title="revenue"
          value={totalAmount}
          url={"#"}
        />
      </div>
    </>
  );
};

export default Admin;
