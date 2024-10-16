"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl, FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { login } from "@/lib/supabase/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6, {
    message: "password must be at least 6 characters"
  }),
});


export default function Page() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();


  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })



  // Submit Handler
  async function onSubmit(values) {

    startTransition(async () => {
      try {

        const result = await login(values);

        if (result.success === false) {
          toast.error(result.message, {
            duration: 8000
          })
        } else {
          router.push('/');

        }

      } catch (error) {
        // toast.error("An error occured while attempting login");
        console.log(error);

      }
    });
  }

  return (
    // Login Page
    <section className="h-full">
      <div className="inner_cont | @container flex flex-col items-center gap-8 justify-between h-full">

        {/* Logo */}
        <Logo />

        {/* Login Form */}
        <Card className="p-9 @[425px]:p-16 w-[min(100%,500px)]">
          <CardTitle className="mb-6 text-center">Login</CardTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. somename@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Loader2 size={20} className="animate-spin" />}

                {isPending ? "Logging In..." : "Log In"}
              </Button>
            </form>
          </Form>
        </Card>


        {/* Footer */}
        <footer>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Copyright © 2024 CSO. All Rights Reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

