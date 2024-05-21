import { Space } from "antd";
import SelectTable from "./SelectTable";
import DataTable from "./Table";
import SpaceCompact from "./SpaceCompact";
import ButtonModal from "./ButtonModal";
import { PlusOutlined } from "@ant-design/icons";
import query from "./db";
import CustomQuery from "./CustomQuery";

export const dynamic = "force-dynamic";

export type Data = { id: number; [key: string]: string | number | null }[];

export default async function Home({
  searchParams,
}: {
  searchParams: { table?: string };
}) {
  const select = async (table: string) => query<Data>(`SELECT * FROM ${table}`);
  const tables = (
    await query<{ Tables_in_sky: string }[]>("SHOW TABLES")
  )[0].map((x) => x.Tables_in_sky);
  const table = searchParams.table || tables[0];
  const [data, cols] = await select(table);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SpaceCompact style={{ width: "100%" }}>
        <SelectTable tables={tables} />
        <ButtonModal
          table={table}
          icon={<PlusOutlined />}
          text="Добавить запись"
          columns={cols.map((x) => ({
            name: x.name,
            type: x.type,
            flags: x.flags as number,
          }))}
        />
      </SpaceCompact>
      <DataTable data={data} columns={cols.map((x) => ({ name: x.name }))} />
      <CustomQuery />
    </Space>
  );
}
