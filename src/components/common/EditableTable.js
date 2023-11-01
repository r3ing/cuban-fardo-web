import React from "react";
import { Button } from "react-bootstrap";
const short = require("short-uuid");

export function EditableTable({ products, func, setShowModal}) {
    const onChangeInput = (e, productId) => {
    const { name, value } = e.target;

    const editData = products.map((item) =>
      item.productId === productId && name ? { ...item, [name]: value } : item
    );

    func(editData);
  };

  const addProduct = () => {
    const newProduct = {
      productId: short.generate(),
    };
    const newData = [...products, newProduct];

    func(newData);
  };

  const addProductWithEnterKey = (k) => {
    if (k.key === "Enter") {
      addProduct();
    }
  };

  const deleteProduct = (row) => {
    if (
      window.confirm("Are you sure you want to delete this article?") === true
    ) {
      const filter = products.filter((e) => e.productId !== row);
      func(filter);
    }
  };

  return (
    <>
      <table
        style={{ fontSize: "11px" }}
        onKeyDown={(k) => {
          addProductWithEnterKey(k);
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "6%" }}>Qty</th>
            <th>Product</th>
            <th style={{ width: "2%" }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ productId, quantity, product }) => (
            <tr key={productId}>
              <td>
                <input
                  name="quantity"
                  value={quantity}
                  type="number"
                  onChange={(e) => onChangeInput(e, productId)}
                  placeholder="Qty"
                />
              </td>
              <td>
                <input
                  name="product"
                  value={product}
                  type="text"
                  onChange={(e) => onChangeInput(e, productId)}
                  placeholder="Type Producto"
                  className="form-control text-capitalize"
                />
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => deleteProduct(productId)}
                  disabled={false}
                  className="shadow-none"
                >
                  <i className="material-icons icon icon-blue">delete</i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 mb-4 table-header editable-header d-flex gap-2">
        <Button
          variant="outline-info"
          onClick={addProduct}
          className="custom-btn"
        >
          <i className="material-icons icon">library_add</i>
          Add Product
        </Button>
        <Button
          variant="outline-success"
          onClick={() => setShowModal(true)}
          className="custom-btn"
          disabled={products.length === 0}
        >
          <i className="material-icons icon">terminal</i>
          Shipment
        </Button>
      </div>
    </>
  );
}
