import { Badge } from "@fluentui/react-components";
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllUnits } from "../../../services/setup/service-unit";
import { ICommitteetype } from "../../../models/setup/committee_type/committee_type";
import { useGetCommittetypefilter } from "../../../services/setup/service-committeetype";

const Committeetype = () => {
  const localize = useLocale();
  const [data, setData] = useState<ICommitteetype[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getCommitteetypeFilter } = useGetCommittetypefilter();
  const { data: unitData } = useGetAllUnits();
  console.log(unitData);
  async function getData() {
    const data = await getCommitteetypeFilter({
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

  const cols: DataTable<ICommitteetype>[] = [
    {
      dataKey: "typeName",
      label: localize("type_name"),
    },
    {
      dataKey: "description",
      label: localize("description"),
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

export default Committeetype;