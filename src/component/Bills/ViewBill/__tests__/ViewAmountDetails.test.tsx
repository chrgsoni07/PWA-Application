import { render } from "@testing-library/react";
import { BillDetails } from "component/Bills/types";
import ViewAmountDetails from "../ViewAmountDetails";

const { asFragment: f } = render(
  <ViewAmountDetails billDetail={{} as BillDetails} />
);
const base = f();
it.each`
  billDetail
  ${null}
  ${{}}
`("should match snapshot for empty $billDetail", ({ billDetail }) => {
  const { asFragment } = render(<ViewAmountDetails billDetail={billDetail} />);
  expect(asFragment()).toMatchSnapshot();
});

it.each`
  billDetail
  ${{ newTotal: 10, paid: 5, due: 5 }}
  ${{ oldTotal: 10, paid: 5, due: 5 }}
  ${{ newTotal: 10, oldTotal: 10, oldNewDifference: 0, paid: 5, due: 5 }}
`("should match snapshot for $billDetail", ({ billDetail }) => {
  const { asFragment } = render(<ViewAmountDetails billDetail={billDetail} />);
  expect(base).toMatchDiffSnapshot(asFragment());
});
