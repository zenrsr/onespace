import { DotSeparartor } from "@/components/dot-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "../schema";
import { useLogin } from "../api/use-login";

type Props = {};

export const SignInCard = (props: Props) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin();

  const onHandleSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("onHandleSubmit", values);
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DotSeparartor />
      </div>
      <CardContent className="p-7 ">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onHandleSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size={"lg"} className="w-full rounded-xl">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DotSeparartor />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full rounded-xl"
          disabled={false}
        >
          Login with <FcGoogle className="mx-2" />
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full rounded-xl"
          disabled={false}
        >
          Login with <FaGithub className="mx-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
