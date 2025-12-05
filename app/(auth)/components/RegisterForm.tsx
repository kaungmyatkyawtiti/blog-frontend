"use client";

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import AuthFieldBox from "@/components/AuthFieldBox";
import { CircleUserRound, Eye, EyeOff, ShieldUser } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from '@/lib/utils';
import { RegisterSchema } from '@/lib/schemas';

type FormInputs = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("submit")
  }

  return (
    <form
      className="w-105 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* name */}
      <AuthFieldBox
        error={errors.name?.message}
      >
        <div className="auth-icon">
          <CircleUserRound size={19} />
        </div>
        <input
          type="text"
          {...register("name")}
          placeholder="Enter name"
          className={cn(
            "auth-input",
            errors.name && "error"
          )}
        />
      </AuthFieldBox>

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

      {/* confirm password */}
      <AuthFieldBox
        error={errors.confirmPassword?.message}
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
          {...register("confirmPassword")}
          placeholder="Confirm password"
          className={cn(
            "auth-input",
            errors.confirmPassword && "error"
          )}
        />
      </AuthFieldBox>

      <div className="flex items-center gap-3 mt-8">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 border border-border rounded bg-transparent focus:ring-1 focus:ring-secondary"
        />
        <p className="font-light text-foreground/80 text-sm">
          I accept the{" "}
          <a
            className="font-medium text-blue-500 hover:underline"
            href="#"
          >
            Terms and Conditions
          </a>
        </p>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="w-full h-11 rounded-full text-white bg-social-indigo hover:opacity-90 transition-opacity font-medium"
      >
        Register
      </button>

      <p className="text-foreground/80 font-light text-sm">
        Already have an account?{" "}
        <Link
          className="font-medium text-blue-500 hover:underline"
          href={"/login"}
        >
          Login here!
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
