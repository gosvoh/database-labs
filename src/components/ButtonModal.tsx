"use client";

import { App, Button, Form as AntdForm, Input, FormInstance } from "antd";
import { addRow } from "../actions";
import { Data } from "../app/page";
import { useEffect } from "react";

const ColumnType = {
  3: "INT",
  10: "DATE",
  11: "TIME",
  253: "VARCHAR",
};

const Form = ({
  data,
  form,
  destroy,
  table,
  columns,
}: {
  data?: Data[0];
  form: FormInstance;
  destroy: () => void;
  table: string;
  columns: { name?: string; type?: number; flags?: number }[];
}) => {
  const { modal } = App.useApp();

  return (
    <AntdForm
      initialValues={{ ...data }}
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      onFinish={async (values) => {
        try {
          await addRow(table!, values);
          destroy();
        } catch (e: any) {
          modal.error({ title: "Ошибка", content: e.message });
        }
      }}
    >
      {columns.map((x, i) => {
        if (x.name === "id") return null;
        return (
          <AntdForm.Item
            key={i}
            label={x.name}
            name={x.name}
            preserve={false}
            rules={[
              {
                required: x.flags !== 0 ? true : false,
                message: "Поле обязательно",
              },
            ]}
          >
            <Input />
          </AntdForm.Item>
        );
      })}
    </AntdForm>
  );
};

export default function ButtonModal({
  columns,
  table,
  edit = false,
  icon,
  text,
  data,
  disabled,
}: {
  columns: { name?: string; type?: number; flags?: number }[];
  table: string | null;
  edit?: boolean;
  icon?: React.ReactNode;
  text?: string;
  data?: Data[0];
  disabled?: boolean;
}) {
  const [form] = AntdForm.useForm();
  const { modal } = App.useApp();

  return (
    <Button
      disabled={disabled}
      icon={icon}
      onClick={() => {
        const mod = modal.confirm({
          title: edit ? "Редактировать запись" : "Добавить запись",
          onOk: (_) => {
            form.submit();
          },
          content: (
            <Form
              columns={columns}
              data={data}
              destroy={() => mod.destroy()}
              form={form}
              table={table!}
            />
          ),
        });
      }}
      type="primary"
    >
      {text}
    </Button>
  );
}
