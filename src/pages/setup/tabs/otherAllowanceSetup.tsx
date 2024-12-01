import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { IOtherAllowance } from "../../../models/setup/OtherAllowance/otherAllowance";
import {
  useGetOtherAllowance,
  usePostOtherAllowance,
} from "../../../services/setup/service-otherAllowanceSetup";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import { Button } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../../../components/form/Select";
import { useGetAllAllowanceType } from "../../../services/setup/service-allowancetype";
const OtherAllowanceSetup = () => {
  const initialValues: IOtherAllowance = {
    allowanceName: "",
    amount: 0,
  };
  const [data, setData] = useState<IOtherAllowance[]>([]);
  const { mutateAsync: postOtherAllowance } = usePostOtherAllowance();
  const localize = useLocale();
  const { data: allAllowanceType } = useGetAllAllowanceType();
  const { data: otherAllowance } = useGetOtherAllowance();
  const [open, setOpen] = useState(false);
  const { control, reset, handleSubmit } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  });
  const selectAllowanceType = allAllowanceType?.data.map((item) => {
    return { label: item.typeName, value: item.id };
  });
  const cols: DataTable<IOtherAllowance>[] = [
    {
      dataKey: "allowanceName",
      label: localize("Allowance"),
    },
    {
      dataKey: "amount",
      label: localize("amount"),
    },
  ];

  console.log(otherAllowance);

  const submitOtherallowancesetup = async (data: IOtherAllowance) => {
    const requestBody = {
      ...data,
      allowance_type_id: data.allowanceTypeId,
    };
    const response = await postOtherAllowance(requestBody);
    if (response.status == 200) {
      setOpen(true);
      reset(initialValues);
    }
  };
  const handleClick = () => {
    setOpen(false);
    reset(initialValues);
  };
  return (
    <div>
      <TableComp
        columns={cols}
        data={otherAllowance?.data || []}
        selectionMode="single"
        pagination={false}
        onAddButtonClick={() => setOpen(true)}
      />
      <Drawer
        title={localize("add_otherallowancesetup")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(submitOtherallowancesetup)}>
          <Select
            name="allowanceTypeId"
            label={localize("allowance_name")}
            control={control}
            options={selectAllowanceType||[]}
          />
          <Input name="amount" label={localize("Amount")} control={control} />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleClick}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default OtherAllowanceSetup;
