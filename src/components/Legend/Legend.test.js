import { render, screen } from "@testing-library/react";
import { LegendComponent as Legend } from "./index";

describe("Legend", () => {
  const displayedCat = {
    id: 1,
    label: "paitings",
    mainColor: "#AABBCC",
    displayed: true,
  };
  const hiddenCat = {
    id: 2,
    label: "grafics",
    mainColor: "#DDEEFF",
    displayed: false,
  };
  const props = {
    categories: {
      [displayedCat.id]: displayedCat,
      [hiddenCat.id]: hiddenCat,
    },
    period: [1500, 1550],
    searchText: "Cranach",
    itemNumber: 70,
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

  it("renders label of displayed category and doesn't render label of hidden", () => {
    const { getByText, queryByText } = render(<Legend {...props} />);
    expect(getByText(displayedCat.label)).toBeInTheDocument();
    expect(queryByText(hiddenCat.label)).toBeNull();
  });

  it("render period, search text & items number", () => {
    const { getByText } = render(<Legend {...props} />);
    expect(getByText(new RegExp(props.period[0]))).toBeInTheDocument();
    expect(getByText(new RegExp(props.period[1]))).toBeInTheDocument();
    expect(getByText(new RegExp(props.itemNumber))).toBeInTheDocument();
    expect(getByText(props.searchText)).toBeInTheDocument();
  });
});
