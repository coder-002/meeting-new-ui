import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import TableComp from "../../../../components/table/TableComp";
import { IFiscalyear } from "../../../../models/setup/fiscalyear/fiscalyear";
import { useGetAllFiscalyear } from "../../../../services/setup/service-fiscal_year";
const Fiscalyear = () => {
  const localize = useLocale();
  const { data: fiscalYear } = useGetAllFiscalyear();
  console.log(fiscalYear);
  const cols: DataTable<IFiscalyear>[] = [
    {
      dataKey: "name",
      label: localize("name"),
    },
    {
      dataKey: "startsOn",
      label: localize("start_year"),
    },
    {
      dataKey: "endsOn",
      label: localize("end_year"),
    },
  ];
  return (
    <>
      <TableComp
        columns={cols}
        data={fiscalYear?.data || []}
        selectionMode="single"
        pagination={false}
      />
    </>
  );
};

export default Fiscalyear;
