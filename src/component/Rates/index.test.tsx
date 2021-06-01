import { render, waitFor, screen } from "@testing-library/react";
import Rates from ".";

jest.mock("api");

describe("Rates", () => {
  it("should render", async () => {
    render(<Rates />);
    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
  });
});
