import styled from "@emotion/styled";
import { DataTable as DT } from "primereact/datatable";

const fontSizeForDetails = "0.75rem";
const tablePadding = "3px";
const color = "#000";
const tableBorder = `1px solid ${color}`;

export const Container = styled.div`
  padding: 10px;
  margin: 10px;
  border: ${tableBorder};
  font-size: 0.9rem;
  color: ${color};
  .p-component,
  .p-divider-content,
  .pi {
    font-size: 0.85rem;
    margin: 0rem;
    padding: 0rem;
  }
  .p-divider.p-divider-horizontal {
    &:before {
      border-top: ${tableBorder};
    }
    .p-divider-content {
      padding: 0rem;
    }
  }
`;

export const Name = styled.b`
  font-size: 1.5rem;
`;

export const Table = styled.div`
  display: table;
`;
export const Row = styled.div`
  display: table-row;
`;
export const Cell = styled.div`
  display: table-cell;
`;

export const DataTable = styled(DT)`
  .p-datatable-tbody,
  .p-datatable-thead {
    > tr {
      td,
      th {
        border: ${tableBorder};
        color: ${color};
        font-size: ${fontSizeForDetails};
        padding: ${tablePadding};
      }
    }
  }
`;

export const BorderTable = styled(Table)`
  width: 100%;
  div > div {
    font-size: ${fontSizeForDetails};
    border: ${tableBorder};
    padding: ${tablePadding};
  }
  border-collapse: collapse;
`;
