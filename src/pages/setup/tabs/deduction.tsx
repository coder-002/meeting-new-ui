import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { IDeduction } from "../../../models/setup/deduction/deduction";
import { useGetDeductionFilter } from "../../../services/setup/service-deduction";

const Deduction = () => {
  const { mutateAsync: getDeduction } = useGetDeductionFilter();
  const [data, setData] = useState<IDeduction[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();

  async function getData() {
    const data = await getDeduction({
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

  const cols: any = [
    { dataKey: "deductTitle", label: "deduction_title" },
    // { dataKey: "rate", label: ("rate") },
    { dataKey: "amount", label: "amount" },
    { dataKey: "description", label: "description" },
    { dataKey: "type", label: "type" },
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

export default Deduction;
