import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  const slug = useParams().slug as string;
  const searchParams = useSearchParams();
  const consumptionMethod = searchParams.get("consumptionMethod");
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          {/* ESQUERDA */}
          <div>
            <h3 className="text-sm font-medium">
              {product.name}
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <p className="semi-bold pt-3 text-sm">
                {formatCurrency(product.price)}
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
};

export default Products;
