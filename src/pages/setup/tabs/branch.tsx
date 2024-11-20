import { Badge } from "@fluentui/react-components";
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { IBranch } from "../../../models/setup/branch/branch";
import { useGetBranchfilter } from "../../../services/setup/service-branch";
import { useLocale } from "../../../contexts/LocaleContextProvider";

const Branch = () => {
  const localize = useLocale();
  const [data, setData] = useState<IBranch[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getBranchFilter } = useGetBranchfilter();

  async function getData() {
    const data = await getBranchFilter({
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
    {
      dataKey: "branchCode",
      label: localize("branch_code"),
    },
    {
      dataKey: "branchName",
      label: localize("branch_name"),
    },
    {
      dataKey: "orgUnitName",
      label: localize("unit_name"),
      //   render: (item: any) => {
      //     return (
      //       <>
      //         {
      //           unitData.find((unit: IUnit) => unit.id == item.orgUnitId)
      //             ?.unitName
      //         }
      //       </>
      //     );
      //   },
    },
    {
      dataKey: "address",
      label: localize("address"),
    },
    {
      dataKey: "contactNumber",
      label: localize("contact_number"),
    },
    {
      dataKey: "isActive",
      label: localize("status"),
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
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

export default Branch;
