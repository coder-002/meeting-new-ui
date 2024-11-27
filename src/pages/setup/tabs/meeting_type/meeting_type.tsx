import { useEffect, useState } from "react";
import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import TableComp from "../../../../components/table/TableComp";
import { IMeetingType } from "../../../../models/setup/meetingtype/meetingtype";
import { useGetMeetingtypefilter } from "../../../../services/setup/service-meeting_type";
import { Badge } from "@fluentui/react-components";
const Meetingtype = () => {
  const localize = useLocale();
  const [data, setData] = useState<IMeetingType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getMeeting_typefilter} = useGetMeetingtypefilter();
  async function getData() {
    const data = await getMeeting_typefilter({
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
  const cols: DataTable<IMeetingType>[] = [
    {
      dataKey: "typeName",
      label: localize("typename"),
    },
    {
      dataKey: "description",
      label: localize("description"),
    },
    {
      dataKey: "allowanceApplicable",
      label: localize("allowance_applicable"),
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            style={{
              backgroundColor: item.allowanceApplicable ? "primary" : "red",
            }}
          >
            {item.allowanceApplicable? "active" : "inactive"}
          </Badge>
        );
      },
    },
  ];
  return (
    <>
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
    </>
  );
};

export default Meetingtype;
