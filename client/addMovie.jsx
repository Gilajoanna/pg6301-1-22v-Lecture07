import * as React from "react";
import { useState } from "react";
import { postJSON } from "./postJSON";

function FormInput({ label, value, onChangeValue }) {
  return (
    <div>
      <label>{label}</label>{" "}
      <input
        type={"text"}
        name={"title"}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export function AddNewMovie({ createMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState();
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    createMovie({ title });
    await postJSON("/api/movies/new", {
      title,
      year,
      countries: [country],
      plot,
    });
    setTitle("");
    setYear("");
    setPlot("");
    setCountry("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add new movie</h1>

        <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
        <FormInput label={"Year:"} value={year} onChangeValue={setYear} />
        <FormInput
          label={"Country:"}
          value={country}
          onChangeValue={setCountry}
        />
        <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
}
