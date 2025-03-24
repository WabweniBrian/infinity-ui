import { getUserStats } from "@/lib/actions/admin/user-stats";
import { UserCheck, UserPlus, Users, UserX } from "lucide-react";

const IconMap = {
  users: Users,
  "user-check": UserCheck,
  "user-x": UserX,
  "user-plus": UserPlus,
};

export const UsersStats = async () => {
  const stats = await getUserStats();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = IconMap[stat.iconType as keyof typeof IconMap];
        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-950"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>

                <div className="mt-2 flex items-center">
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    from last month
                  </span>
                </div>
              </div>

              <div className={`rounded-lg p-2 ${stat.color} text-white`}>
                <IconComponent size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
