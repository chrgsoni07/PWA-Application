import { Bill } from "./types";
import { Column, ColumnBodyType } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

type Props = {
  savedBills: Bill[];
  actionBodyTemplate: ColumnBodyType;
  dateBodyTemplate(rowData: any): string;
};

const PreviousBills = ({
  savedBills,
  actionBodyTemplate,
  dateBodyTemplate,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const dt = useRef<DataTable>(null);

  const onDateChange = (e: CalendarChangeParams) => {
    dt.current?.filter(e.value, "invoiceDate", "custom");
    setSelectedDate(e.value as any);
  };

  const filterDate = (value: any, filter: any) => {
    if (
      filter === undefined ||
      filter === null ||
      (typeof filter === "string" && filter.trim() === "")
    ) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return (
      value.toLocaleDateString("en-IN") === filter.toLocaleDateString("en-IN")
    );
  };

  const dateFilter = (
    <Calendar
      value={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/mm/yy"
      className="p-column-filter"
      placeholder="Search by date"
    />
  );
  return (
    <DataTable
      ref={dt}
      value={savedBills}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      selectionMode="single"
      dataKey="id"
      className="p-datatable-gridlines p-datatable-sm"
    >
      <Column
        field="id"
        header="Id"
        sortable
        body={(_: any, prop: any) => prop.rowIndex + 1}
      />
      <Column
        field="billNo"
        header="Bill No"
        data-testid="test"
        key="test3"
        filter
        sortable
        filterPlaceholder="Search by bill no"
      />
      <Column
        field="invoiceDate"
        header="Date"
        body={dateBodyTemplate}
        filter
        filterElement={dateFilter}
        filterFunction={filterDate}
      />
      <Column
        field="customer.name"
        header="Customer"
        filter
        sortable
        filterPlaceholder="Search by customer no"
      />
      <Column field="billDetail.amountPayable" header="Amount Payable" />
      <Column field="billDetail.paid" header="Paid" />
      <Column field="billDetail.due" header="Due" />
      <Column body={actionBodyTemplate} />
    </DataTable>
  );
};

export default PreviousBills;
