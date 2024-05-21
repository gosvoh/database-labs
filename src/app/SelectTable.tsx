"use client";

import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SelectTable({ tables }: { tables: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.get("table")) router.push(`?table=${tables[0]}`);
  }, [router, searchParams, tables]);

  return (
    <Select
      defaultValue={searchParams.get("table") || tables[0]}
      options={tables.map((x) => ({ label: x, value: x }))}
      onSelect={(value) => {
        router.push(`?table=${value}`);
      }}
      style={{ width: "100%" }}
    />
  );
}
