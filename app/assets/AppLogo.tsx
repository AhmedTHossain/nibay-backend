import Link from "next/link";

interface AppLogoProps {
  isLogin?: boolean;
}

export function AppLogo(props: AppLogoProps) {
  return (
    <Link href={props.isLogin ? "/auth/login" : "/"}>
      <p className="text-3xl font-bold font-sans dark:text-white">NIBAY</p>
    </Link>
  );
}
