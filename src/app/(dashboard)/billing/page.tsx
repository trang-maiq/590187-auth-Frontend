"use client";

import { FC, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import BillingView from "@/app/_components/ai/billing/billing-view";
import useRuntimeEnv from "@/api/env/useRuntimeEnv";

const Page: FC = () => {
  const { mutate: runtimeEnv } = useRuntimeEnv();
  const [env, setEnv] = useState({
    billingType: ""
  });

  useEffect(() => {
    const fetchEnv = async () => {
      let {data} = await runtimeEnv();
      setEnv(data)
    }
    fetchEnv()
  }, [runtimeEnv]);


  if (env.billingType) {
    return <BillingView />;
  } else {
    return notFound();
  }
};

export default Page;
