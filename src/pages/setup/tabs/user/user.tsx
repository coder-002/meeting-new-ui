import { useEffect, useState } from "react";
import { DataTable } from "../../../../components/table/table";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import { IUser } from "../../../../models/setup/user/user";
import { useGetUserfilter } from "../../../../services/setup/service-user";

import { useGetAllUnits } from "../../../../services/setup/service-unit";
import TableComp from "../../../../components/table/TableComp";

const User= () => {
  const localize=useLocale();
  const[data,setData]=useState<IUser[]>([]);
  const[pageNumber,setPageNumber]=useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const[searchText,setSearchText]=useState<string>();
  const{data:unitData}=useGetAllUnits();
    const { mutateAsync: getUserfilter } = useGetUserfilter();
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
  useEffect(()=>{
    getData();
  },[pageNumber,pageSize,searchText])
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
  return(<>
  <TableComp
  columns={cols}
  data={data||[]}
  selectionMode="single"
  searchValue={searchText}
  currentPage={pageNumber}
  pageSize={pageSize}
  setCurrentPage={setPageNumber}
  setPageSize={setPageSize}
  setSearchValue={setSearchText}
  />
  </>)
};

export default User;
