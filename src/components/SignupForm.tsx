"use client";
import Link from "next/link";
import { Button } from "./Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FormEvent, useState } from "react";
import LoadingButton from "./LoadingButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";
import { Alert } from "reactstrap";
import { ApiCall } from "@/api";
import clsx from "clsx";

export default function SignUpForm() {
  const initialValues: any = {
    username: "",
    email: "",
    password: "",
  };

  const alertValue: any = {
    color: "",
    message: "",
  };

  const [formValues, setFormValues] = useState<any>(initialValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<any | null>(null);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name: key, value } = event.target;

    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await ApiCall("post", "auth/register-user", formValues);
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("token", res?.data?.access_token);
        setAlert({
          color: "text-green-300",
          message: "User Created Successsully. Login Now!",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      setAlert({
        color: "text-red-300",
        message: "Try Again",
      });
    } finally {
      setIsLoading(false);
      setFormValues(initialValues);
    }
  };
  return (
    <>
      {alert && (
        <div>
          <p className={clsx("mb-3", `${alert.color}`)}>{alert.message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={` mb-3 text-2xl text-black`}>
            Please sign up to continue
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-blue-500 outline-2 placeholder:text-gray-500"
                  id="name"
                  type="test"
                  name="username"
                  placeholder="Enter your name"
                  required
                  minLength={3}
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm  text-blue-500 outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm  text-blue-500 outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={formValues.password}
                  onChange={handleChange}
                  minLength={6}
                />
              </div>
            </div>
          </div>
          {isLoading ? <LoadingButton /> : <SignButton />}
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-sm text-gray-500">
              Already have account.{" "}
              <Link href="/auth/login">
                <span className="text-blue-500">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

function SignButton() {
  return (
    <Button className="mt-4 w-full ">
      Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
