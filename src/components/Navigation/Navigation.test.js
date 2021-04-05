import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavigationComponent as Navigation, navItems } from "./index";

describe("Navigation", () => {
  const mockFn = jest.fn();
  const props = {
    items: navItems,
    link: navItems[0].link,
    onChange: mockFn,
  };

  it("renders first nav button with action-selected class", () => {
    const { getAllByRole } = render(<Navigation {...props} />);
    const buttons = getAllByRole("button");
    expect(buttons[0]).toHaveClass("action-selected");
  });

  it("fires navigation change handler", () => {
    const { getAllByRole } = render(<Navigation {...props} />);
    const buttons = getAllByRole("button");
    userEvent.click(buttons[1]);
    expect(mockFn).toBeCalled();
  });
});
