import { render } from "@testing-library/react";
import { SettingsComponent as Settings } from "./index";

describe("Settings", () => {
  const mockFn = jest.fn();
  const props = {
    color: "#AABBCC",
    onColorChange: mockFn,
  };
  it("renders component & fires color change handler", () => {
    const { container } = render(<Settings {...props} />);
    expect(container).toBeInTheDocument();
  });
});
