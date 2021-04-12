import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimelineComponent as Timeline } from "./index";

describe("Timeline", () => {
  const mockFn = jest.fn();
  const props = {
    period: [1500, 1510],
    items: [
      {
        categoryId: 1,
        involvedPersons: [{ name: "Cranach" }],
        titles: [{ title: "Wald" }],
        objectId: 123,
        dating: {
          dated: 1500,
          begin: 1500,
          end: 1505,
        },
        owner: "Düsseldorf",
        images: {
          sizes: {
            s: {
              dimensions: {
                width: 120,
                height: 100,
              },
              src: "",
            },
            xs: {
              dimensions: {
                width: 120,
                height: 100,
              },
              src: "",
            },
          },
        },
        locations: [{ term: "Düsseldorf" }],
      },
    ],
    lineHeight: 5,
    onLineClick: mockFn,
    colorPalette: {
      primary: {
        light: "#AAAAAA",
        main: "#BBBBBB",
        dark: "#CCCCCC",
      },
      secondyry: {
        light: "#AAAAAA",
        main: "#BBBBBB",
        dark: "#CCCCCC",
      },
    },
  };

  it("renders only one artwork line & fires line click handler", () => {
    const { container } = render(<Timeline {...props} />);
    const items = container.querySelectorAll(".item");
    expect(items.length).toBe(props.items.length);
    userEvent.click(items[0]);
    expect(mockFn).toBeCalled();
  });
});
