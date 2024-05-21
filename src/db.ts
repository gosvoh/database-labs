import mysql2 from "mysql2/promise";

export default async function query<T>(query: string) {
  const databaseConnection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    return databaseConnection.query(query) as Promise<
      [T, mysql2.FieldPacket[]]
    >;
  } catch (e) {
    throw e;
  } finally {
    await databaseConnection.end();
  }
}
