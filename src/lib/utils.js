import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  if (!price) return "Price not available";
  
  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(1)} Lakh`;
  } else {
    return `Rs. ${price.toLocaleString()}`;
  }
}
