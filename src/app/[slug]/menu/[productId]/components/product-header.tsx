"use client";
import { Product } from "@prisma/client";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import {useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const {slug} = useParams<{slug: string}>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${slug}/orders`);
  return (
    <div className="relative min-h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick} // volta a pagina anterior
      >
        <ChevronLeft />
      </Button>

      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="rounded-lg object-contain"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick} // navega para a pagina de pedidos
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
