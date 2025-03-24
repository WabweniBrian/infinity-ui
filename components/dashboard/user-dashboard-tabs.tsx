import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentStatus } from "@prisma/client";
import { Bell, CreditCard, ShoppingBag, User } from "lucide-react";
import { UserBilling } from "./user-billing";
import { UserNotifications } from "./user-notifications";
import { UserProfile } from "./user-profile";
import { UserPurchases } from "./user-purchases";
import { SessionUser } from "@/types";

type UserPurchase = {
  id: string;
  isComponent: boolean;
  status: PaymentStatus;
  isBundle: boolean;
  isPack: boolean;
  amount: number;
  orderNumber: string | null;
  address: string | null;
  phone: string | null;
  zipCode: string | null;
  date: Date;
  component: {
    name: string;
  } | null;
};

type UserNotification = {
  id: string;
  title: string;
  createdAt: Date;
  isRead: boolean | null;
  type: string;
  message: string;
};

interface UserDashboardTabsProps {
  userPurchases: UserPurchase[];
  userNotifications: UserNotification[];
  user: SessionUser;
  unreadNotificationsCount: number;
}

export const UserDashboardTabs = ({
  userPurchases,
  userNotifications,
  user,
  unreadNotificationsCount,
}: UserDashboardTabsProps) => {
  const tabs = [
    { id: "purchases", label: "My Purchases", icon: ShoppingBag },
    { id: "notifications", label: "Notifications", icon: Bell },
    // { id: "profile", label: "Profile", icon: User },
    // { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <Tabs defaultValue="purchases" className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <TabsList className="hide-scrollbar flex h-auto w-full justify-start overflow-x-auto rounded-none bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center whitespace-nowrap rounded-none px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-brand data-[state=active]:text-brand data-[state=active]:shadow-none dark:text-gray-400 dark:hover:text-gray-300"
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
              {tab.id === "notifications" && unreadNotificationsCount !== 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="py-6">
        <TabsContent
          value="purchases"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <UserPurchases userPurchases={userPurchases} user={user} />
        </TabsContent>

        <TabsContent
          value="notifications"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <UserNotifications
            userNotifications={userNotifications}
            unreadNotificationsCount={unreadNotificationsCount}
            user={user}
          />
        </TabsContent>

        {/* <TabsContent
          value="profile"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <UserProfile />
        </TabsContent>

        <TabsContent
          value="billing"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <UserBilling />
        </TabsContent> */}
      </div>
    </Tabs>
  );
};
