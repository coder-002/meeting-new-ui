import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { IOtherAllowance } from "../../../models/setup/OtherAllowance/otherAllowance";
import { useGetOtherAllowance } from "../../../services/setup/service-otherAllowanceSetup";

const OtherAllowanceSetup = () => {
  const localize = useLocale();
  const { data: otherAllowance } = useGetOtherAllowance();

  const cols: DataTable<IOtherAllowance>[] = [
    {
      dataKey: "allowanceName",
      label: localize("Allowance"),
    },
    {
      dataKey: "amount",
      label: localize("amount"),
    },
  ];

  return (
    <div>
      <TableComp
        columns={cols}
        data={otherAllowance?.data || []}
        selectionMode="single"
      />
    </div>
  );
};

export default OtherAllowanceSetup;
