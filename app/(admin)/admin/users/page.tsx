import { UsersStats } from "@/components/admin/users/user-stats";
import { UsersFilters } from "@/components/admin/users/users-filters";
import { UsersHeader } from "@/components/admin/users/users-header";
import { UsersTable } from "@/components/admin/users/users-table";
import { getUsers } from "@/lib/actions/admin/users";

export const metadata = {
  title: "Users",
};

type SearchParams = {
  searchParams: {
    search?: string;
    role?: string;
    verification?: string;
    purchase?: string;
    authMethod?: string;
    joinDateFrom?: string;
    joinDateTo?: string;
    page?: string;
  };
};

const UsersPage = async ({ searchParams }: SearchParams) => {
  const limit = 10;
  const skip = (Number(searchParams.page || "1") - 1) * limit || 0;

  const { users, usersCount, totalUsers } = await getUsers({
    search: searchParams.search,
    role: searchParams.role,
    verification: searchParams.verification,
    purchase: searchParams.purchase,
    authMethod: searchParams.authMethod,
    joinDateFrom: searchParams.joinDateFrom,
    joinDateTo: searchParams.joinDateTo,
    limit,
    skip,
  });

  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersStats />
      <UsersFilters />
      <UsersTable
        users={users}
        usersCount={usersCount}
        totalUsers={totalUsers}
        totalPages={Math.ceil(usersCount / limit)}
        offset={skip}
      />
    </div>
  );
};

export default UsersPage;
