import { Column, ColumnBodyType } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Bill } from "./types";

type Props = {
  draftBills: Bill[];
  actionBodyTemplate: ColumnBodyType;
};

const DraftBills = ({ draftBills, actionBodyTemplate }: Props) => {
  const dateTemplate = (rowData: any) => {
    var invoiceDate = new Date(rowData.invoiceDate);
    return invoiceDate.toLocaleDateString("en-IN");
  };

  return (
    <DataTable
      value={draftBills}
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
      <Column field="invoiceDate" header="Date" body={dateTemplate} />
      <Column field="customer.name" header="Customer" />
      <Column field="billDetail.amountPayable" header="Amount Payable" />
      <Column field="billDetail.paid" header="Paid" />
      <Column field="billDetail.due" header="Due" />
      <Column body={actionBodyTemplate} />
    </DataTable>
  );
};

export default DraftBills;
