import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/format";
import type { Database } from "@/lib/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  images: Database["public"]["Tables"]["product_images"]["Row"][];
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0]?.url || "/placeholder.png";

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="font-bold">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground">
            Stock: {product.stock_quantity}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}