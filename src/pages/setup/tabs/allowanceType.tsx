import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { useGetAllowanceTypeFilter } from "../../../services/setup/service-allowancetype";
import { IAllowanceType } from "../../../models/setup/allowance_type/allowance_type";
import { DataTable } from "../../../components/table/table";
import { Badge } from "@fluentui/react-components";

const AllowanceType = () => {
  const localize = useLocale();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const [data, setData] = useState<IAllowanceType[]>([]);
  const { mutateAsync: getAllowanctypeFilter } = useGetAllowanceTypeFilter();

  const getData = async () => {
    const data = await getAllowanctypeFilter({
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchText: searchText,
    });

    if (data && data.data) {
      setData(data.data.data);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber, pageSize, searchText]);

  const columns: DataTable<IAllowanceType>[] = [
    { dataKey: "typeName", label: localize("allowance_type_name") },
    { dataKey: "taxRate", label: localize("tax_rate") },
    { dataKey: "description", label: localize("description") },
    {
      dataKey: "deductionCompulsory",
      label: localize("is_deduction_compulsory"),
      render: (item: IAllowanceType) => {
        return (
          <Badge color={item.deductionCompulsory ? "brand" : "warning"}>
            {item.deductionCompulsory
              ? localize("compulsory")
              : localize("not_compulsory")}
          </Badge>
        );
      },
    },
  ];

  return (
    <TableComp
      columns={columns}
      data={data}
      selectionMode="single"
      searchValue={searchText}
      currentPage={pageNumber}
      setCurrentPage={setPageNumber}
      pageSize={pageSize}
      setPageSize={setPageSize}
      setSearchValue={setSearchText}
    />
  );
};

export default AllowanceType;
