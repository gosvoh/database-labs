"use client";

import { Button, Popconfirm, Table, TableProps } from "antd";
import { Data } from "../app/page";
import SpaceCompact from "./SpaceCompact";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteRow } from "../actions";
import { useSearchParams } from "next/navigation";
import ButtonModal from "./ButtonModal";

export default function DataTable({
  data,
  columns,
}: {
  data: Data;
  columns: { name?: string; type?: number }[];
}) {
  const table = useSearchParams().get("table");

  const getColumns: TableProps<(typeof data)[0]>["columns"] = columns.map(
    (x) => ({
      title: x.name,
      dataIndex: x.name,
    })
  );
  getColumns.push({
    title: "Action",
    render: (_, record) => (
      <SpaceCompact>
        <ButtonModal
          table={table}
          columns={columns}
          icon={<EditOutlined />}
          data={record}
        />
        <Popconfirm
          title="Удалить запись?"
          onConfirm={async () => {
            table && (await deleteRow(table, record.id));
          }}
        >
          <Button danger type="dashed" icon={<DeleteOutlined />} />
        </Popconfirm>
      </SpaceCompact>
    ),
  });

  return (
    <Table
      dataSource={data}
      columns={getColumns}
      pagination={false}
      rowKey={(x) => x.id}
    />
  );
}
