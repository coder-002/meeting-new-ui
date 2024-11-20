import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";

import { useGetOrganization } from "../../../services/setup/service-organization";

const OrganizationPage = () => {
  const localize = useLocale();
  const { data } = useGetOrganization();

  const columns: any = [
    { dataKey: "fullName", label: localize("full_name") },
    { dataKey: "nickName", label: localize("nick_name") },
    {
      dataKey: "registrationDate",
      label: localize("registration_date"),
    },
    {
      dataKey: "registrationNumber",
      label: localize("registration_number"),
    },
    { dataKey: "panNumber", label: localize("pan_number") },
    { dataKey: "contactPerson", label: localize("contact_person") },
    { dataKey: "contactNumber", label: localize("contact_number") },
    { dataKey: "address", label: localize("address") },
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
