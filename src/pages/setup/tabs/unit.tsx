import { Badge } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useGetUnitFilter } from "../../../services/setup/service-unit";
import { IUnit } from "../../../models/setup/unit/unit";
import { useLocale } from "../../../contexts/LocaleContextProvider";

const BusinessUnit = () => {
  const localize = useLocale();
  const { mutateAsync: getBusinessUnit } = useGetUnitFilter();
  const [data, setData] = useState<IUnit[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();

  async function getData() {
    const data = await getBusinessUnit({
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
      dataKey: "unitName",
      label: localize("unit_name"),
    },
    {
      dataKey: "registrationDate",
      label: localize("registration_date"),
    },
    {
      dataKey: "address",
      label: localize("address"),
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

export default BusinessUnit;
