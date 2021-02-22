import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addProductToCard } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get("products").then((response) => {
      setCatalog(response.data);
    });
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCard(product));
  }, []);

  return (
    <main>
      <h1>Catalog</h1>
      {catalog.map((product) => (
        <article key={product.id}>
          <strong>{product.title}</strong> {" - "}
          <span>{product.price}</span> {"  "}
          <button onClick={() => handleAddProductToCart(product)} type="button">
            Comprar
          </button>
        </article>
      ))}
    </main>
  );
};

export default Catalog;
