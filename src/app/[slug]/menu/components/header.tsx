"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import {useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const {slug} = useParams<{slug: string}>();
  const router = useRouter();
  const handleBackClick = () => router.back();
  const handleOrderClick = () => router.push(`/${slug}/orders`);
  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick} // volta a pagina anterior
      >
        <ChevronLeft />
      </Button>
      <Image
        src={restaurant?.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrderClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
