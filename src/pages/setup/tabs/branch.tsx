import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from "@fluentui/react-components";
import TableComp from "../../../components/table/TableComp";
import { useEffect, useState } from "react";
import { IBranch } from "../../../models/setup/branch/branch";
import { useGetBranchfilter } from "../../../services/setup/service-branch";
import { useLocale } from "../../../contexts/LocaleContextProvider";
import { DataTable } from "../../../components/table/table";
import { useGetAllUnits } from "../../../services/setup/service-unit";
import { IUnit } from "../../../models/setup/unit/unit";
import { Dismiss24Regular } from "@fluentui/react-icons";

const Branch = () => {
  const localize = useLocale();
  const [data, setData] = useState<IBranch[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>();
  const { mutateAsync: getBranchFilter } = useGetBranchfilter();
  const { data: unitData } = useGetAllUnits();
  const [open, setOpen] = useState<boolean>(false);

  console.log(open);

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

      <Drawer open={open} onOpenChange={(_, { open }) => setOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export default Branch;
