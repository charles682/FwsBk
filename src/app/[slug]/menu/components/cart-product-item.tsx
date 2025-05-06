import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct } from "../contexts/cart";

interface CartItemProps {
    product: CartProduct;
}

const CarProductItem = ({product}: CartItemProps) => {
    return ( 
        <div className="flex items-center justify-between">

        {/* Esquerda */}
        <div className="flex items-center gap-3">
              <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                <Image src={product.imageUrl} alt={product.name} fill/>
            </div>
            <div className="space-y-1">
                <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                <p className="text-xs font-semibold">{formatCurrency(product.price)}</p>
                <div className="flex items-center gap-1 text-center">
                    <Button className="h-7 w-7" rounded-lg variant="outline">
                        <ChevronLeftIcon />
                    </Button>
                    <p className="w-7 text-xs">{product.quantity}</p>
                    <Button className="h-7 w-7"  rounded-lg variant="destructive">
                        <ChevronRightIcon />
                    </Button>
                 </div>
            </div>
        </div>
        {/* Direita */}
        <Button className="h-7 w-7" variant="outline">
            <TrashIcon />
        </Button>    

        </div>
        
    );
}
 
export default CarProductItem;