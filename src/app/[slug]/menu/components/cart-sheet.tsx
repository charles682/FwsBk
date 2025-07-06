import { useContext, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogISOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem product={product} key={product.id} /> // Aqui estamos passando o item como props para o CartItem
            ))}
          </div>
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            className="w-full"
            onClick={() => setFinishOrderDialogISOpen(true)}
          >
            Finalizar Pedido
          </Button>
        </div>
      </SheetContent>
      <FinishOrderDialog
        open={finishOrderDialogIsOpen}
        onOpenChange={setFinishOrderDialogISOpen}
      />
    </Sheet>
  );
};
export default CartSheet;

// CartSheet é um componente que representa a folha de carrinho de compras
// Ela exibe os produtos adicionados ao carrinho e o total
// de forma organizada, permitindo ao usuário finalizar o pedido
