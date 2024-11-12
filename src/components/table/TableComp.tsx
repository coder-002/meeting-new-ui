import {
  createTableColumn,
  Input,
  Label,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  useTableFeatures,
  useTableSelection,
} from "@fluentui/react-components";
import { ReactNode, useEffect, useState } from "react";
import { DataTableProps } from "./table";
import { debounce } from "lodash";
import Pagination from "./pagination";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
  },
  label: {
    fontWeight: "bold",
  },
});

const TableComp = <T extends object>(props: DataTableProps<T>) => {
  const styles = useStyles();
  const [cols, setCols] = useState<TableColumnDefinition<T>[]>([]);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const debouncedSearch =
    props.setSearchValue !== undefined
      ? debounce((value: string) => props.setSearchValue!(value), 1000)
      : undefined;

  const {
    getRows,
    selection: {
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow,
      isRowSelected,
    },
  } = useTableFeatures(
    {
      columns: cols,
      items: props.data,
    },
    [
      useTableSelection({
        selectionMode: props.selectionMode || "single",
      }),
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => {
        toggleRow(e, row.rowId);
        const updatedSelectedItems = selected
          ? selectedItems.filter((item) => item !== row.item)
          : [...selectedItems, row.item];

        setSelectedItems(updatedSelectedItems);

        if (props.onRowClick && props.selectionMode === "single") {
          props.onRowClick(row.item);
        }

        if (props.selectionMode === "multiselect" && props.onRowClick) {
          props.onRowClick(updatedSelectedItems);
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ("brand" as const) : ("none" as const),
    };
  });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = rows.slice(startIndex, startIndex + pageSize);

  const init = () => {
    const columns: TableColumnDefinition<T>[] = props.columns.map((x) =>
      createTableColumn<T>({
        columnId: x.dataKey.toString(),
        renderCell: (o) => (
          <TableCellLayout>
            {x.render ? x.render(o) : (o?.[x.dataKey] as ReactNode)}
          </TableCellLayout>
        ),
        renderHeaderCell: () => (
          <>{x.renderHeaderCell ? x.renderHeaderCell() : x.label}</>
        ),
      })
    );
    setCols(columns);
  };

  useEffect(() => {
    init();
  }, [props.columns]);

  return (
    <div className={styles.root}>
      <div>
        <Label className={styles.label}>Search</Label>
        <Input
          value={props.searchValue}
          onChange={({ target }) => {
            if (debouncedSearch) debouncedSearch(target.value);
          }}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableSelectionCell
              checked={
                allRowsSelected ? true : someRowsSelected ? "mixed" : false
              }
              onClick={toggleAllRows}
              checkboxIndicator={{ "aria-label": "Select all rows " }}
              invisible={props.selectionMode == "single" ? true : false}
            />
            {cols.map((column) => (
              <TableHeaderCell key={column.columnId}>
                <strong> {column.renderHeaderCell()}</strong>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map(
            ({ item, selected, onClick, onKeyDown, appearance }, index) => (
              <TableRow
                key={index}
                onClick={onClick}
                onKeyDown={onKeyDown}
                appearance={appearance}
              >
                <TableSelectionCell
                  checked={selected}
                  type={props.selectionMode == "single" ? "radio" : "checkbox"}
                />
                {cols.map((column) => (
                  <TableCell key={column.columnId}>
                    {column.renderCell(item)}
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div>
        <Pagination
          currentPage={currentPage}
          totalCount={props.data.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableComp;
