import { getCurrentUser } from "@/lib/auth";
import Links from "./links";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import ProfileDropdown from "./profile-dropdown";

const AdminNavbar = async () => {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-2 z-30 -mt-4 px-2 py-2">
      <nav className="mx-auto max-w-7xl rounded-xl border bg-white px-3 py-2 shadow-sm backdrop-blur-sm flex-center-between dark:bg-accent">
        {/* Logo */}
        <Logo />

        {/* Links */}
        <div className="hidden md:block">
          <Links />
        </div>

        {/* Right Menu */}
        <div className="gap-x-2 flex-align-center">
          {/* Profile Dropdown */}
          <ProfileDropdown
            user={{
              name: user?.name!,
              email: user?.email!,
              image: user?.image!,
            }}
          />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
