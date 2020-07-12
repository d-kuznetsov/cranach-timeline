import { mount } from "enzyme";
import { SearchFieldComponent as SearchField } from "./index";

describe("SearchField", () => {
  it("a", () => {
    const query = "query";
    const wrapper = mount(
      <SearchField initialText={query} onInputCompleted={() => {}} delay={50} />
    );
    return new Promise((reject) => {
      wrapper.setProps({ onInputCompleted: (text) => reject(text) });
      wrapper.find("input").simulate("change");
    }).then((text) => {
      expect(text).toBe(query);
    });
  });
});
