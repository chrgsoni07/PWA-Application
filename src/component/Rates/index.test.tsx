import { render } from "@testing-library/react";
import Rates from ".";

jest.mock("api");

describe("Rates", () => {
  it("should render", () => {
    render(<Rates />);
  });
});
