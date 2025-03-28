"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Star,
  ChevronRight,
  ChevronLeft,
  Heart,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface CrossSellCartProps {
  products?: Product[];
  onClose?: () => void;
}

const CrossSellCart = ({ products = [], onClose }: CrossSellCartProps) => {
  // Mock cart items using the provided products
  const [cartItems, setCartItems] = useState<CartItem[]>(
    products.slice(0, 2).map((product) => ({
      id: product.id,
      product,
      quantity: 1,
      selectedColor: product.colors?.[0]?.value,
      selectedSize: product.sizes?.[0],
    })),
  );

  // Recommendations based on cart items
  const getRecommendedProducts = () => {
    // Filter out products already in cart
    const cartProductIds = cartItems.map((item) => item.product.id);
    const availableProducts = products.filter(
      (p) => !cartProductIds.includes(p.id),
    );

    // Get products from same categories as cart items
    const cartCategories = new Set(
      cartItems.map((item) => item.product.category),
    );
    const categoryRecommendations = availableProducts
      .filter((p) => cartCategories.has(p.category))
      .slice(0, 3);

    // Get some other products to fill up to 6 recommendations
    const otherRecommendations = availableProducts
      .filter((p) => !categoryRecommendations.map((r) => r.id).includes(p.id))
      .slice(0, 6 - categoryRecommendations.length);

    return [...categoryRecommendations, ...otherRecommendations];
  };

  const recommendedProducts = getRecommendedProducts();

  // Frequently bought together products
  const frequentlyBoughtTogether = products
    .filter((p) => !cartItems.map((item) => item.product.id).includes(p.id))
    .slice(0, 3);

  // Selected bundle items
  const [selectedBundleItems, setSelectedBundleItems] = useState<string[]>([]);

  // Recently viewed products
  const recentlyViewed = products.slice(3, 7);

  // Carousel state for recommendations
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerView = 3;
  const totalSlides = Math.ceil(recommendedProducts.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax, 0);

  // Handle quantity changes
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Add item to cart
  const addToCart = (product: Product) => {
    // Check if product is already in cart
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      // Increase quantity if already in cart
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      // Add new item
      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          product,
          quantity: 1,
          selectedColor: product.colors?.[0]?.value,
          selectedSize: product.sizes?.[0],
        },
      ]);
    }
  };

  // Toggle bundle item selection
  const toggleBundleItem = (productId: string) => {
    setSelectedBundleItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Add bundle to cart
  const addBundleToCart = () => {
    // Add selected bundle items to cart
    frequentlyBoughtTogether
      .filter((product) => selectedBundleItems.includes(product.id))
      .forEach((product) => {
        addToCart(product);
      });
  };

  // Calculate bundle price
  const calculateBundlePrice = () => {
    const bundleItems = frequentlyBoughtTogether.filter((p) =>
      selectedBundleItems.includes(p.id),
    );
    const bundleSubtotal = bundleItems.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    // Apply 10% discount for bundle
    return bundleSubtotal * 0.9;
  };

  const bundlePrice = calculateBundlePrice();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            Continue Shopping
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            {cartItems.length > 0 ? (
              <div className="space-y-8">
                {/* Cart items */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shopping Cart ({cartItems.length})
                  </h2>

                  <ul className="mt-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6">
                        <div className="flex">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={
                                item.product.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={item.product.name}
                              fill
                              className="object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.product.name}</h3>
                                <p className="ml-4">
                                  {formatCurrency(
                                    item.product.price * item.quantity,
                                  )}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.category}
                              </p>

                              {(item.selectedColor || item.selectedSize) && (
                                <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                  {item.selectedColor && (
                                    <div className="flex items-center">
                                      <span>Color:</span>
                                      <span
                                        className="ml-1 inline-block h-3 w-3 rounded-full border border-gray-300"
                                        style={{
                                          backgroundColor: item.selectedColor,
                                        }}
                                      />
                                    </div>
                                  )}
                                  {item.selectedSize && (
                                    <div>Size: {item.selectedSize}</div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 flex flex-1 items-end justify-between">
                              <div className="flex items-center rounded-md border border-gray-200">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="rounded-l-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="rounded-r-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="font-medium text-purple-600 hover:text-purple-500"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Frequently bought together */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">
                    Frequently Bought Together
                  </h2>

                  <div className="mt-6">
                    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                      {frequentlyBoughtTogether.map((product, index) => (
                        <div
                          key={product.id}
                          className="flex flex-1 flex-col items-center"
                        >
                          <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
                            <Image
                              src={
                                product.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={product.name}
                              fill
                              className="object-cover object-center"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedBundleItems.includes(
                                  product.id,
                                )}
                                onChange={() => toggleBundleItem(product.id)}
                                className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          <h3 className="mt-2 text-center text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-center text-sm font-medium text-gray-900">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {selectedBundleItems.length > 0 && (
                      <div className="mt-6 rounded-md bg-purple-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-800">
                              Bundle Price: {formatCurrency(bundlePrice)}
                            </p>
                            <p className="text-xs text-purple-700">
                              Save 10% when you buy these items together!
                            </p>
                          </div>
                          <button
                            onClick={addBundleToCart}
                            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
                          >
                            Add Bundle to Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommended products carousel */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      You May Also Like
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={prevSlide}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        disabled={currentSlide === 0}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        disabled={currentSlide === totalSlides - 1}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="relative mt-6 overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * (100 / slidesPerView) * slidesPerView}%)`,
                      }}
                    >
                      {recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="w-1/3 flex-shrink-0 px-2"
                        >
                          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                            <div className="relative h-40 w-full">
                              <Image
                                src={
                                  product.image ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={product.name}
                                fill
                                className="object-cover object-center"
                              />
                              <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500">
                                <Heart className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <div className="mt-1 flex items-center">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(product.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-1 text-xs text-gray-500">
                                  ({product.reviewCount})
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {formatCurrency(product.price)}
                                </p>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="rounded-full bg-purple-100 p-1.5 text-purple-600 transition-colors hover:bg-purple-200"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recently viewed */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">
                    Recently Viewed
                  </h2>

                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {recentlyViewed.map((product) => (
                      <div key={product.id} className="group relative">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={
                              product.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={product.name}
                            fill
                            className="object-cover object-center transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-2 line-clamp-1 text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </p>
                        <button
                          onClick={() => addToCart(product)}
                          className="mt-1 text-sm font-medium text-purple-600 hover:text-purple-500"
                        >
                          Add to cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looks like you haven&apos;t added any products to your cart
                  yet.
                </p>
                <button className="mt-6 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                  Browse Products
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 space-y-8">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(subtotal)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">Free</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Taxes</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(tax)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">
                      Order total
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full rounded-md bg-purple-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                    Proceed to Checkout
                  </button>
                </div>
              </div>

              {/* Customers also bought */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">
                  Customers Also Bought
                </h2>

                <div className="mt-6 space-y-4">
                  {products.slice(7, 10).map((product) => (
                    <div key={product.id} className="flex items-center">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={
                            product.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={product.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="ml-4 rounded-full bg-purple-100 p-1.5 text-purple-600 transition-colors hover:bg-purple-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon code */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-medium text-gray-900">
                  Have a coupon?
                </h2>

                <div className="mt-4 flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="block w-full rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  />
                  <button className="rounded-r-md border border-l-0 border-purple-600 bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSellCart;
