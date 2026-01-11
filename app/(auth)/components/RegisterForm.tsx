"use client";

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { CircleUserRound, Eye, EyeOff, ShieldUser } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from '@/lib/utils';
import { RegisterSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { toast } from "sonner";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormInputs = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const { authRegister, showNoti } = useBoundStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const form = useForm<FormInputs>({
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
      toast.success("Successfully register.");
    } catch (err) {
      console.log("Failed to register from register form", err);
      const errMsg = err instanceof Error ? err.message : err as string;
      const fields: (keyof FormInputs)[] = ["name", "username", "password", "confirmPassword"];
      fields.forEach(field => {
        form.setError(field, {
          type: "server",
          message: errMsg,
        });
      });
      toast.error("Failed to register.");
    } finally {
      form.reset(
        { name: "", username: "", password: "", confirmPassword: "" },
        { keepErrors: true }
      );
    }
  }

  return (
    <form
      id="register-form"
      className="w-105"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Name
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Confirm Password
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
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

      {/* <AuthFieldBox */}
      {/*   error={errors.name?.message} */}
      {/* > */}
      {/*   <div className="auth-icon"> */}
      {/*     <CircleUserRound size={19} /> */}
      {/*   </div> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     {...register("name")} */}
      {/*     placeholder="Enter name" */}
      {/*     className={cn( */}
      {/*       "auth-input", */}
      {/*       errors.name && "error" */}
      {/*     )} */}
      {/*   /> */}
      {/* </AuthFieldBox> */}
      {/**/}
      {/* <AuthFieldBox */}
      {/*   error={errors.username?.message} */}
      {/* > */}
      {/*   <div className="auth-icon"> */}
      {/*     <ShieldUser size={19} /> */}
      {/*   </div> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     {...register("username")} */}
      {/*     placeholder="Enter username" */}
      {/*     className={cn( */}
      {/*       "auth-input", */}
      {/*       errors.username && "error" */}
      {/*     )} */}
      {/*   /> */}
      {/* </AuthFieldBox> */}
      {/**/}
      {/* <AuthFieldBox */}
      {/*   error={errors.password?.message} */}
      {/* > */}
      {/*   <button */}
      {/*     type="button" */}
      {/*     onClick={() => setShowPassword(!showPassword)} */}
      {/*     className="auth-icon" */}
      {/*   > */}
      {/*     {showPassword ? <EyeOff size={19} /> : <Eye size={19} />} */}
      {/*   </button> */}
      {/*   <input */}
      {/*     type={showPassword ? "text" : "password"} */}
      {/*     {...register("password")} */}
      {/*     placeholder="Enter password" */}
      {/*     className={cn( */}
      {/*       "auth-input", */}
      {/*       errors.password && "error" */}
      {/*     )} */}
      {/*   /> */}
      {/* </AuthFieldBox> */}
      {/**/}
      {/* <AuthFieldBox */}
      {/*   error={errors.confirmPassword?.message} */}
      {/* > */}
      {/*   <button */}
      {/*     type="button" */}
      {/*     onClick={() => setShowPassword(!showPassword)} */}
      {/*     className="auth-icon" */}
      {/*   > */}
      {/*     {showPassword ? <EyeOff size={19} /> : <Eye size={19} />} */}
      {/*   </button> */}
      {/**/}
      {/*   <input */}
      {/*     type={showPassword ? "text" : "password"} */}
      {/*     {...register("confirmPassword")} */}
      {/*     placeholder="Confirm password" */}
      {/*     className={cn( */}
      {/*       "auth-input hover-effect", */}
      {/*       errors.confirmPassword && "error" */}
      {/*     )} */}
      {/*   /> */}
      {/* </AuthFieldBox> */}
      <div className="space-y-5 mt-8">
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
        <Button
          type="submit"
          form="register-form"
          disabled={!acceptedTerms}
          className={cn(
            "w-full h-10 rounded-lg text-white font-medium text-[16px]",
            acceptedTerms
              ? "bg-social-indigo hover:bg-social-indigo/90"
              : "bg-foreground/60 cursor-not-allowed"
          )}
        >
          Register
        </Button>

        <p className="text-foreground/80 font-light text-sm">
          Already have an account?{" "}
          <Link
            className="font-medium text-blue-500 hover:underline"
            href={"/login"}
          >
            Login here!
          </Link>
        </p>

      </div>
    </form>
  );
};

export default RegisterForm;
