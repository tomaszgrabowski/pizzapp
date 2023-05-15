"use client";

import React, { FC } from "react";
import { api } from "@/utils/api";
import { useTable } from "@/components/common/table-provider/TableProvider";

const Tables: FC = () => {
  const { data } = api.tables.getTables.useQuery();
  return (
    <div className="wrap flex gap-2">
      {data?.map((table) => (
        <Table key={table.id} name={table.name} id={table.id} />
      ))}
    </div>
  );
};

export default Tables;

const Table: FC<{ name: string; id: string }> = (props) => {
  const { handleSetTable, tableId } = useTable();
  const handlePickTable = () => {
    handleSetTable(props.id);
  };
  return (
    <div
      className={`flex h-48 flex-grow items-center justify-center bg-blue-200 p-2 ${calculateTableBackground(
        props.id,
        tableId
      )}`}
      onClick={handlePickTable}
    >
      <h1>{props.name}</h1>
    </div>
  );
};

const calculateTableBackground = (
  tableId: string,
  pickedTableId: string | undefined
) => {
  if (pickedTableId === tableId.toString()) {
    return "bg-green-200";
  }
};
