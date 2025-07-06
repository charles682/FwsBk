"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (product: string) => void;
  increaseProductQuantity: (product: string) => void;
  removeProduct: (product: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false, //por padrao o carrinho vai estar fechado
  products: [],
  total: 0, // valor total do carrinho
  totalQuantity: 0,
  toggleCart: () => {}, // funcao vazia
  addProduct: () => {}, // funcao vazia
  decreaseProductQuantity: () => {}, // funcao vazia
  increaseProductQuantity: () => {}, // funcao vazia
  removeProduct: () => {}, // funcao vazia
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  //useState para controlar o estado do carrinho
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
    //verifica se o carrinho esta aberto ou fechado
    //se estiver aberto, fecha o carrinho
  };

  const addProduct = (product: CartProduct) => {
    //verifica se o produto ja esta no carrinho
    //se sim, atualiza a quantidade
    //se nao, adiciona o produtoho ao carrin
    const productsIsAlreadyOnTheCart = products.some(
      (prevProducts) => prevProducts.id === product.id,
    );

    if (!productsIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };
  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };
  const removeProduct = (productId: string) => {
    //remove o produto do carrinho
    //filtra o produto que tem o id igual ao id do produto que queremos remover
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
