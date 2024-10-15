"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useCurrent } from "@/feats/auth/api/use-current";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { trio } from "ldrs";
import { useLogOut } from "@/feats/auth/api/use-logout";

trio.register();

export default function Home() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  const { mutate } = useLogOut();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  // if (!isLoading) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <l-trio size="40" speed="1.3" color="black" />
  //     </div>
  //   );
  // }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Only visible to logged in users
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
