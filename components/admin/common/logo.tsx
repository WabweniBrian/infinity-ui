import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-2 font-semibold text-brand md:text-base"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={50}
        height={50}
        className="object-contain"
      />
      <span className="hidden text-xl sm:block">Infinity UI</span>
    </Link>
  );
};

export default Logo;
