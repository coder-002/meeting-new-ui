import { useEffect, useState } from "react";
import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import { IUser } from "../../../../models/setup/user/user";
import { useGetUserfilter, usepostUser } from "../../../../services/setup/service-user";
import TableComp from "../../../../components/table/TableComp";
import Drawer from "../../../../components/drawer/Drawer";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import { Button } from "@fluentui/react-components";
import Select from "../../../../components/form/Select";
const initialValues: IUser = {
   id: 0,
  role: "",
  userName:"",
  email: "",
  password:"",
  fullName:"",
  phone:"",
  guid:"",
};
const User= () => {
  const localize=useLocale();
  const[open,setOpen]=useState(false);
  const[data,setData]=useState<IUser[]>([]);
  const[pageNumber,setPageNumber]=useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const[searchText,setSearchText]=useState<string>();
  const { mutateAsync: getPostUser} = usepostUser();
    const { mutateAsync: getUserfilter } = useGetUserfilter();
    const { control, handleSubmit, reset } = useForm({
      defaultValues: initialValues,
    });
  async function getData(){
    const data = await getUserfilter({
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchText:searchText,
    });
    if (data && data.data){
      setData(data.data.data);
    }
  }
   const submitUser= async (data: IUser) => {
     const response = await getPostUser(data);

     if (response.status == 200) {
       alert("success");
       setOpen(false);
       reset(initialValues);
     }
   };
  useEffect(()=>{
    getData();
  },[pageNumber,pageSize,searchText])
   const handleCancel = () => {
     setOpen(false);
     reset(initialValues);
   };
  const cols: DataTable<IUser>[] = [
    {
      dataKey: "role",
      label: localize("role"),
    },
    {
      dataKey: "fullName",
      label: localize("full_name"),
    },
    {
      dataKey: "email",
      label: localize("email"),
    },
    {
      dataKey: "userName",
      label: localize("user_name"),
    },
    {
      dataKey: "phone",
      label: localize("phone"),
    },
  ];
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
        onAddButtonClick={() => setOpen(true)}
      />
      <Drawer title={localize("add_user")} isOpen={open} setIsOpen={setOpen}>
        <form onSubmit={handleSubmit(submitUser)}>
          <Input
            control={control}
            name={"fullName"}
            label={localize("full_name")}
          />
          <Input
            control={control}
            name={"userName"}
            label={localize("user_name")}
          />
          <Input control={control} name={"email"} label={localize("email")} />
          <Input control={control} name={"phone"} label={localize("phone")} />
          <Select
            control={control}
            name={"role"}
            label={localize("role")}
            options={[
              { label: localize("admin"), value: "Admin" },
              { label: localize("user"), value: "User" },
              { label: localize("system"), value: "System" },
            ]}
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </>
  );
};

export default User;
