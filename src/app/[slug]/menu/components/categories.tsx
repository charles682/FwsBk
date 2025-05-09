'use client'
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from './products';

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
     include: { 
      menuCategories: {
         include: { products: true } 
        } } }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {products:true}
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };
  const getCategoryProducts = (category: MenuCategoriesWithProducts) => {
   return  selectedCategory.id === category.id ? "default" : "secondary";
  }
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl  bg-white ">
     <div className="p-5">
     <div className="flex items-center gap-3">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={45}
          height={45}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <p className="text-xs opacity-55">{restaurant.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
        <ClockIcon size={12} />
        <p>Aberto!</p>
      </div>
     </div>

        <ScrollArea className="w-full">
          <div className="flex w-max space-x-4 p-0 pt-4 ">
            {restaurant.menuCategories.map((category) => (
              <Button
              onClick={() => handleCategoryClick(category)}
                variant={getCategoryProducts(category)}
                key={category.id}
                size="sm"
                className="rounded-full "
              >
                {category.name}
              </Button>
            ))}

          </div>
          <ScrollBar orientation="horizontal" />
          
        </ScrollArea>
        <h3 className="px-5 pt-2 semi-bold">{selectedCategory.name}</h3>
        <Products
          products={selectedCategory.products}  
        />
               
    </div>
  );
};

export default RestaurantCategories;
