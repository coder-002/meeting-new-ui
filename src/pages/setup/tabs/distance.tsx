import { useEffect, useState } from "react";
import { IDistance } from "../../../models/setup/distance/distance";
import { useGetDistanceFilter } from "../../../services/setup/service-distance";
import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";

const Distance = () => {
  const localize = useLocale();
  const { mutateAsync: getDesignation } = useGetDistanceFilter();
  const [data, setData] = useState<IDistance[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();

  async function getData() {
    const data = await getDesignation({
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

  const cols: DataTable<IDistance>[] = [
    {
      dataKey: "fromBranch",
      label: localize("from_branch"),
      //   render: (item: any) => {
      //     return (
      //       <>
      //         {branchData &&
      //           branchData?.find((branch) => branch?.id === item?.fromBranch)
      //             ?.branchName}
      //       </>
      //     );
      //   },
    },
    {
      dataKey: "toBranch",
      label: localize("to_branch"),
      //   render: (item) => {
      //     return (
      //       <>
      //         {branchData &&
      //           branchData?.find((branch) => branch?.id === item?.toBranch)
      //             ?.branchName}
      //       </>
      //     );
      //   },
    },
    { dataKey: "kiloMeter", label: localize("distance_inkm") },
    { dataKey: "description", label: localize("description") },
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

export default Distance;
