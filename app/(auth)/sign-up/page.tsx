import SignUpForm from "@/components/auth/sign-up-form";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return notFound();
  return <SignUpForm />;
};

export default SignUp;
