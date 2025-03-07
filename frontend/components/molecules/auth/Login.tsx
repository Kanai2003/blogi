"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { login } from "@/store/actions/authActions";

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response?.access_token);
      setFormData({ username: "", password: "" });
      dispatch(login(response));
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const formInputSectionUI = () => (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="username"
            placeholder="Enter your email"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button
        className="w-full mt-4 cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>{formInputSectionUI()}</CardContent>
      <CardFooter>
        <p>
          {" Don't have an account? "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
