import { useState, useEffect } from "react";
import TableComp from "../../../components/table/TableComp";
import { DataTable } from "../../../components/table/table";
import { IDocumentType } from "../../../models/setup/document_type/document_type";
import { useGetDocumentTypeFilter } from "../../../services/setup/service-documenttype";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { Badge } from "@fluentui/react-components";

const DocumentType = () => {
  const localize = useLocale();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<IDocumentType[]>([]);
  const { mutateAsync: getDocumenttypeFilter } = useGetDocumentTypeFilter();
  const getData = async () => {
    try {
      const data = await getDocumenttypeFilter({
        pageNumber,
        pageSize,
        searchText,
      });
      if (data && data.data) {
        setData(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching document types:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber, pageSize, searchText, getDocumenttypeFilter]);

  const columns: DataTable<IDocumentType>[] = [
    {
      dataKey: "id",
      label: localize("number"),
    },
    {
      dataKey: "typeName",
      label: localize("document_type_name"),
    },
    {
      dataKey: "isCompulsory",
      label: localize("is_compulsory"),
      render: (item: IDocumentType) => {
        return (
          <Badge color={item.isCompulsory ? "brand" : "warning"}>
            {item.isCompulsory
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
export default DocumentType;
