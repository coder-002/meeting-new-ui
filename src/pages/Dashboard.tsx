import { useState } from "react";
import { DataTable } from "../components/table/table";
import TableComp from "../components/table/TableComp";

interface TableData {
  id: string;
  file: string;
  author: string;
  lastUpdated: string;
  lastUpdate: string;
}
const Dashboard = () => {
  const [searchValue, setSearchValue] = useState<string>();
  console.log(searchValue);
  const columns: DataTable<TableData>[] = [
    { dataKey: "id", label: "ID" },
    { dataKey: "file", label: "File" },
    { dataKey: "author", label: "Author" },
    { dataKey: "lastUpdated", label: "Last Updated" },
    { dataKey: "lastUpdate", label: "Last Update" },
  ];

  const data = [
    {
      id: "1",
      file: "file1.txt",
      author: "John Doe",
      lastUpdated: "2024-09-01",
      lastUpdate: "1 day ago",
    },
    {
      id: "2",
      file: "file2.txt",
      author: "Jane Smith",
      lastUpdated: "2024-09-02",
      lastUpdate: "2 days ago",
    },
    {
      id: "3",
      file: "file3.txt",
      author: "Mary Johnson",
      lastUpdated: "2024-09-03",
      lastUpdate: "3 days ago",
    },
    {
      id: "4",
      file: "file4.txt",
      author: "James Williams",
      lastUpdated: "2024-09-04",
      lastUpdate: "4 days ago",
    },
  ];

  const handleRowClick = (rowData: TableData) => {
    console.log("Row clicked:", rowData);
  };

  return (
    <div>
      <TableComp
        columns={columns}
        data={data}
        selectionMode="single"
        onRowClick={(rowData) => handleRowClick(rowData as TableData)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default Dashboard;
