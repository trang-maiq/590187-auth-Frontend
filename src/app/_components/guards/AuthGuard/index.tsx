import { FC, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import useRuntimeEnv from "@/api/env/useRuntimeEnv";

const AuthGuard: FC<PropsWithChildren> = async ({ children }) => {
  const { mutate: runtimeEnv } = useRuntimeEnv();
  const [env, setEnv] = useState({
    authSecret: process.env.AUTH_SECRET,
    publicDomain: process.env.NEXT_PUBLIC_DOMAIN,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    authEnabled: false,
    billingType: process.env.NEXT_PUBLIC_BILLING,
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_KEY
  })

  useEffect(() => {
    const fetchEnv = async () => {
      let { data } = await runtimeEnv();
      setEnv(data);
    };
    fetchEnv();
  }, [runtimeEnv]);

  if (env.authEnabled) {
    const session = await auth();
    if (session?.user) {
      return <>{children}</>;
    } else {
      redirect("/login");
    }
  } else {
    return <>{children}</>;
  }
};

export default AuthGuard;
