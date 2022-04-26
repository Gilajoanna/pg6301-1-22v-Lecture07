import * as React from "react";
import * as ReactDOM from "react-dom";

import { AddNewMovie, MovieApiContext } from "../application.jsx";
import { act, Simulate } from "react-dom/test-utils";

describe("add movie component", () => {
  it("shows movies form", async () => {
    const element = document.createElement("div");
    await act(async () => ReactDOM.render(<AddNewMovie />, element));
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label")).map((e) => e.innerHTML)
    ).toEqual(["Title:", "Year:", "Country:", "Plot:"]);
  });

  it("adds movie on submit", async () => {
    const createMovie = jest.fn();
    const title = "Test Movie";
    const element = document.createElement("div");
    await act(async () =>
      ReactDOM.render(
        <MovieApiContext.Provider value={{ createMovie }}>
          {" "}
          <AddNewMovie />{" "}
        </MovieApiContext.Provider>,
        element
      )
    );
    Simulate.change(element.querySelector("form input:nth-of-type(1)"), {
      target: { value: "Test" },
    });
    Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
      target: { value: "2022" },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createMovie).toBeCalledWith({
      title: "Test",
      year: "2022",
      plot: "",
      country: "",
    });
  });
});
