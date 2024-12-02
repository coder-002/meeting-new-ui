import { Badge, Button } from "@fluentui/react-components";
import TableComp from "../../../../components/table/TableComp";
import { useEffect, useState } from "react";
import {
  useGetCommitteeFilter,
  usePostAllCommittee,
} from "../../../../services/setup/committee/service-committee";
import { ICommittee } from "../../../../models/setup/committee/committee";
import { useLocale } from "../../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../../components/table/table";
import { useGetAllBranches } from "../../../../services/setup/service-branch";
import { useGetAllUnits } from "../../../../services/setup/service-unit";
import { IUnit } from "../../../../models/setup/unit/unit";
import { IBranch } from "../../../../models/setup/branch/branch";
import Drawer from "../../../../components/drawer/Drawer";
import Input from "../../../../components/form/Input";
import Select from "../../../../components/form/Select";
import Textarea from "../../../../components/form/TextArea";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { ICommitteetype } from "../../../../models/setup/committee_type/committee_type";
import { useGetCommitteeType } from "../../../../services/setup/service-committeetype";

const initialValues: ICommittee = {
  id: 0,
  unitId: 0,
  rank: 0,
  branchId: 0,
  typeId: 0,
  committeeCode:"",
  committeeName:"",
  description: "",
  isActive: true,
  branchName:"",
  unitName:"",
};
const Committee = () => {
  const localize = useLocale();
  const [data, setData] = useState<ICommittee[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const [open,setOpen]=useState<boolean>(false);
  const {mutateAsync: postAllCommittee } = usePostAllCommittee();
  const { mutateAsync: getBranchFilter } = useGetCommitteeFilter();
  const { data: branchData } = useGetAllBranches();
  const { data: unitData } = useGetAllUnits();
   const { data: committeeType } = useGetCommitteeType();
  const { control, handleSubmit, reset } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  });
  async function getData() {
    const data = await getBranchFilter({
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
  const submitHandler = async (data: ICommittee) => {
    const response = await postAllCommittee(data);

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
 const selectCommitteeType =
   committeeType?.map((item: ICommitteetype) => {
     return { value: item.id, label: item.typeName};
   })||[];
   const selectBranch=
   branchData?.data?.map((item: IBranch) => {
     return { value: item.id, label: item.branchName };
   })||[];
  const selectUnit =
    unitData?.data.map((item: IUnit) => {
      return { value: item.id, label: item.unitName };
    }) || [];
 
  const cols: DataTable<ICommittee>[] = [
    { dataKey: "rank", label: localize("rank") },
    {
      dataKey: "unitName",
      label: localize("unit_name"),
      render: (item: ICommittee) => {
        return (
          <>
            {
              unitData?.data?.find((unit: IUnit) => unit.id == item.unitId)
                ?.unitName
            }
          </>
        );
      },
    },
    {
      dataKey: "branchName",
      label: localize("branch_name"),
      render: (item: ICommittee) => {
        return (
          <>
            {
              branchData?.data?.find(
                (unit: IBranch) => unit.id == item.branchId
              )?.branchName
            }
          </>
        );
      },
    },
    {
      dataKey: "typeId",
      label: localize("committee_type"),
      // render: (item: any) => {
      //   return (
      //     <>
      //       {committeeType?.find((type) => type?.id == item?.typeId)?.typeName}
      //     </>
      //   );
      // },
    },
    { dataKey: "committeeCode", label: localize("committee_code") },
    { dataKey: "committeeName", label: localize("committee_name") },
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
    { dataKey: "description", label: localize("description") },
  ];
  return (
    <div>
      <TableComp
        columns={cols}
        data={data || []}
        searchValue={searchText}
        currentPage={pageNumber}
        pageSize={pageSize}
        setCurrentPage={setPageNumber}
        setPageSize={setPageSize}
        setSearchValue={setSearchText}
        selectionMode="single"
        onAddButtonClick={() =>setOpen(true)}
      />
      <Drawer
        title={localize("add_committee")}
        isOpen={open}
        setIsOpen={setOpen}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="rank"
            control={control}
            label={localize("rank")}
            placeholder="enter the rank"
            
          />
          <Select
            name="unitId"
            control={control}
            label={localize("unit_name")}
            options={selectUnit}
            placeholder={localize("unit_name")}
            
          />
          <Select
            name="branchId"
            control={control}
            label={localize("branch_name")}
            options={selectBranch}
            placeholder={localize("branch_name")}
          />
          <Input
            name="committeeCode"
            control={control}
            label={localize("committee_code")}
            
          />
          <Input
            name="committeeName"
            control={control}
            label={localize("committee_name")}
          
          />
          <Select
            name="typeId"
            control={control}
            label={localize("committee_type")}
            options={selectCommitteeType}
            placeholder={localize("committee_type")}
          
          />
          <Textarea
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

export default Committee;
