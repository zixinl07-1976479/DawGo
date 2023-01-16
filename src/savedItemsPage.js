import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * @param props.user: user object in the realtime database
 * @param props.allItems: item information in the realtime database
 * @param props.handleSavedItemsChange: the function to change the saved items
 * @param props.handleAlertChange: the function to set alert condition
 */
export default function SavedItemsPage(props) {
  const allItems = Object.keys(props.allItems).map(
    (key) => props.allItems[key]
  );
  let savedItems = allItems.filter((item) => {
    if (item.savedBy) {
      return item.savedBy.includes(props.user.uid);
    } else {
      return false;
    }
  });

  const initialSubtotals = {};
  if (savedItems) {
    savedItems.forEach(
      (item) => (initialSubtotals[item.itemId] = parseFloat(item.price))
    );
  }

  // subtotals is an object with {key=id (string), value=item subtotal (float)}
  const [subtotals, setSubtotals] = useState(initialSubtotals);

  function handleQuantityChange(event, id) {
    const newSubtotals = { ...subtotals };
    newSubtotals[id] =
      event.target.value *
      savedItems.filter((item) => item.itemId === id)[0].price;
    setSubtotals(newSubtotals);
  }

  function getSubtotal() {
    const values = Object.values(subtotals);
    if (values.length === 0) {
      return 0;
    } else {
      return Object.values(subtotals).reduce((a, b) => a + b);
    }
  }

  function handleDeleteFromCart(id) {
    const newSubtotals = { ...subtotals };
    newSubtotals[id] = 0;
    setSubtotals(newSubtotals);

    props.handleSavedItemsChange(
      id,
      "delete",
      props.handleAlertChange([1, "Delete"])
    );
  }

  function tableRow(item) {
    return (
      <tr key={item.itemId} className="savedItemsPage">
        <td data-th="product">
          <div className="row">
            <div className="col col-6 hidden-xs">
              <img
                src={item.imgUrls.slice(0, 1)}
                alt={"a picture of" + item.title}
                className="img-responsive"
              />
            </div>
            <div className="col col-6">
              <p className="nomargin product-name">{item.title}</p>
            </div>
          </div>
        </td>
        <td data-th="Price" className="text-center">
          {"$" + item.price}
        </td>
        <td data-th="Quantity">
          <input
            type="number"
            onChange={(event) => handleQuantityChange(event, item.itemId)}
            className="form-control text-center"
            defaultValue="1"
          ></input>
        </td>
        <td data-th="Subtotal" className="text-center">
          {"$" + subtotals[item.itemId]}
        </td>
        <td className="actions" data-th="">
          <Link to={"/detail/" + item.itemId} className="btn btn-success">
            <em className="bi bi-chat"></em>
          </Link>
        </td>
        <td className="actions" data-th="">
          <button
            onClick={() => {
              handleDeleteFromCart(item.itemId);
            }}
            className="btn btn-danger "
          >
            <em className="bi bi-trash"></em>
          </button>
        </td>
      </tr>
    );
  }

  let tableItems;
  if (savedItems) {
    tableItems = savedItems.map((item) => {
      return tableRow(item);
    });
  }

  return (
    <div className="container">
      <table
        id="shoppingCartPage"
        className="table table-hover table-condensed"
      >
        <thead>
          <tr>
            <th style={{ width: 35 + "%" }}>
              Product &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </th>
            <th style={{ width: 15 + "%" }} className="text-center">
              Price
            </th>
            <th style={{ width: 13 + "%" }} className="text-center">
              Quantity
            </th>
            <th style={{ width: 22 + "%" }} className="text-center">
              Subtotal
            </th>
            <th style={{ width: 5 + "%" }}></th>
            <th style={{ width: 10 + "%" }}></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
        <tfoot>
          <tr>
            <td>
              <Link to="/home" className="btn btn-warning">
                <em className="fa fa-angle-left"></em> Continue Shopping
              </Link>
            </td>
            <td colSpan="2" className="hidden-xs"></td>
            <td className="hidden-xs text-center">
              <strong>{"Total $" + getSubtotal()}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
