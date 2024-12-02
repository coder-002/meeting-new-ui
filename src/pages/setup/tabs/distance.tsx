import { useEffect, useState } from "react";
import { IDistance } from "../../../models/setup/distance/distance";
import { useGetDistanceFilter, usePostAllDistance } from "../../../services/setup/service-distance";
import TableComp from "../../../components/table/TableComp";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllBranches } from "../../../services/setup/service-branch";
import { IBranch } from "../../../models/setup/branch/branch";
import Select from "../../../components/form/Select";
import Drawer from "../../../components/drawer/Drawer";
import { useForm } from "react-hook-form";
import { Button } from "@fluentui/react-components";
import Input from "../../../components/form/Input";
const initialValues: IDistance = {
  fromBranchName:"",
  toBranchName:"",
  kiloMeter: 0,
  description: "",
};
const Distance = () => {
  const localize = useLocale();
  const[open,setOpen]=useState(false);
  const { mutateAsync:postAllDistance} = usePostAllDistance();
  const { mutateAsync: getDesignation } = useGetDistanceFilter();
  const { data: branchData } = useGetAllBranches();
  const [data, setData] = useState<IDistance[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const{control,handleSubmit,reset}=useForm({
    defaultValues:initialValues,
  })

   const submitHandler = async (data: IDistance) => {
     const response = await postAllDistance(data);

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
const selectBranch =
  branchData?.data?.map((item: IBranch) => {
    return { value: item.id, label: item.branchName }; 
  }) || [];


  async function getData() {
    const data = await getDesignation({
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

  const cols: DataTable<IDistance>[] = [
    {
      dataKey: "fromBranch",
      label: localize("from_branch"),
      render: (item: IDistance) => {
        return (
          <>
            {branchData &&
              branchData?.data?.find(
                (branch) => branch?.id === item?.fromBranch
              )?.branchName}
          </>
        );
      },
    },
    {
      dataKey: "toBranch",
      label: localize("to_branch"),
      render: (item: IDistance) => {
        return (
          <>
            {branchData &&
              branchData?.data?.find((branch) => branch?.id === item?.toBranch)
                ?.branchName}
          </>
        );
      },
    },
    { dataKey: "kiloMeter", label: localize("distance_inkm") },
    { dataKey: "description", label: localize("description") },
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
      <Drawer
        title={localize("add_distance")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            name="fromBranch"
            control={control}
            label={localize("from")}
            options={selectBranch||[]}
            placeholder={localize("from")}
          ></Select>
          <Select
            name="toBranch"
            control={control}
            label={localize("to")}
            options={selectBranch||[]}
            placeholder={localize("to")}
            required
          />
          <Input
            name="kiloMeter"
            control={control}
            label={localize("distance_inkm")}
            type="number"
            required
            min={0}
          />
          <Input
            name="description"
            control={control}
            label={localize("description")}
          />
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default Distance;
