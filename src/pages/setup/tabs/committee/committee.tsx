import { Badge } from "@fluentui/react-components";
import TableComp from "../../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { useGetCommitteeFilter } from "../../../../services/setup/committee/service-committee";
import { ICommittee } from "../../../../models/setup/committee/committee";
import { useLocale } from "../../../../contexts/LocaleContextProvider";

const Committee = () => {
  const localize = useLocale();
  const [data, setData] = useState<ICommittee[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getBranchFilter } = useGetCommitteeFilter();

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
    { dataKey: "rank", label: localize("rank") },
    { dataKey: "unitName", label: localize("unit_name") },
    { dataKey: "branchName", label: localize("branch_name") },
    {
      dataKey: "typeId",
      label: localize("committee_type"),
      // render: (item: any) => {
      //   return (
      //     <>
      //       {committeeType?.find((type) => type?.id == item?.typeId)?.typeName}
      //     </>
      //   );
      // },
    },
    { dataKey: "committeeCode", label: localize("committee_code") },
    { dataKey: "committeeName", label: localize("committee_name") },
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
    { dataKey: "description", label: localize("description") },
  ];
  return (
    <div>
      <TableComp
        columns={cols}
        data={data || []}
        searchValue={searchText}
        currentPage={pageNumber}
        pageSize={pageSize}
        setCurrentPage={setPageNumber}
        setPageSize={setPageSize}
        setSearchValue={setSearchText}
        selectionMode="single"
      />
    </div>
  );
};

export default Committee;
