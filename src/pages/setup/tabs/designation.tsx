import { Badge } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useGetDesignationFilter } from "../../../services/setup/service-designation";
import { IDesignation } from "../../../models/setup/designation/designation";
import { useLocale } from "../../../contexts/LocaleContextProvider";

const Designation = () => {
  const localize = useLocale();
  const { mutateAsync: getDesignation } = useGetDesignationFilter();
  const [data, setData] = useState<IDesignation[]>([]);
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

  const cols: any = [
    { dataKey: "rank", label: localize("rank") },
    { dataKey: "designationName", label: localize("designation_name") },
    {
      dataKey: "isActive",
      label: localize("status"),
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            // color={item.isActive ? "success" : "danger"}
            style={{
              backgroundColor: item.isActive ? "primary" : "red",
            }}
          >
            {item.isActive ? "active" : "inactive"}
          </Badge>
        );
      },
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

export default Designation;
