import { useEffect, useState } from "react";
import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import TableComp from "../../../../components/table/TableComp";
import { IMeetingType } from "../../../../models/setup/meetingtype/meetingtype";
import { useGetMeetingtypefilter, usePostAllMeetingtype } from "../../../../services/setup/service-meeting_type";
import { Badge, Button } from "@fluentui/react-components";
import Drawer from "../../../../components/drawer/Drawer";
import Input from "../../../../components/form/Input";
import Textarea from "../../../../components/form/TextArea";
import Checkbox from "../../../../components/form/Checkbox";
import { useForm } from "react-hook-form";
const initialValues:IMeetingType={
  id: 0,
  typeName:"",
  description: "",
  allowanceApplicable: true,
}

const Meetingtype = () => {
  const localize = useLocale();
  const{control,handleSubmit,reset}=useForm({
    defaultValues:initialValues,
  })
  const[open,setOpen]=useState(false);
  const [data, setData] = useState<IMeetingType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const{mutateAsync: postMeetingtype}=usePostAllMeetingtype();
  const { mutateAsync: getMeeting_typefilter} = useGetMeetingtypefilter();
  async function getData() {
    const data = await getMeeting_typefilter({
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
  const cols: DataTable<IMeetingType>[] = [
    {
      dataKey: "typeName",
      label: localize("typename"),
    },
    {
      dataKey: "description",
      label: localize("description"),
    },
    {
      dataKey: "allowanceApplicable",
      label: localize("allowance_applicable"),
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            style={{
              backgroundColor: item.allowanceApplicable ? "primary" : "red",
            }}
          >
            {item.allowanceApplicable? "active" : "inactive"}
          </Badge>
        );
      },
    },
  ];
    const onSubmitHandler = async (data: IMeetingType) => {
    const response = await postMeetingtype(data);

    if (response.status == 200) {
      alert("success");
      setOpen(false);
      reset(initialValues);
    }
  };
  const handleCancel=()=>
  {
     setOpen(false);
      reset(initialValues);
  }
  return (
    <>
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
        onAddButtonClick={()=>setOpen(true)}
      />
      <Drawer
        title={localize("add_meeting_type")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
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
              name="allowanceApplicable"
              control={control}
              label={localize("is_allowance_applicable")}
            />

           <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
            </div>
        </form>
      </Drawer>
    </>
  );
};

export default Meetingtype;
