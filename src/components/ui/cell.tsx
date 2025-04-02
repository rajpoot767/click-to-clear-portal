
import React from "react";
import { Cell as RechartsCell } from "recharts";

interface CellProps {
  fill: string;
  key: string;
}

const Cell: React.FC<CellProps> = ({ fill, key }) => {
  return <RechartsCell key={key} fill={fill} />;
};

export default Cell;
