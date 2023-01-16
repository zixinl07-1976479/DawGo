import React from "react";
import { Link } from "react-router-dom";

/**
 * @param props.data: items information in the realtime database
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 */
export function Card(props) {
  const showButtons = (show) => {
    if (show) {
      return (
        <div>
          <br />
          <button
            onClick={() =>
              props.handleSavedItemsChange(
                props.data.itemId,
                "add",
                props.handleAlertChange
              )
            }
            className="btn cart px-auto"
          >
            - SAVE ITEM -
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const getImage = () => {
    if (props.data.imgUrls) {
      return props.data.imgUrls[0];
    } else {
      return "./img/missing_image.jpg";
    }
  };

  return (
    <div className="col col-xs-12 col-sm-6 col-lg-6 col-xl-auto">
      <div className="card">
        <img
          className="img-thumbnail"
          src={getImage()}
          alt={"a picture of " + props.data.title}
          width="auto"
          height="auto"
        />
        <div className="card-body text-center mx-auto">
          <div className="cvp">
            <p className="card-title font-weight-bold">
              {props.data.title}
            </p>
            <p className="card-text">{"$" + props.data.price}</p>
            <Link
              to={"/detail/" + props.data.itemId}
              id="btn"
              className="btn details px-auto"
            >
              <nobr>VIEW DETAILS</nobr>
            </Link>
            {showButtons(props.showButtons)}
          </div>
        </div>
      </div>
    </div>
  );
}
