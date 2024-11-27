
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllUnits } from "../../../services/setup/service-unit";
import { IOtherAllowance } from "../../../models/setup/OtherAllowance/otherAllowance";
import { useGetOtherAllowancefilter } from "../../../services/setup/service-otherAllowanceSetup";

const OtherAllowanceSetup = () => {
  const localize = useLocale();
  const [data, setData] = useState<IOtherAllowance[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getOtherAllowencFilter } = useGetOtherAllowancefilter();
  const { data: unitData } = useGetAllUnits();
  console.log(unitData);
  async function getData() {
    const data = await getOtherAllowencFilter({
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchText: searchText,
    });
    if (data && data.data) {
      setData(data.data.data);
    }
  }

  useEffect(() => {
    getData();
  }, [pageNumber, pageSize, searchText]);

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
        data={data || []}
        selectionMode="single"
        searchValue={searchText}
        currentPage={pageNumber}
        pageSize={pageSize}
        setCurrentPage={setPageNumber}
        setPageSize={setPageSize}
        setSearchValue={setSearchText}
      />
    </div>
  );
};

export default OtherAllowanceSetup;
