
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  Line, 
  Bar, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";

interface DataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface DataSetProps {
  title: string;
  description?: string;
  data: DataPoint[];
  colors?: string[];
  xKey?: string;
  yKey?: string;
}

const DEFAULT_COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1",
  "#a4de6c", "#d0ed57", "#83a6ed", "#8884d8"
];

const DataVisualization = ({ 
  title,
  description,
  data, 
  colors = DEFAULT_COLORS,
  xKey = "name",
  yKey = "value"
}: DataSetProps) => {
  const [visualizationType, setVisualizationType] = useState<"chart" | "table">("chart");
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title || "No Data Available"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            No data available for visualization
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if the data is appropriate for pie chart (sum should be meaningful)
  const isPieChartSuitable = data.every(item => typeof item[yKey] === 'number' && item[yKey] >= 0);

  return (
    <Card className="w-full shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-2">
          <Tabs 
            defaultValue={chartType} 
            onValueChange={(value) => setChartType(value as "line" | "bar" | "pie")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="pie" disabled={!isPieChartSuitable}>Pie</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs 
            defaultValue={visualizationType}
            onValueChange={(value) => setVisualizationType(value as "chart" | "table")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {visualizationType === "chart" ? (
          <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={yKey} 
                    stroke={colors[0]} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              ) : chartType === "bar" ? (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={xKey} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={yKey} fill={colors[0]} />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey={yKey}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(data[0]).map((key) => (
                    <TableHead key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <TableCell key={key}>
                        {typeof value === 'number' 
                          ? Number.isInteger(value) 
                            ? value 
                            : value.toFixed(2)
                          : String(value)
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
