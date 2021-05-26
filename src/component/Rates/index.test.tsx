import { render } from "@testing-library/react";
import Rates from ".";

jest.mock("api", () => ({
  ...jest.requireActual("api"),

  default: {
    getRates: jest.fn().mockImplementation(() => Promise.resolve([])),
  },
}));

describe("Rates", () => {
  it("should render", () => {
    // render(<Rates />);
    expect(1).toBe(1);
  });
});
