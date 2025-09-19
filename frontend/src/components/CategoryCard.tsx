// components/CategoryCard.tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  label: string;
  emoji: string;
  href: string;
}

export function CategoryCard({ label, emoji, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6 text-center hover:bg-gray-50 transition-colors duration-200">
        <div className="text-4xl">{emoji}</div>
        <div className="mt-4 text-lg font-semibold">{label}</div>
      </Card>
    </Link>
  );
}