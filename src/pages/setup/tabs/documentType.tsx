import { useState, useEffect } from "react";
import TableComp from "../../../components/table/TableComp";
import { DataTable } from "../../../components/table/table";
import { IDocumentType } from "../../../models/setup/document_type/document_type";
import {
  useGetDocumentTypeFilter,
  usePostDocumentType,
} from "../../../services/setup/service-documenttype";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import {
  Badge,
  Button
} from "@fluentui/react-components";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import Checkbox from "../../../components/form/Checkbox";
import Drawer from "../../../components/drawer/Drawer";
const initialValues: IDocumentType = {
  id: 0,
  typeName: "",
  isCompulsory: true,
};
const DocumentType = () => {
  const localize = useLocale();
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<IDocumentType[]>([]);
  const { mutateAsync: getDocumenttypeFilter } = useGetDocumentTypeFilter();
  const { mutateAsync: getPostDocumentType } = usePostDocumentType();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });
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
  }, [pageNumber, pageSize, searchText]);
   const handleCancel = () => {
     setOpen(false);
     reset(initialValues);
   };
  const columns: DataTable<IDocumentType>[] = [
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
  const submitDocumenttype = async (data: IDocumentType) => {
    const requestBody = {
      ...data,
    };
    const response = await getPostDocumentType(requestBody);
    if (response.status === 200) {
      setOpen(false);
      reset(initialValues);
    }
  };
  return (
    <>
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
        onAddButtonClick={() => setOpen(true)}
      />
      <Drawer
        title={localize("add_document_type")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(submitDocumenttype)}>
          <Input
            control={control}
            name={"typeName"}
            label={localize("document_type_name")}
            placeholder="Document Type"
          />
          <Checkbox
            control={control}
            name="isCompulsory"
            label="is_compulsory"
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </>
  );
};
export default DocumentType;
