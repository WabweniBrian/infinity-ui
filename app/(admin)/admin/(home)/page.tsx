import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "@/components/admin/home/dashboard-stats";
import { RecentSales } from "@/components/admin/home/recent-sales";
import { PopularComponents } from "@/components/admin/home/popular-components";
import { SalesChart } from "@/components/admin/home/sales-chart";
import { UserGrowthChart } from "@/components/admin/home/user-growth-chart";
import {
  getPopularComponents,
  getRecentSales,
  getSalesDataByYear,
  getUserGrowthByYear,
} from "@/lib/actions/admin/dashboard-stats";

export const metadata = {
  title: "Dashboard",
};

const AdminDashboard = async ({
  searchParams,
}: {
  searchParams: { year?: string };
}) => {
  const currentYear = new Date().getFullYear();
  const year = searchParams.year
    ? Number.parseInt(searchParams.year)
    : currentYear;

  const salesData = await getSalesDataByYear(year);
  const userGrowthData = await getUserGrowthByYear(year);
  const recentSalesData = await getRecentSales(5);
  const popularComponentsData = await getPopularComponents(5);

  const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Here&apos;s an overview of your Infinity UI platform.
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Monthly revenue and transactions for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart
              data={salesData}
              year={year}
              availableYears={availableYears}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <UserGrowthChart
              data={userGrowthData}
              year={year}
              availableYears={availableYears}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales sales={recentSalesData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Components</CardTitle>
            <CardDescription>Top selling components this month</CardDescription>
          </CardHeader>
          <CardContent>
            <PopularComponents components={popularComponentsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
