"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/actions/authActions";
import Login from "@/components/molecules/auth/Login";
import { useSelector, useDispatch } from "react-redux";
import Register from "@/components/molecules/auth/Register";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface RootState {
  auth: {
    isLoggedIn: boolean;
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

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Blogi</div>
        <div>
          {isAuthenticated ? (
            <>
              <Button
                variant="default"
                className="mr-2 text-white"
                onClick={() => router.push("/dashboard")}
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="text-black bg-red-500"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mr-2 text-black">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto h-auto max-w-none max-h-none p-8">
                  <Login />
                </DialogContent>
              </Dialog>
              <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className=" text-black">
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto h-auto max-w-none max-h-none p-8">
                  <Register />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
