// components/TestimonialCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
}

export function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <Quote className="h-6 w-6 text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
          {quote}
        </p>
        <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-gray-50">{author}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Verified Buyer</p>
      </CardContent>
    </Card>
  );
}