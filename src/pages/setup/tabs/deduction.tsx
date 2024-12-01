import { useEffect, useState } from "react";
import TableComp from "../../../components/table/TableComp";
import { IDeduction } from "../../../models/setup/deduction/deduction";
import {
  useGetDeductionFilter,
  usePostDeduction,
} from "../../../services/setup/service-deduction";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import {
  Button
} from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import Textarea from "../../../components/form/TextArea";
import Checkbox from "../../../components/form/Checkbox";
import Drawer from "../../../components/drawer/Drawer";

const initialValues: IDeduction = {
  amount: 0,
  deductTitle: "",
  description: "",
  id: 0,
  rate: 0,
  isCompulsory: false,
};

const Deduction = () => {
  const localize = useLocale();
  const { mutateAsync: getDeduction } = useGetDeductionFilter();
  const [data, setData] = useState<IDeduction[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync: createDeduction } = usePostDeduction();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });

  async function getData() {
    const data = await getDeduction({
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

  const cols: DataTable<IDeduction>[] = [
    { dataKey: "deductTitle", label: localize("deduction_title") },
    { dataKey: "amount", label: localize("amount") },
    { dataKey: "description", label: localize("description") },
    { dataKey: "isCompulsory", label: localize("type") },
  ];

  const submitDeduction = async (data: IDeduction) => {
    const requestBody = {
      ...data,
    };

    const response = await createDeduction(requestBody);

    if (response.status === 200) {
      alert("added");
      setOpen(false);
      reset(initialValues);
    }
  };

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
      <Drawer  title={localize("deduction")}isOpen={open} setIsOpen={setOpen}>
          <form onSubmit={handleSubmit(submitDeduction)}>
            <Input
              control={control}
              name={"deductTitle"}
              label={localize("deduction_title")}
            />
            <Textarea
              control={control}
              name={"description"}
              label={localize("description")}
            />
            <Input
              control={control}
              name={"amount"}
              label={localize("amount")}
            />
            <Input control={control} name={"rate"} label={localize("rate")} />
            <Checkbox
              control={control}
              name="isCompulsory"
              label="Is Deduction Compulsory"
            />

            <Button type="submit">{localize("add")}</Button>
          </form>
      </Drawer>
    </div>
  );
};

export default Deduction;
