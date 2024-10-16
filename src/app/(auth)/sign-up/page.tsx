import React from "react";
import { SignUpCard } from "../../../feats/auth/components/sign-up-card";
import { getCurrent } from "@/feats/auth/actions";
import { redirect } from "next/navigation";

type Props = {};

const SignUpPage = async (props: Props) => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
