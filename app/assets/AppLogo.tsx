import Link from "next/link";
import { userInfo } from "os";

interface AppLogoProps {
  isLogin?: boolean;
  userId?: string;
}

export function AppLogo(props: AppLogoProps) {
  return (
    <Link
      href={
        props.isLogin
          ? "/auth/login"
          : props.userId
            ? `/admin/users/${props.userId}/jobs`
            : "/"
      }
    >
      <p className="text-3xl font-bold font-sans dark:text-white">NIBAY</p>
    </Link>
  );
}
