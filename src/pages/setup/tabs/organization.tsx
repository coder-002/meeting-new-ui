import TableComp from "../../../components/table/TableComp";

import { useGetOrganization } from "../../../services/setup/service-organization";

const OrganizationPage = () => {
  const { data } = useGetOrganization();

  const columns: any = [
    { dataKey: "fullName", label: "full_name" },
    { dataKey: "nickName", label: "nick_name" },
    {
      dataKey: "registrationDate",
      label: "registration_date",
    },
    {
      dataKey: "registrationNumber",
      label: "registration_number",
    },
    { dataKey: "panNumber", label: "pan_number" },
    { dataKey: "contactPerson", label: "contact_person" },
    { dataKey: "contactNumber", label: "contact_number" },
    { dataKey: "address", label: "address" },
  ];
  return (
    <div>
      <TableComp
        columns={columns}
        data={[data?.data || []]}
        selectionMode="single"
      />
    </div>
  );
};

export default OrganizationPage;
