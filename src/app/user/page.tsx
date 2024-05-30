"use client";
import { useEffect, useState } from "react";
import { ApiCall } from "../../api";
import isAuth from "@/utils/auth";

const User = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await ApiCall("get", "user/all");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2  rounded-md">
        {users.map((user: any, index: number) => {
          return (
            <div
              key={user.id}
              className="flex flex-row justify-between bg-blue-500 p-3 rounded-md w-full h-fit gap-3"
            >
              <p className="text-white border-white ">{index + 1}.</p>
              <p className="text-white border-white ">{user.username}</p>
              <p className="text-white">{user.email}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default isAuth(User);
