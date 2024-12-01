import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import {
  useGetAllowanceTypeFilter,
  usePostAllowanceType,
} from "../../../services/setup/service-allowancetype";
import { IAllowanceType } from "../../../models/setup/allowance_type/allowance_type";
import { DataTable } from "../../../components/table/table";
import { Badge, Button } from "@fluentui/react-components";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import Checkbox from "../../../components/form/Checkbox";
const initialValues = {
  id:0,
  typeName: "",
  description: "",
  isTransportation: false,
  isTelephone: false,
  taxRate:0,
  deductionCompulsory: false,
};

const AllowanceType = () => {
  const localize = useLocale();
   const { control, handleSubmit, reset } = useForm({
     defaultValues: initialValues,
   });
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const [data, setData] = useState<IAllowanceType[]>([]);
  const { mutateAsync: postAllowancetype } = usePostAllowanceType();
  const { mutateAsync: getAllowanctypeFilter } = useGetAllowanceTypeFilter();
const [checkedCompulsory, setCheckedCompulsory] = useState(false);
  const [checkedTransportation, setCheckedTransportation] = useState(false);
  const [checkedTelephone, setCheckedTelephone] = useState(false);
 
  const onSubmitHandler = async (data: IAllowanceType) => {
  const response = await postAllowancetype(data);

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
  const getData = async () => {
    const data = await getAllowanctypeFilter({
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchText: searchText,
    });

    if (data && data.data) {
      setData(data.data.data);
    }
  };

  useEffect(() => {
    getData();
  }, [pageNumber, pageSize, searchText]);

  const columns: DataTable<IAllowanceType>[] = [
    { dataKey: "typeName", label: localize("allowance_type_name") },
    { dataKey: "taxRate", label: localize("tax_rate") },
    { dataKey: "description", label: localize("description") },
    {
      dataKey: "deductionCompulsory",
      label: localize("is_deduction_compulsory"),
      render: (item: IAllowanceType) => {
        return (
          <Badge color={item.deductionCompulsory ? "brand" : "warning"}>
            {item.deductionCompulsory
              ? localize("compulsory")
              : localize("not_compulsory")}
          </Badge>
        );
      },
    },
  ];

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
        onAddButtonClick={() => {
          setOpen(true);
        }}
      />
      <Drawer
        title={localize("add_allowance_type")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            control={control}
            name="typeName"
            label={localize("allowance_type_name")}
            required
            placeholder="Allowance Type"
          />
          <Input
            control={control}
            name="description"
            label={localize("description")}
            placeholder="Description"
          />
          <Input
            control={control}
            name="taxRate"
            label={localize("tax_rate")}
            placeholder="Tax Rate"
          />
          <Checkbox
            name="deductionCompulsory"
            control={control}
            label={localize("is_deduction_compulsory")}
            checked={checkedCompulsory}
            onChange={() => {
              setCheckedCompulsory(!checkedCompulsory);
            }}
          />

          <Checkbox
            name="isTransportation"
            control={control}
            label={localize("is_transportation_allowance")}
            checked={checkedTransportation}
            onChange={() => {
              setCheckedTransportation(!checkedTransportation);
            }}
          />

          <Checkbox
            name="isTelephone"
            control={control}
            label={localize("is_telephone_allowance")}
            checked={checkedTelephone}
            onChange={() => {
              setCheckedTelephone(!checkedTelephone);
            }}
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </>
  );
};

export default AllowanceType;
