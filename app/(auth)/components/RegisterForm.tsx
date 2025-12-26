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
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/lib/hooks/useBoundStore';

type FormInputs = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const { authRegister, showNoti } = useBoundStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
    console.log("Register data:", data);
    try {
      const result = await authRegister(data);
      console.log("Successfully register from register form", result);
      router.push("/login");
      showNoti("Successfully register.");
    } catch (err) {
      console.log("Failed to register from register form", err);
      const errMsg = err instanceof Error ? err.message : err as string;
      const fields: (keyof FormInputs)[] = ["name", "username", "password", "confirmPassword"];
      fields.forEach(field => {
        setError(field, {
          type: "server",
          message: errMsg,
        });
      });
      showNoti("Failed to register.");
    } finally {
      reset(
        { name: "", username: "", password: "", confirmPassword: "" },
        { keepErrors: true }
      );
    }
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
            "auth-input hover-effect",
            errors.confirmPassword && "error"
          )}
        />
      </AuthFieldBox>

      <div className="flex items-center gap-3 mt-8">
        <input
          id="terms"
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-5 h-5 accent-social-indigo"
        />
        <p className="font-light text-foreground/80 text-sm">
          I accept the{" "}
          <Link
            className="font-medium text-blue-500 hover:underline"
            href="#"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>

      {/* submit button */}
      <button
        type="submit"
        disabled={!acceptedTerms}
        className={cn(
          "w-full h-11 rounded-full text-white font-medium transition-opacity",
          acceptedTerms
            ? "bg-social-indigo hover:opacity-90"
            : "bg-foreground/60 cursor-not-allowed"
        )}
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
