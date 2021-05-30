import { Button, ButtonProps } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { Row } from "primereact/row";
import React, { FC } from "react";
import { itemType } from "../commonData";

export const DeleteButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-warning p-button-sm"
      onClick={onClick}
    />
  );
};

export const FooterAmount = ({ amount }: { amount: number }) => (
  <ColumnGroup>
    <Row>
      <Column
        footer="Totals:"
        colSpan={6}
        footerStyle={{ textAlign: "right" }}
      />
      <Column footer={amount} />
    </Row>
  </ColumnGroup>
);

export const ItemTypeEditor: FC<DropdownProps> = ({ onChange, value }) => {
  return (
    <Dropdown
      value={value}
      options={itemType}
      optionLabel="label"
      optionValue="value"
      onChange={onChange}
      style={{ width: "100%" }}
      placeholder="Select a item type"
      itemTemplate={(option) => {
        return <span>{option.label}</span>;
      }}
    />
  );
};
