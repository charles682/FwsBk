"use client"

import { Product } from "@prisma/client";
import { createContext, useState, ReactNode }from "react";

interface CartProduct extends Product  {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false, //por padrao o carrinho vai estar fechado
    products: [],
    toggleCart: () => {}, // funcao vazia

});

export const CartProvider = ({children}: {children: ReactNode}) => {
    //useState para controlar o estado do carrinho
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () =>{
        setIsOpen(prev => !prev)
    }
    return(
        <CartContext.Provider
        value={{
            isOpen,
            products,
            toggleCart,
        }}>
            {children}
         </CartContext.Provider>
    );
};