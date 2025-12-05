"use client";

import AuthFieldBox from "@/components/AuthFieldBox";
import useAuth from "@/hooks/useAuth";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { LoginSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldUser } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

type FormInputs = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { login, showNoti } = useBoundStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const isAuth = useAuth();

  useEffect(() => {
    console.log("effect run and isAuth is ", isAuth);
    if (isAuth) {
      router.replace("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("Login data:", data);
    try {
      const result = await login(data);
      console.log("Successfully login from Login form", result);
      router.push("/");
      showNoti("Successfully login.");
    } catch (err) {
      console.log("Failed to login from Login form", err);
      showNoti("Failed to login.");
    } finally {
      reset(
        { username: "", password: "" },
        { keepErrors: true }
      );
    }
  }

  return (
    <form
      className="w-105 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* username */}
      <AuthFieldBox
        error={errors.username?.message}
      >
        <div className="auth-icon">
          <ShieldUser size={19} />
        </div>

        <input
          type="text"
          {...register("username")}
          placeholder="Enter username"
          className={cn(
            "auth-input",
            errors.username && "error"
          )}
        />
      </AuthFieldBox>

      {/* password */}
      <AuthFieldBox
        error={errors.password?.message}
      >
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="auth-icon"
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>

        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Enter password"
          className={cn(
            "auth-input",
            errors.password && "error"
          )}
        />
      </AuthFieldBox>

      {/* remember me + forgot password */}
      <div className="flex items-center gap-3 mt-8">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 border border-border rounded bg-transparent focus:ring-1 focus:ring-secondary"
        />
        <p className="font-light text-foreground/80 text-sm">
          Remember me{" "}
          <a
            className="font-medium text-blue-500 hover:underline"
            href="#"
          >
            Forgot password?
          </a>
        </p>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="w-full h-11 rounded-full text-white bg-social-indigo hover:opacity-90 transition-opacity font-medium"
      >
        Login
      </button>

      <p className="text-foreground/70 font-light text-sm">
        Don’t have an account?{" "}
        <Link
          className="font-medium text-blue-500 hover:underline"
          href={"/register"}
        >
          Sign up here!
        </Link>
      </p>
    </form >
  );
};

export default LoginForm;
