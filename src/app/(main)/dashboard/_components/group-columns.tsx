"use client";

import { ColumnDef } from "@tanstack/react-table";

import GroupCellAction from "./group-cell-action";

export type GroupsColumn = {
  id: string;
  name: string;
  links: number;
};

export const groupColumns: ColumnDef<GroupsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "links",
    header: "Links Inside",
  },
  {
    id: "actions",
    cell: ({ row }) => <GroupCellAction data={row.original} />,
  },
];