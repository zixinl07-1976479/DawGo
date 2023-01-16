import React from "react";

/**
 * @param props.data: items information in the realtime database
 * @param props.selectedCategories: the categories that user selected
 * @param props.handleSelectCategories: the function to set the selected categories
 */
export default function Categories(props) {
  const selectedCategories = props.selectedCategories;
  const categories = props.data.map((data) => {
    if (selectedCategories && selectedCategories.includes(data.name)) {
      return (
        <button
          key={data.name}
          className="col-auto col-lg-12 col-xl-6 categories"
        >
          <div
            className="card card_categories selected_category"
            onClick={(event) => props.handleSelectCategories(event)}
          >
            <img
              className="card-img-top"
              src={data.src}
              alt={"a picture of " + data.name}
            />
            <div className="card-body">
              <p className="card-text">{data.name}</p>
            </div>
          </div>
        </button>
      );
    } else {
      return (
        <button
          key={data.name}
          className="col-auto col-lg-12 col-xl-6 categories"
          onClick={(event) => props.handleSelectCategories(event)}
        >
          <div className="card card_categories">
            <img
              key={data.name}
              className="card-img-top"
              src={data.src}
              alt={"a picture of " + data.name}
            />
            <div className="card-body">
              <p className="card-text">{data.name}</p>
            </div>
          </div>
        </button>
      );
    }
  });

  return (
    <div>
      <div className="row">
        <p className="titleCat">Categories</p>
      </div>

      <div className="category row justify-content-left">{categories}</div>
    </div>
  );
}
