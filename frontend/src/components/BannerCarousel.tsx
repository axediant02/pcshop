"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export default function BannerCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const banners = [
    { src: "/banners/build1.jpg", alt: "Ultimate Gaming Build" },
    { src: "/banners/gpu-sale.jpg", alt: "GPU Sale – Up to 30% Off" },
    { src: "/banners/keyboard.jpg", alt: "Mechanical Keyboards" },
  ]

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        plugins={[autoplay.current]}
        className="w-full"
        onMouseEnter={autoplay.current.stop} // pause when hovered
        onMouseLeave={autoplay.current.reset} // resume when unhovered
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-full min-h-[70vh] md:min-h-[80vh]">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/35 via-indigo-500/25 to-transparent mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl [background:radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="h-9 w-9 rounded-full bg-white/80 backdrop-blur text-gray-900 hover:bg-white shadow" />
        <CarouselNext className="h-9 w-9 rounded-full bg-white/80 backdrop-blur text-gray-900 hover:bg-white shadow" />
      </Carousel>
    </div>
  )
}
