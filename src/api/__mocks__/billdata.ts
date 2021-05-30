import { Bill } from "component/Bills/types";

export const bills: Bill[] = [
  {
    billNo: 1,
    id: "testid",
    invoiceDate: new Date(1995, 11, 17),
    customer: {
      address: "andheri gali",
      id: "adharId",
      mobile: "2020202020",
      name: "Chaupat Raja",
      place: "Andhar nagri",
    },
    billDetail: {
      amountPayable: 35200,
      discount: 76,
      due: 5200,
      newTotal: 109566,
      oldNewDifference: 35276,
      oldTotal: 74290,
      paid: 30000,
    },
    newItems: [
      {
        type: "gold",
        item: "Haar",
        weight: 18.27,
        rate: 49500,
        makingCharges: 200,
        otherCharges: 0,
        amount: 94091,
      },
      {
        type: "silver",
        item: "Gola Payal",
        weight: 235,
        rate: 65000,
        makingCharges: 0,
        otherCharges: 0,
        amount: 15275,
      },
      {
        type: "silverPerPiece",
        item: "Bicchi",
        weight: 0,
        rate: 0,
        makingCharges: 0,
        otherCharges: 200,
        amount: 200,
      },
    ],
    oldItems: [
      {
        type: "gold",
        item: "Purana Haar",
        grossWeight: 15.78,
        purity: 90,
        netWeight: 14.2,
        rate: 49500,
        amount: 70290,
      },
      {
        type: "silver",
        item: "Purani Payjab",
        grossWeight: 80,
        purity: 100,
        netWeight: 80,
        rate: 50000,
        amount: 4000,
      },
    ],
  },
];
