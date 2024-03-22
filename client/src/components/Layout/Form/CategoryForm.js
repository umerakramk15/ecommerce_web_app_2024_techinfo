import React from "react";

function CategoryForm({ handleSubmit, setValue, value }) {
  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}

export default CategoryForm;
