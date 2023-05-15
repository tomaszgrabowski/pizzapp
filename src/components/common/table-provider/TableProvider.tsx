"use client";

import { createContext, FC, useContext, useState } from "react";

export interface ITable {
  tableId: string | undefined;
  handleSetTable: (table: string) => void;
  handleClearTable: () => void;
}

const TableContext = createContext<ITable | undefined>(undefined);
export const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context as ITable;
};
export const TableProvider: FC<{ children: JSX.Element }> = (props) => {
  const { children } = props;
  const [tableId, setTableId] = useState<string | undefined>(undefined);

  const handleSetTable = (table: string) => {
    setTableId(table);
  };

  const handleClearTable = () => {
    setTableId(undefined);
  };

  const actions = {
    handleSetTable,
    handleClearTable,
  };

  return (
    <TableContext.Provider value={{ tableId, ...actions }}>
      {children}
    </TableContext.Provider>
  );
};
