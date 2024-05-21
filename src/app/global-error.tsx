"use client";

import { Button, Result, Space } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Result
      status={500}
      title="500"
      subTitle="Извините, что-то пошло не так."
      extra={
        <Space>
          <Button type="primary" href="/">
            Вернуться на главную
          </Button>
          <Button onClick={reset}>Попробовать снова</Button>
        </Space>
      }
    />
  );
}
