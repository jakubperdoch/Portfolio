import logo from "@/../public/favicon.svg";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image src={logo} className="h-32 dark:invert" alt="devehope-logo" />
    </div>
  );
}
