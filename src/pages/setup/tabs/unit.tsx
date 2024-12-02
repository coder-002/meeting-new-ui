import { Badge, Button } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useGetUnitFilter, usePostAllUnits } from "../../../services/setup/service-unit";
import { IUnit } from "../../../models/setup/unit/unit";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";

const BusinessUnit = () => {
  const localize = useLocale();
  const{mutateAsync:postAllUnits}=usePostAllUnits();
  const { mutateAsync: getBusinessUnit } = useGetUnitFilter();
  const [data, setData] = useState<IUnit[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const[open,setOpen]=useState(false);
  const initialValues:IUnit={
    id: 0,
  unitName: "",
  registrationDate:"",
  address: "",
  isActive: true,
  }
  const{control,handleSubmit,reset}=useForm<typeof initialValues>({
    defaultValues:initialValues,
  })
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
  const submitHandler = async (data: IUnit) => {
    const response = await postAllUnits(data);

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

  const cols: DataTable<IUnit>[] = [
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
        onAddButtonClick={() => setOpen(true)}
      />
      <Drawer title={localize("add_unit")} isOpen={open} setIsOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="unitName"
            control={control}
            label={localize("unit_name")}
            required
          ></Input>
          <Input
            name="registrationDate"
            control={control}
            label={localize("registration_date")}
            required
          />
          <Input
            name="address"
            control={control}
            label={localize("address")}
            required
          ></Input>

          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default BusinessUnit;
