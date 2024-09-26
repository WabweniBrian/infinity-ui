import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Dashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <Link href="/dashboard/profile" className="text-blue-500 hover:underline">
        View Profile
      </Link>
    </div>
  );
};

export default Dashboard;
