"use client";

import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectTable({ tables }: { tables: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (!searchParams.get("table")) router.push(`?table=${tables[0]}`);
  }, [router, searchParams, tables]);

  useEffect(() => {
    const table = searchParams.get("table");
    if (!table) return;
    setValue(table.split(","));
  }, [searchParams]);

  useEffect(() => {
    if (value.length === 0) return;
    router.push(`?table=${value.join(",")}`);
  }, [router, value]);

  return (
    <Select
      maxCount={2}
      mode="multiple"
      value={value}
      onChange={setValue}
      options={tables.map((x) => ({ label: x, value: x }))}
      style={{ width: "100%" }}
    />
  );
}
