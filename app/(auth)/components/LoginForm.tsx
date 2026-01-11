"use client";

import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { LoginSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FormInputs = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { login } = useBoundStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormInputs>({
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
      toast.success("Successfully login");
      // showNoti("Successfully login.");
    } catch (err) {
      console.log("Failed to login from Login form", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : err as string;
      const fields: (keyof FormInputs)[] = ["username", "password"];
      fields.forEach(field => {
        form.setError(field, {
          type: "server",
          message: errMsg,
        });
      });
      // showNoti("Failed to login.");
      toast.error("Failed to login.");
    } finally {
      form.reset(
        { username: "", password: "" },
        { keepErrors: true }
      );
    }
  }

  return (
    <form
      id="login-form"
      className="w-105"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Username
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your username"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute inset-y-0 right-5 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={22} className="text-foreground/60" />
                  ) : (
                    <Eye size={22} className="text-foreground/80" />
                  )}
                </button>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="space-y-5 mt-8">
        <Button
          type="submit"
          form="login-form"
          className="w-full h-10 rounded-lg text-white bg-social-indigo hover:bg-social-indigo/90 font-medium text-[16px]"
        >
          Login
        </Button>

        <p className="text-foreground/70 font-light text-sm">
          Don’t have an account?{" "}
          <Link
            className="font-medium text-blue-500 hover:underline"
            href={"/register"}
          >
            Sign up here!
          </Link>
        </p>
      </div>
    </form >
  );
};

export default LoginForm;
