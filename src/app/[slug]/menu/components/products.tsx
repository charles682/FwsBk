
import { Product } from "@prisma/client"
import  Image from 'next/image';
import Link from "next/Link"

interface ProductsProps {
    products: Product[];
}

const Products = ({products} : ProductsProps) => {
    return(
        <div className="space-y-3 px-5 py-3">
            {products.map(product => (
                <Link 
                 key={product.id}
                 href="/"
                 className="flex items-center justify-between border-b gap-10 py-3">
                    {/* ESQUERDA */}
                    <div >
                            <h3 className="text-sm font-medium">
                                {product.name}
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {product.description}
                                </p>
                                <p className="pt-3 text-sm semi-bold">
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(product.price)}
                                </p>
                            </h3>

                    </div>
                    {/* DIREITA */}
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />

                    </div>                
                </Link>
            ))}
        </div>
    );
}

export default Products;
