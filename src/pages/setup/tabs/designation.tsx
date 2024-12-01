import { Badge, Button } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useAllDesignation, useGetDesignationFilter } from "../../../services/setup/service-designation";
import { IDesignation } from "../../../models/setup/designation/designation";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
const initialValues = {
  designationCode: "",
  designationName: "",
  isActive: true,
  rank: 0,
};
const Designation = () => {
  const localize = useLocale();
  const[open,setOpen]=useState(false);
  const { mutateAsync: postAllDesignation } = useAllDesignation();
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

   const { control, handleSubmit, reset } = useForm<IDesignation>({
     defaultValues: initialValues,
   });
   const submitHandler = async (data: IDesignation) => {
     const response = await postAllDesignation(data);

     if (response.status == 200) {
       alert("success");
       setOpen(false);
       reset(initialValues);
     }
   };
   const handleCancel = () => {
     setOpen(false);
     reset(initialValues);
   };
  const cols: DataTable<IDesignation>[] = [
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
        onAddButtonClick={() => setOpen(true)}
      />

      <Drawer title={localize("add_designation")} isOpen={open} setIsOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="designationCode"
            control={control}
            label={localize("designation_code")}
            required
          />
          <Input
            name="designationName"
            control={control}
            label={localize("designation_name")}
            required
          />
          <Input
            name="rank"
            control={control}
            label={localize("rank")}
            required
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default Designation;
