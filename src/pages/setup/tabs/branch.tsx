import { Badge, Button } from "@fluentui/react-components";
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { IBranch } from "../../../models/setup/branch/branch";
import {
  useGetBranchfilter,
  usePostBranch,
} from "../../../services/setup/service-branch";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllUnits } from "../../../services/setup/service-unit";
import { IUnit } from "../../../models/setup/unit/unit";
import Drawer from "../../../components/drawer/Drawer";
import Input from "../../../components/form/Input";
import { useForm } from "react-hook-form";
import Checkbox from "../../../components/form/Checkbox";
import Select from "../../../components/form/Select";

const initialValues: IBranch = {
  id: 0,
  orgUnitId: 0,
  branchName: "",
  branchCode: "",
  address: "",
  contactNumber: "",
  isActive: true,
};
const Branch = () => {
  const localize = useLocale();
  const [data, setData] = useState<IBranch[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getBranchFilter } = useGetBranchfilter();
  const { mutateAsync: postBranch } = usePostBranch();
  const { data: unitData } = useGetAllUnits();
  const [open, setOpen] = useState<boolean>(false);

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

  const unitSelectOptions = unitData?.data?.map((item) => {
    return {
      label: item.unitName,
      value: item.id,
    };
  });

  const submitHandler = async (data: IBranch) => {
    const response = await postBranch(data);

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

  const cols: DataTable<IBranch>[] = [
    {
      dataKey: "branchCode",
      label: localize("branch_code"),
    },
    {
      dataKey: "branchName",
      label: localize("branch_name"),
    },
    {
      dataKey: "orgUnitId",
      label: localize("unit_name"),
      render: (item: IBranch) => {
        return (
          <>
            {
              unitData?.data?.find((unit: IUnit) => unit.id == item.orgUnitId)
                ?.unitName
            }
          </>
        );
      },
    },
    {
      dataKey: "address",
      label: localize("address"),
    },
    {
      dataKey: "contactNumber",
      label: localize("contact_number"),
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
  ]
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

      <Drawer title={localize("add_branch")} isOpen={open} setIsOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="branchName"
            control={control}
            label={localize("branch_name")}
            required
          ></Input>
          <Input
            name="branchCode"
            control={control}
            label={localize("branch_code")}
            required
          ></Input>
          <Input
            name="address"
            control={control}
            label={localize("address")}
            required
          ></Input>
          <Select
            control={control}
            name="orgUnitId"
            label={localize("unit_name")}
            options={unitSelectOptions || []}
            placeholder={"Select Units"}
          />
          <Input
            name="contactNumber"
            control={control}
            label={localize("contact_number")}
            required
          ></Input>
          <Checkbox
            name="isActive"
            control={control}
            label={localize("status")}
            required
          ></Checkbox>
          <Button type="submit">{localize("add")}</Button>
          <Button onClick={handleCancel}>{localize("cancel")}</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default Branch;
