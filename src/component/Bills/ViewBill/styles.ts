import styled from "@emotion/styled";
import { DataTable as DT } from "primereact/datatable";
const fontSizeForDetails = "0.7rem";
export const Container = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  font-size: 0.9rem;
  color: #000;
  .p-component,
  .p-divider-content,
  .pi {
    font-size: 0.85rem;
    margin: 0.05rem;
    padding: 0.05rem;
  }
  .p-divider.p-divider-horizontal:before {
    border-top: 1px solid #000;
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
  td,
  th {
    font-size: ${fontSizeForDetails};
  }
  .p-datatable-tbody > tr > td,
  .p-datatable-thead > tr > th {
    border: 1px solid #000;
    color: #000;
  }
`;

export const BorderTable = styled(Table)`
  width: 100%;
  div > div {
    font-size: ${fontSizeForDetails};
    border: 1px solid #000;
    padding: 3px;
  }
  border-collapse: collapse;
`;
