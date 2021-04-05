import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchFieldComponent as SearchField } from "./index";

describe("SearchField", () => {
  const initialText = "1 + 2 = ";
  const delay = 100;
  const mockFn = jest.fn();
  const props = {
    initialText,
    delay,
    onInputCompleted: mockFn,
  };

  it("fires change handler with updated text", (done) => {
    const { getByRole } = render(<SearchField {...props} />);
    const textbox = getByRole("textbox");
    expect(textbox.value).toBe(initialText);
    userEvent.type(textbox, "3");
    setTimeout(() => {
      expect(mockFn).toBeCalledWith(initialText + "3");
      done();
    }, delay);
  });
});
