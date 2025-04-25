import { OrdersFilters } from "@/components/admin/purchases/order-filters";
import { OrdersStats } from "@/components/admin/purchases/order-stats";
import { OrdersHeader } from "@/components/admin/purchases/orders-header";
import { OrdersTable } from "@/components/admin/purchases/orders-table";
import {
  getFormComponents,
  getFormUsers,
  getOrders,
} from "@/lib/actions/admin/orders";

export const metadata = {
  title: "Puchases",
};

type SearchParams = {
  searchParams: {
    search?: string;
    status?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: string;
  };
};

const OrdersPage = async ({ searchParams }: SearchParams) => {
  const limit = 10;
  const skip = (Number(searchParams.page || "1") - 1) * limit || 0;

  const { orders, ordersCount, totalOrders } = await getOrders({
    search: searchParams.search,
    status: searchParams.status,
    type: searchParams.type,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    dateFrom: searchParams.dateFrom,
    dateTo: searchParams.dateTo,
    limit,
    skip,
  });

  const users = await getFormUsers();
  const components = await getFormComponents();

  return (
    <div className="space-y-6">
      <OrdersHeader users={users} components={components} />
      <OrdersStats />
      <OrdersFilters />
      <OrdersTable
        orders={orders}
        ordersCount={ordersCount}
        totalOrders={totalOrders}
        totalPages={Math.ceil(ordersCount / limit)}
        offset={skip}
      />
    </div>
  );
};

export default OrdersPage;
