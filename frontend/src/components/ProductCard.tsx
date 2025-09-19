// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  price: string;
  imageUrl: string;
  href: string;
}

export function ProductCard({ title, price, imageUrl, href }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <div className="relative w-full aspect-square">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">High-performance gear</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">{price}</span>
          <Link href={href} passHref>
            <Button size="sm">
              View Product
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}