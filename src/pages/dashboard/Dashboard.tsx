import TableComp from "../../components/table/TableComp";

export default function Dashboard() {
  const col: any = [
    { dataKey: "id", label: "ID" },
    { dataKey: "name", label: "Name" },
    { dataKey: "email", label: "Email" },
    { dataKey: "phone", label: "Phone Number" },
    { dataKey: "address", label: "Address" },
  ];
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Maple St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine Rd",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bobbrown@example.com",
      phone: "222-333-4444",
      address: "101 Elm Blvd",
    },
    {
      id: 5,
      name: "Carol White",
      email: "carolwhite@example.com",
      phone: "333-222-1111",
      address: "202 Cedar Ln",
    },
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Maple St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine Rd",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bobbrown@example.com",
      phone: "222-333-4444",
      address: "101 Elm Blvd",
    },
    {
      id: 5,
      name: "Carol White",
      email: "carolwhite@example.com",
      phone: "333-222-1111",
      address: "202 Cedar Ln",
    },
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Maple St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      phone: "555-123-4567",
      address: "789 Pine Rd",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bobbrown@example.com",
      phone: "222-333-4444",
      address: "101 Elm Blvd",
    },
    {
      id: 5,
      name: "test White",
      email: "carolwhite@example.com",
      phone: "333-222-1111",
      address: "202 Cedar Ln",
    },
  ];

  return <TableComp columns={col} data={data} selectionMode="single" />;
}
