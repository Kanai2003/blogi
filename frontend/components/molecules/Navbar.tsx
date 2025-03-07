"use client";
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/actions/authActions";
import Login from "@/components/molecules/auth/Login";
import { useSelector, useDispatch } from "react-redux";
import Register from "@/components/molecules/auth/Register";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface RootState {
  auth: {
    isLoggedIn: boolean;
    user: {
      access_token: string;
      token_type: string;
      user: {
        id: number;
        username: string;
        name: string;
      }
    }
  };
}

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const afterAuthenticationUI = (): ReactNode => (
    <>
      <Button
        variant="outline"
        className="mr-2 text-black cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Profile
      </Button>
      <Button
        onClick={handleLogout}
        variant="secondary"
        className=" cursor-pointer"
      >
        Logout
      </Button>
    </>
  )

  const beforeAuthenticationUI = (): ReactNode => (
    <>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mr-2 text-black cursor-pointer">
            Login
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto h-auto max-w-none max-h-none p-8">
          <Login />
        </DialogContent>
      </Dialog>
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className=" text-black cursor-pointer">
            Register
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto h-auto max-w-none max-h-none p-8">
          <Register />
        </DialogContent>
      </Dialog>
    </>
  )

  return (
    <nav className="bg-black-600  p-4 my-4 mx-12 rounded-xl shadow-lg border-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>Blogi</div>
        <div>
          {isAuthenticated ? (
            afterAuthenticationUI()
          ) : (
            beforeAuthenticationUI()
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
