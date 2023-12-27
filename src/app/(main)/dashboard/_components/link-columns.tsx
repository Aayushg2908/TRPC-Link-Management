"use client";

import { ColumnDef } from "@tanstack/react-table";

import LinkCellAction from "./link-cell-action";

export type LinksColumn = {
  id: string;
  link: string;
  createdAt: string;
};

export const columns: ColumnDef<LinksColumn>[] = [
  {
    accessorKey: "link",
    header: "Links",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <LinkCellAction data={row.original} />,
  },
];