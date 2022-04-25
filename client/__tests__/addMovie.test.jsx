import * as React from "react";
import * as ReactDOM from "react-dom";

import { AddNewMovie } from "../addMovie";

describe("add movie component", () => {
  it("shows movies form", () => {
    const element = document.createElement("div");
    ReactDOM.render(<AddNewMovie />, element);
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(["Title:", "Year:", "Country:", "Plot:"]);
  });
});
