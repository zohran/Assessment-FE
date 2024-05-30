"use client";
import { Button } from "@/components/Button";
import isAuth from "@/utils/auth";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex w-full justify-center">
      <Link href="/auth/login">
        <Button
          title="Lets Get Started"
          className="p-2 border border-white-1 rounded-lg  pointer"
        >
          Lets Get Started
        </Button>
      </Link>
    </div>
  );
};

export default isAuth(Home);
