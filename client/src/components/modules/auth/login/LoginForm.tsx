"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import { loginUser, reCaptchaTokenVerification } from "@/service/AuthService";
import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/assets/svgs/Logo";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();


  const {
    formState: { isSubmitting },
  } = form;

  // const handleReCaptcha = async (value: string | null) => {
  //   try {
  //     const res = await reCaptchaTokenVerification(value!);
  //     if (res?.success) {
  //       setReCaptchaStatus(true);
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form data:", data); // Log the form data
    try {
      console.log("Submitting form with data:", data); // Check if this is logged in console
      const res = await loginUser(data);
      console.log("Login response:", res); // Log the response
      if (res?.success) {
        toast.success(res?.message || "Login successful");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/profile");
        }
      } else {
        console.error("Login failed:", res);
        toast.error(res?.message || "Login failed for unknown reason");
      }
    } catch (err: any) {
      console.error("Login exception:", err); // Catch any errors here
      toast.error("An error occurred during login. Please try again.");
    }
  };
  


  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Login Please</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
              onChange={handleReCaptcha}
              className="mx-auto"
            />
          </div> */}

          <Button
            // disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="mt-5 w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}