import React from "react";

const categoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form action="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          className="form-control my-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter Category"
        />
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
    </>
  );
};

export default categoryForm;
