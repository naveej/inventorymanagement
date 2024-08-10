import { ColumnDef } from "@tanstack/react-table";

export type ExtendedColumnDef<T, U = {}> = ColumnDef<T, U> & {
  className?: string;
};
