"use client";

import { App, Button, Form, Input, Space, Table } from "antd";
import { customQuery } from "../actions";
import React, { useEffect, useState } from "react";

export default function CustomQuery() {
  const [result, setResult] = useState<any[]>([]);
  const { modal } = App.useApp();

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Form
        onFinish={async (x) => {
          try {
            const res = await customQuery(x.query);
            if (Array.isArray(res)) setResult(res);
            else {
              setResult(
                Object.entries(JSON.parse(res) as { [key: string]: any }).map(
                  ([key, value]) => ({ key, value })
                )
              );
            }
          } catch (e: any) {
            modal.error({ title: "Ошибка", content: e.message });
          }
        }}
        layout="inline"
      >
        <Form.Item
          name={"query"}
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Введите запрос" }]}
        >
          <Input.TextArea placeholder="Свой запрос" allowClear />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form>
      <Table
        dataSource={result}
        columns={
          result.length
            ? Object.keys(result[0]).map((x) => ({ title: x, dataIndex: x }))
            : []
        }
        rowKey={Math.random}
      />
    </Space>
  );
}
