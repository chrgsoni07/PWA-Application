import { render, waitFor, screen } from "@testing-library/react";
import App from "App";
jest.mock("api");
describe("App", () => {
  it("should render", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryAllByRole("row")).toHaveLength(2);
    });
  });
});
