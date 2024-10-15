import React from "react";
import { Button } from "react-bootstrap";
const short = require("short-uuid");

export function EditableTable({ products, func, setShowModal }) {
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
      quantity: 0,
      product: "",
    };

    const newData = [...products, newProduct];

    func(newData);
  };

  const addProductWithEnterKey = (k) => {
    if (k.key === "Enter") {
      addProduct();
    }
  };

  const checkProducts = () => {
    if (products.length === 0) return true;

    for (let obj of products) {
      for (let key in obj) {
        //if (obj.hasOwnProperty(key)) {
        if (
          obj[key] === null ||
          obj[key] === undefined ||
          obj[key] === "" ||
          obj[key] === 0 ||
          obj[key] === "0"
        ) {
          return true;
        }
        //}
      }
    }
    return false;
  };

  const deleteProduct = (row) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar este artículo?") ===
      true
    ) {
      const filter = products.filter((e) => e.productId !== row);
      func(filter);
    }
  };

  return (
    <>
      <table
        style={{ fontSize: "11px", border: "1px solid #f8a60980" }}
        onKeyDown={(k) => {
          addProductWithEnterKey(k);
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Qty</th>
            <th>Producto</th>
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
                  min={0}
                  onChange={(e) => onChangeInput(e, productId)}
                  placeholder="Qty"
                  className="form-control text-capitalize"
                />
              </td>
              <td>
                <input
                  name="product"
                  value={product.toUpperCase()}
                  type="text"
                  onChange={(e) => onChangeInput(e, productId)}
                  placeholder="Descripcion Producto"
                  className="form-control text-capitalize"
                />
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  onClick={() => deleteProduct(productId)}
                  disabled={!product}
                  className="shadow-none"
                >
                  <i className="material-icons icon icon-blue">delete</i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 mb-4  editable-header d-flex gap-2">
        <Button
          variant="outline-info"
          onClick={addProduct}
          className="custom-btn"
        >
          <i className="material-icons icon">library_add</i>
          Nuevo Producto
        </Button>
        <Button
          variant="outline-success"
          onClick={() => setShowModal(true)}
          className="custom-btn"
          disabled={checkProducts()}
        >
          <i className="material-icons icon">terminal</i>
          Generar Envío
        </Button>
      </div>
    </>
  );
}
