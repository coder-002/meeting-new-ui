import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import TableComp from "../../../../components/table/TableComp";
import { IFiscalyear } from "../../../../models/setup/fiscalyear/fiscalyear";
import { useGetAllFiscalyear, usePostAllFiscalyear } from "../../../../services/setup/service-fiscal_year";
import Drawer from "../../../../components/drawer/Drawer";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import Input from "../../../../components/form/Input";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@fluentui/react-components";
const initialValues:IFiscalyear={
  id:0,
   name:"",
   startsOn:"",
   endsOn:"",
 }

const Fiscalyear = ( props: Partial<DatePickerProps>) => {
  const localize = useLocale();
  const { mutateAsync: postAllFiscalyear} = usePostAllFiscalyear();
  const[open,setOpen]=useState(false);
    const submitHandler = async (data: IFiscalyear) => {
      const response = await postAllFiscalyear(data);

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
  const { data: fiscalYear } = useGetAllFiscalyear();
  const{control,handleSubmit,reset}=useForm({
    defaultValues:initialValues,
  })
  const cols: DataTable<IFiscalyear>[] = [
    {
      dataKey: "name",
      label: localize("name"),
    },
    {
      dataKey: "startsOn",
      label: localize("start_year"),
    },
    {
      dataKey: "endsOn",
      label: localize("end_year"),
    },
  ];
  return (
    <>
      <TableComp
        columns={cols}
        data={fiscalYear?.data || []}
        selectionMode="single"
        pagination={false}
        onAddButtonClick={()=>setOpen(true)}
      />
      <Drawer
        title={localize("add_fiscal_year")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="name"
            control={control}
            label={localize("title")}
          ></Input>
          <DatePicker
            name="startsOn"
            placeholder="Select a date..."
            {...props}
          ></DatePicker>
          <DatePicker
            name="endsOn"
            placeholder="Select a date..."
            {...props}
          ></DatePicker>
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </>
  );
};

export default Fiscalyear;
