import { render } from "@testing-library/react";
import { HeadersByYearComponent as HeadersByYear } from "./index";

describe("HeadersByYear", () => {
  it("renders first year with fullItemStr class, if items number is less than 30", () => {
    const period = [1500, 1505];
    const { getByText } = render(<HeadersByYear period={period} />);
    expect(getByText(period[0])).toBeInTheDocument();
    expect(getByText(period[0])).toHaveClass("fullItemStr");
  });

  it("renders only odd years in short form without class fullItemStr, if items number is more than 30", () => {
    const period = [1500, 1531];
    const { getByText, queryByText } = render(<HeadersByYear period={period} />);
    const trimYear = function (year) {
      return year.toString().slice(2);
    };
    const firstYear = period[0];
    const secondYear = firstYear + 1;
    expect(getByText(trimYear(firstYear))).not.toHaveClass("fullItemStr");
    expect(queryByText(trimYear(secondYear))).toBeNull();
  });
});
