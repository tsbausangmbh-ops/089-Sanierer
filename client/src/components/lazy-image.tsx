import { useState, useRef, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  sizes?: string;
}

export function LazyImage({ src, alt, className = "", width, height, sizes }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
