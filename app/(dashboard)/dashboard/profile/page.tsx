import LogoutButton from "@/components/auth/logout-button";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">User Profile</h1>
      <div className="rounded-xl border bg-background p-6 text-center shadow">
        {user.image && (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full"
          />
        )}
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
