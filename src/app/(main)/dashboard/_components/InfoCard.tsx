import Link from "next/link";
import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  value: number;
  link: string;
}

const InfoCard = ({ title, description, value, link }: InfoCardProps) => {
  return (
    <Link href={link}>
      <div className="mr-2 rounded-xl border border-none text-card-foreground bg-secondary/50 shadow-sm">
        <div className="p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-y-1">
            <div className="text-lg font-semibold">{title}</div>
            <div className="opacity-60 text-sm">{description}</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{value}</div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
