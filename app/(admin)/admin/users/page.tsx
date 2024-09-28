import AddUser from "@/components/admin/users/add-user-modal";
import UserActions from "@/components/admin/users/user-actions";
import Avatar from "@/components/common/avatar";
import NoResults from "@/components/common/no-results";
import SearchInput from "@/components/common/search-input";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/lib/actions/users";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Users = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const users = await getUsers(searchParams.search);

  return (
    <div>
      <div className="rounded-xl border bg-white/60 p-4 flex-center-between dark:bg-accent/20">
        <div className="flex-1">
          <SearchInput className="w-full" />
        </div>
        <AddUser />
      </div>
      <div>
        {users.length === 0 && (
          <NoResults title="No users found" className="min-h-[60vh]" />
        )}
        {users.length !== 0 && (
          <>
            {users.map((user) => (
              <div
                key={user.id}
                className="my-3 rounded-xl border bg-white/80 p-3 dark:bg-accent/20"
              >
                <div className="flex gap-2">
                  <div>
                    {user.image ? (
                      <Avatar size="small" src={user.image} />
                    ) : (
                      <Avatar size="small" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex-center-between">
                      <h1 className="flex-1 truncate text-lg">{user.name}</h1>
                      <UserActions id={user.id} />
                    </div>
                    <p>{user.email}</p>
                    <div className="gap-2 flex-align-center">
                      <Badge className="font-normal" variant={"outline"}>
                        {user.role}
                      </Badge>
                      {!user.password && <FcGoogle className="text-xl" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
