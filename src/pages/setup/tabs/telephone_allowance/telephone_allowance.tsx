import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import TableComp from "../../../../components/table/TableComp";
import { ITelephoneAllowance } from "../../../../models/setup/telephoneallowance/telephoneallowance";
import { useGetTelephoneAllowance } from "../../../../services/setup/service-telephone_allowance";
const Telephoneallowance = () => {
  const localize = useLocale();
  const { data: telephoneAllowance } = useGetTelephoneAllowance();
  const cols: DataTable<ITelephoneAllowance>[] = [
    {
      dataKey: "memberId",
      label: localize("member_id"),
    },
    {
      dataKey: "amount",
      label: localize("Amount"),
    },
    {
      dataKey: "allowanceName",
      label: localize("allowance_name"),
    },
  ];
  return (
    <>
      <TableComp
        columns={cols}
        data={telephoneAllowance?.data || []}
        selectionMode="single"
        pagination={false}
      />
      {/* <Drawer
        title={localize("add_telephoneallowance")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form>
          <Input
            name="memberId"
            label={localize("member_id")}
            control={control}
          />
          <Input name="amount" label={localize("Amount")} control={control} />
          <Input
            name="allowanceName"
            label={localize("allowance_name")}
            control={control}
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleClick} >{localize("cancel")}</Button>
        </form>
      </Drawer> */}
    </>
  );
};

export default Telephoneallowance;
