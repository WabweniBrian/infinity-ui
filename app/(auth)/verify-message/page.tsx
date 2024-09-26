import { redirect } from "next/navigation";
import React from "react";

const VerifyMessage = ({
  searchParams,
}: {
  searchParams: { email: string };
}) => {
  if (!searchParams.email) redirect("/sign-up");

  return (
    <div className="py-5 flex-center-center">
      <h1>
        An email verification link has been sent to {searchParams.email}, click
        that link to proceed.
      </h1>
    </div>
  );
};

export default VerifyMessage;
