import { Space } from "antd";
import SelectTable from "@/components/SelectTable";
import DataTable from "@/components/Table";
import SpaceCompact from "@/components/SpaceCompact";
import ButtonModal from "@/components/ButtonModal";
import { PlusOutlined } from "@ant-design/icons";
import query from "@/db";
import CustomQuery from "@/components/CustomQuery";
import { FieldPacket } from "mysql2";

export const dynamic = "force-dynamic";

export type Data = { id: number; [key: string]: string | number | null }[];

export default async function Home({
  searchParams,
}: {
  searchParams: { table?: string };
}) {
  const select = async () => query<Data>(`SELECT * FROM ${table}`);

  /**
   * Вызов хранимой процедуры multi_select, принимающей в качестве аргументов названия двух таблиц
   */
  const multiSelect: typeof select = async () => {
    const tables = table.split(",");
    const res = await query(
      `CALL multi_select('${tables[0]}', '${tables[1]}')`
    );
    return [(res[0] as any)[0], res[1][0] as unknown as FieldPacket[]];
  };

  const tables = (
    await query<{ Tables_in_sky: string }[]>("SHOW TABLES")
  )[0].map((x) => x.Tables_in_sky);
  const table = searchParams.table || tables[0];
  const [data, cols] =
    table.split(",").length > 1 ? await multiSelect() : await select();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SpaceCompact style={{ width: "100%" }}>
        <SelectTable tables={tables} />
        <ButtonModal
          disabled={
            searchParams.table === undefined ||
            searchParams.table.split(",").length > 1
          }
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
