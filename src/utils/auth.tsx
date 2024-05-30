"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [auth, setAuth] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      } else {
        setAuth(true);
      }
    }, [router]);

    if (auth === null) {
      return null;
    }

    return <Component {...props} />;
  };
}
