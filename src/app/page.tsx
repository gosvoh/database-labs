import { Space } from "antd";
import SelectTable from "./SelectTable";
import DataTable from "./Table";
import SpaceCompact from "./SpaceCompact";
import ButtonModal from "./ButtonModal";
import { PlusOutlined } from "@ant-design/icons";
import query from "./db";
import CustomQuery from "./CustomQuery";

export const dynamic = "force-dynamic";

const tables = (await query<{ Tables_in_sky: string }[]>("SHOW TABLES"))[0].map(
  (x) => x.Tables_in_sky
);

// if (tables.length === 0 || tables.length !== 9) {
//   await query(`
//   CREATE TABLE IF NOT EXISTS Sectors (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     coordinates VARCHAR(30) NOT NULL,
//     luminosity INT NOT NULL,
//     outside_objects VARCHAR(255),
//     num_obj INT NOT NULL,
//     num_unexpl_obj INT NOT NULL,
//     num_expl_obj INT NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Natural_objects (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     type VARCHAR(30) NOT NULL,
//     galaxy VARCHAR(30),
//     precition INT NOT NULL,
//     luminosity INT NOT NULL,
//     rel_obj VARCHAR(255) NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Objects (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     type VARCHAR(30) NOT NULL,
//     precition INT NOT NULL,
//     quantity INT NOT NULL,
//     time TIME NOT NULL,
//     date DATE NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Positions (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     pos_earth VARCHAR(30) NOT NULL,
//     pos_sun VARCHAR(30) NOT NULL,
//     pos_moon VARCHAR(30) NOT NULL
// );

// CREATE TABLE IF NOT EXISTS Star_map (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     id_sector INT NOT NULL,
//     id_natural_obj INT,
//     id_obj INT,
//     id_position INT NOT NULL,
//     FOREIGN KEY (id_sector) REFERENCES Sectors (id) ON DELETE CASCADE,
//     FOREIGN KEY (id_natural_obj) REFERENCES Natural_objects (id) ON DELETE CASCADE,
//     FOREIGN KEY (id_obj) REFERENCES Objects (id) ON DELETE CASCADE,
//     FOREIGN KEY (id_position) REFERENCES Positions (id) ON DELETE CASCADE
// );

// CREATE TABLE IF NOT EXISTS Sectors_4 (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     coordinates VARCHAR(30) NOT NULL,
//     luminosity INT NOT NULL,
//     outside_objects VARCHAR(255),
//     num_obj INT NOT NULL,
//     num_unexpl_obj INT NOT NULL,
//     num_expl_obj INT NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Natural_objects_4 (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     type VARCHAR(30) NOT NULL,
//     galaxy VARCHAR(30),
//     precition INT NOT NULL,
//     luminosity INT NOT NULL,
//     rel_obj VARCHAR(255) NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Objects_4 (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     type VARCHAR(30) NOT NULL,
//     precition INT NOT NULL,
//     quantity INT NOT NULL,
//     time TIME NOT NULL,
//     date DATE NOT NULL,
//     notes VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS Positions_4 (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     pos_earth VARCHAR(30) NOT NULL,
//     pos_sun VARCHAR(30) NOT NULL,
//     pos_moon VARCHAR(30) NOT NULL
// );

// CREATE PROCEDURE IF NOT EXISTS add_row(IN table_name VARCHAR(255), IN data JSON)
//     BEGIN
//         SET @keys = JSON_KEYS(data);
//         SET @values = JSON_EXTRACT(data, '$.*');
//         SET @sql = CONCAT('INSERT INTO ', table_name, ' (id, ', @keys, ') VALUES (NULL, ', @values, ')');
//         PREPARE stmt FROM @sql;
//         EXECUTE stmt;
//         DEALLOCATE PREPARE stmt;
//     END;

// CREATE PROCEDURE IF NOT EXISTS multi_select(IN left_table VARCHAR(255), IN right_table VARCHAR(255))
//     BEGIN
//         SELECT * FROM left_table JOIN right_table;
//     END;
//   `);
// }

export type Data = { id: number; [key: string]: string | number | null }[];

const select = async (table: string) => query<Data>(`SELECT * FROM ${table}`);

export default async function Home({
  searchParams,
}: {
  searchParams: { table?: string };
}) {
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
