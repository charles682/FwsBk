"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode,useState }from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "pricel" | "imageUr"> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
    isOpen: false, //por padrao o carrinho vai estar fechado
    products: [],
    toggleCart: () => {}, // funcao vazia
    addProduct: () => {}, // funcao vazia

});

export const CartProvider = ({children}: {children: ReactNode}) => {
    //useState para controlar o estado do carrinho
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () =>{
        setIsOpen(prev => !prev)
    }

    const addProduct = (product: CartProduct) => {
        //verifica se o produto ja esta no carrinho
        //se sim, atualiza a quantidade
        //se nao, adiciona o produto ao carrinho
        const productsIsAlreadyOnTheCart = products.some(
            prevProducts => prevProducts.id === product.id);
        
        if(!productsIsAlreadyOnTheCart){
            return setProducts((prev) => [...prev, product]);
    };

    setProducts(prevProducts => {
        return prevProducts.map(prevProduct => {
            if(prevProduct.id === product.id){
                return {
                    ...prevProduct,
                    quantity: prevProduct.quantity + product.quantity,
                };
            }
            return prevProduct;
        });

    })
} ;
    return(
        <CartContext.Provider
        value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
        }}>
            {children}
         </CartContext.Provider>
    );
};
