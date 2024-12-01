import { Badge, Button } from "@fluentui/react-components";
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllUnits } from "../../../services/setup/service-unit";
import { ICommitteetype } from "../../../models/setup/committee_type/committee_type";
import { useGetCommittetypefilter, usePostCommitteeType } from "../../../services/setup/service-committeetype";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import Textarea from "../../../components/form/TextArea";
import Checkbox from "../../../components/form/Checkbox";
import { useForm } from "react-hook-form";
const initialValues = {
  id:0,
  description: "",
  typeName: "",
  isActive: false,
};
const Committeetype = () => {
  const localize = useLocale();
  const[open,setOpen]=useState(false);
  const [data, setData] = useState<ICommitteetype[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: postCommitteetype } = usePostCommitteeType();
  const { mutateAsync: getCommitteetypeFilter } = useGetCommittetypefilter();
  const { data: unitData } = useGetAllUnits();
  console.log(unitData);
  const { control, handleSubmit, reset} = useForm({
    defaultValues: initialValues,
  });
  const onSubmitHandler = async (data: ICommitteetype) => {
    const response = await postCommitteetype(data);

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
  async function getData() {
    const data = await getCommitteetypeFilter({
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

  const cols: DataTable<ICommitteetype>[] = [
    {
      dataKey: "typeName",
      label: localize("type_name"),
    },
    {
      dataKey: "description",
      label: localize("description"),
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
        onAddButtonClick={() => {setOpen(true);
        }}
      />
      <Drawer
        title={localize("add_committee_type")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            name="typeName"
            control={control}
            label={localize("type_name")}
            required
          />
          <Textarea
            name="description"
            control={control}
            label={localize("description")}
          />
          <Checkbox
            name="isActive"
            control={control}
            label={localize("set_the_status_of_committee_type")}
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default Committeetype;
