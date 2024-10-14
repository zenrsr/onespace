import { DotSeparartor } from "@/components/dot-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};
const formSchema = z.object({
  name: z.string().trim().min(3).max(25),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Min 8 characters for a password is neccessary")
    .max(25, "no more than 25"),
});

export const SignUpCard = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onHandleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl flex flex-col items-center font-sans space-y-2">
          Get Started with <br />{" "}
          <span className="flex gap-2 justify-evenly my-4">
            <Image src={"/logo.svg"} height={56} width={56} alt="auth-logo" />{" "}
            <p className="font-mono text-3xl">OneSpace!</p>
          </span>
        </CardTitle>
        <CardDescription>Where productivity is a priority.</CardDescription>
      </CardHeader>
      <div className="px-7">
        <DotSeparartor />
      </div>
      <CardContent className="p-7 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onHandleSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Get Started
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
          Sign Up with <FcGoogle className="mx-2" />
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full rounded-xl"
          disabled={false}
        >
          Sign Up with <FaGithub className="mx-2" />
        </Button>
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardDescription>
            By signing up, you agree to our{" "}
            <Link href={"/terms-of-service"}>
              <span className="text-blue-700">Terms of Service</span>
            </Link>{" "}
            and{" "}
            <Link href={"/privacy-policy"}>
              <span className="text-blue-700">Privacy Policy</span>.
            </Link>
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
};
