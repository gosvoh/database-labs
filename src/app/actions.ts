"use server";

import { revalidatePath } from "next/cache";
import query from "./db";

export async function addRow(
  table: string,
  data: Record<string, string | number | null>
) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  await query(
    `INSERT INTO ${table} (id, ${keys.join(", ")}) VALUES (NULL, ${values.join(
      ", "
    )})`
  );
  return revalidatePath("/");
}

export async function deleteRow(table: string, id: number) {
  await query(`DELETE FROM ${table} WHERE id = ${id}`);
  return revalidatePath("/");
}

export async function customQuery(customQuery: string) {
  const res = (await query(customQuery))[0] as unknown[];
  if (Array.isArray(res)) return res;
  else return JSON.stringify(res);
}
