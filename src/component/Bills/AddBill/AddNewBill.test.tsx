import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddNewBill } from "./AddNewBill";
import { Bill } from "../types";
import { ToastsProvider } from "toasts";

jest.mock("api");

let mockHideDialog = jest.fn();
const mockDate = new Date(2020, 10, 17);
const bill = {
  totalNew: "109,566",
  totalOld: "74,490",
  diff: "35,076",
  discount: "76",
  payable: "35,000",
  paid: "30000",
  due: "5,000",
  newItems: [
    {
      type: "सोना",
      name: "Haar",
      weight: "18.270",
      rate: "49500",
      makingCharges: "200",
      otherCharges: "",
      amount: "₹94,091",
    },
    {
      type: "चांदी",
      name: "Gola Payal",
      weight: "235",
      rate: "65000",
      makingCharges: "",
      otherCharges: "",
      amount: "₹15,275",
    },
    {
      type: "----",
      name: "Bicchi",
      weight: "",
      rate: "",
      makingCharges: "",
      otherCharges: "",
      fixedAmount: "200",
      amount: "₹200",
    },
  ],
  oldItems: [
    {
      type: "सोना",
      name: "Purana Haar",
      weight: "15.780",
      purity: "90",
      netWeight: "14.2",
      rate: "49500",
      amount: "₹70,290",
    },
    {
      type: "चांदी",
      name: "Purani Payjab",
      weight: "80",
      purity: "100",
      netWeight: "80",
      rate: "50000",
      amount: "₹4,000",
    },
    {
      type: "----",
      name: "Bicchi",
      weight: "",
      purity: "",
      netWeight: "",
      rate: "",
      fixedAmount: "200",
      amount: "₹200",
    },
  ],
};
describe("Add new bill component", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(mockDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("should add new items", async () => {
    await setup();
    bill.newItems.forEach((item, i) => addNewItemsRow(item, i + 1));
    //Add and remove new item
    addNewItemsRow(bill.newItems[1], bill.newItems.length + 1);
    deleteRow(bill.newItems.length + 1);
    userEvent.click(screen.getByRole("tab", { name: /old item/i }));
    bill.oldItems.forEach((item, i) => addOldItemsRow(item, i + 1));
    //Add and remove old item
    addOldItemsRow(bill.oldItems[1], bill.oldItems.length + 1);
    deleteRow(bill.oldItems.length + 1);

    expect(screen.getByLabelText("Total new")).toHaveValue(bill.totalNew);
    expect(screen.getByLabelText("Total old")).toHaveValue(bill.totalOld);
    expect(screen.getByLabelText("Old New Difference")).toHaveValue(bill.diff);
    userEvent.type(screen.getByLabelText("Discount"), bill.discount);
    expect(screen.getByLabelText("Amount payable")).toHaveValue(bill.payable);
    userEvent.type(screen.getByLabelText("Amount paid"), bill.paid);
    expect(screen.getByLabelText("Due")).toHaveValue(bill.due);
    userEvent.click(screen.getByRole("button", { name: /save/i }));
  });

  it("should show date auto filled", async () => {
    await setup();

    expect(screen.getByRole("textbox", { name: /invoice date/i })).toHaveValue(
      "17/11/2020"
    );
  });
});

const setup = async () => {
  const utils = render(
    <ToastsProvider>
      <AddNewBill
        displayDialog={true}
        hideDialog={mockHideDialog}
        bill={{} as Bill}
        setSavedBills={jest.fn()}
        setDraftBills={jest.fn()}
      />
    </ToastsProvider>
  );
  await waitFor(() => {
    expect(screen.getByLabelText("Select customer")).not.toBeDisabled();
  });
  userEvent.type(screen.getByLabelText("Select customer"), "ram");
  expect(screen.getByText("9009009000")).toBeInTheDocument();

  return utils;
};

const addNewItemsRow = (item: any, i: number) => {
  const cells = addRowAndGetCells(i);
  fillNewItemDetails(cells, item);
  saveRowAndVerifyAmount(cells, item.amount);
};

const addRowAndGetCells = (rowIndex: number) => {
  userEvent.click(screen.getByRole("button", { name: /addNewRow/i }));
  const row = screen.getAllByRole("row")[rowIndex];
  clickEditButton(row);
  return within(row).getAllByRole("cell");
};

const saveRowAndVerifyAmount = (cells: HTMLElement[], amount: string) => {
  saveRow(cells[7]);
  checkAmount(cells[6], amount);
};

const addOldItemsRow = (item: any, i: number) => {
  const cells = addRowAndGetCells(i);
  fillOldItemsDetails(cells, item);
  saveRowAndVerifyAmount(cells, item.amount);
};

const clickEditButton = (row: HTMLElement) => {
  userEvent.click(within(row).getAllByRole("button")[0]);
};

const fillNewItemDetails = (cells: HTMLElement[], item: any) => {
  selectType(cells[0], item.type);
  enterName(cells[1], item.name);
  if (item.type !== "----") {
    enterWeight(cells[2], item.weight);
    enterRate(cells[3], item.rate);
    enterMakingCharges(cells[4], item.makingCharges);
    enterOtherCharges(cells[5], item.otherCharges);
  }
  if (item.type === "----") {
    enterAmount(cells[6], item.fixedAmount);
  }
};

const enterAmount = (cell: HTMLElement, fixedAmount: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), fixedAmount);
};

const selectType = (cell: HTMLElement, type: string) => {
  userEvent.click(within(cell).getByRole("button"));
  userEvent.click(screen.getByLabelText(type));
};

const enterName = (cell: HTMLElement, name: string) => {
  userEvent.type(within(cell).getByRole("textbox"), name);
};
const enterWeight = (cell: HTMLElement, weight: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), weight);
};
const enterRate = (cell: HTMLElement, rate: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), rate);
};
const enterMakingCharges = (cell: HTMLElement, makingCharges: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), makingCharges);
};
const enterOtherCharges = (cell: HTMLElement, otherCharges: string) => {
  userEvent.type(within(cell).getByRole("spinbutton"), otherCharges);
};

const saveRow = (cell: HTMLElement) => {
  userEvent.click(within(cell).getAllByRole("button")[0]);
};

const fillOldItemsDetails = (cells: HTMLElement[], item: any) => {
  selectType(cells[0], item.type);
  enterName(cells[1], item.name);
  enterWeight(cells[2], item.weight);
  enterPurity(cells[3], item.purity);
  checkNetWeight(cells[4], item.netWeight);
  enterRate(cells[5], item.rate);
  if (item.type === "----") {
    enterAmount(cells[6], item.fixedAmount);
  }
};

const enterPurity = (cell: HTMLElement, purity: string) => {
  userEvent.clear(within(cell).getByRole("spinbutton"));
  userEvent.type(within(cell).getByRole("spinbutton"), purity);
};

const checkNetWeight = (cell: HTMLElement, netWeight: string) => {
  expect(within(cell).getByText(netWeight)).toBeInTheDocument();
};

const checkAmount = (cell: HTMLElement, amount: string) => {
  expect(within(cell).getByText(amount)).toBeInTheDocument();
};

const deleteRow = (rowIndex: number) => {
  const row = screen.getAllByRole("row")[rowIndex];
  const deleteCell = within(row).getAllByRole("cell")[8];
  userEvent.click(within(deleteCell).getByRole("button"));
};
