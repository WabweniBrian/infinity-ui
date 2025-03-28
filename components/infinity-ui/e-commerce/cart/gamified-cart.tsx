"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Gift,
  Trophy,
  Star,
  Zap,
  Crown,
  Target,
  X,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface GamifiedCartProps {
  products?: Product[];
  onClose?: () => void;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  threshold: number;
  achieved: boolean;
  progress: number;
}

interface LevelInfo {
  level: number;
  title: string;
  pointsRequired: number;
  benefits: string[];
}

const GamifiedCart = ({ products = [], onClose }: GamifiedCartProps) => {
  // Mock cart items using the provided products
  const [cartItems, setCartItems] = useState<CartItem[]>(
    products.slice(0, 3).map((product) => ({
      id: product.id,
      product,
      quantity: 1,
      selectedColor: product.colors?.[0]?.value,
      selectedSize: product.sizes?.[0],
    })),
  );

  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [activeReward, setActiveReward] = useState<Reward | null>(null);
  const [points, setPoints] = useState(350);
  const [level, setLevel] = useState(2);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax, 0);

  // Points earned from this order
  const pointsToEarn = Math.floor(total);

  // Rewards
  const rewards: Reward[] = useMemo(
    () => [
      {
        id: "first-order",
        title: "First Order",
        description: "Complete your first order",
        icon: Star,
        threshold: 1,
        achieved: true,
        progress: 100,
      },
      {
        id: "spend-100",
        title: "Big Spender",
        description: "Spend $100 in a single order",
        icon: Zap,
        threshold: 100,
        achieved: total >= 100,
        progress: Math.min(Math.floor((total / 100) * 100), 100),
      },
      {
        id: "items-5",
        title: "Collector",
        description: "Add 5 different items to your cart",
        icon: Trophy,
        threshold: 5,
        achieved: cartItems.length >= 5,
        progress: Math.min(Math.floor((cartItems.length / 5) * 100), 100),
      },
      {
        id: "loyalty",
        title: "Loyal Customer",
        description: "Earn 500 loyalty points",
        icon: Crown,
        threshold: 500,
        achieved: points + pointsToEarn >= 500,
        progress: Math.min(
          Math.floor(((points + pointsToEarn) / 500) * 100),
          100,
        ),
      },
    ],
    [cartItems.length, points, pointsToEarn, total],
  );

  // Levels
  const levels: LevelInfo[] = [
    {
      level: 1,
      title: "Bronze",
      pointsRequired: 0,
      benefits: ["Free shipping on orders over $50"],
    },
    {
      level: 2,
      title: "Silver",
      pointsRequired: 300,
      benefits: ["Free shipping on all orders", "5% discount on all products"],
    },
    {
      level: 3,
      title: "Gold",
      pointsRequired: 1000,
      benefits: [
        "Free shipping on all orders",
        "10% discount on all products",
        "Early access to new products",
      ],
    },
    {
      level: 4,
      title: "Platinum",
      pointsRequired: 2500,
      benefits: [
        "Free shipping on all orders",
        "15% discount on all products",
        "Early access to new products",
        "Dedicated customer support",
      ],
    },
  ];

  const currentLevel = levels.find((l) => l.level === level) || levels[0];
  const nextLevel = levels.find((l) => l.level === level + 1);

  // Progress to next level
  const pointsToNextLevel = nextLevel ? nextLevel.pointsRequired - points : 0;
  const progressToNextLevel = nextLevel
    ? Math.floor((points / nextLevel.pointsRequired) * 100)
    : 100;

  // Check if user will level up with this purchase
  const willLevelUp =
    nextLevel && points + pointsToEarn >= nextLevel.pointsRequired;

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

      // Check if any rewards were achieved
      const itemsReward = rewards.find((r) => r.id === "items-5");
      if (itemsReward && !itemsReward.achieved && cartItems.length + 1 >= 5) {
        setActiveReward(itemsReward);
        setShowRewardPopup(true);
      }
    }
  };

  // Check for newly achieved rewards
  useEffect(() => {
    // Check if big spender reward was achieved
    const spendReward = rewards.find((r) => r.id === "spend-100");
    if (spendReward && !spendReward.achieved && total >= 100) {
      setActiveReward(spendReward);
      setShowRewardPopup(true);
    }

    // Check if loyalty reward was achieved
    const loyaltyReward = rewards.find((r) => r.id === "loyalty");
    if (
      loyaltyReward &&
      !loyaltyReward.achieved &&
      points + pointsToEarn >= 500
    ) {
      setActiveReward(loyaltyReward);
      setShowRewardPopup(true);
    }
  }, [total, cartItems.length, rewards, points, pointsToEarn]);

  // Simulate checkout
  const handleCheckout = () => {
    // Add points
    const newPoints = points + pointsToEarn;
    setPoints(newPoints);

    // Check if user leveled up
    if (willLevelUp) {
      setLevel(level + 1);
      setShowLevelUpAnimation(true);
    }

    // Clear cart
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Your Cart
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {points} points
              </span>
            </div>
            <div className="flex items-center">
              <Crown className="mr-2 h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Level {level}: {currentLevel.title}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            {/* Level progress */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {currentLevel.title} Member
                  </h2>
                  {nextLevel && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {pointsToNextLevel} points until {nextLevel.title} level
                    </p>
                  )}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                  <span className="text-lg font-bold">{level}</span>
                </div>
              </div>

              {nextLevel && (
                <div className="mt-4">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                      style={{ width: `${progressToNextLevel}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{points} points</span>
                    <span>{nextLevel.pointsRequired} points</span>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Your benefits:
                </h3>
                <ul className="mt-2 space-y-1">
                  {currentLevel.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rewards */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Rewards & Achievements
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`relative rounded-lg border p-4 ${
                      reward.achieved
                        ? "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20"
                        : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          reward.achieved
                            ? "bg-amber-500 text-white"
                            : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <reward.icon className="h-5 w-5" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {reward.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {reward.description}
                        </p>
                      </div>
                      {reward.achieved && (
                        <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`absolute h-full rounded-full ${
                            reward.achieved ? "bg-green-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${reward.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                        {reward.progress}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart items */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {cartItems.length > 0 ? (
                <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6">
                      <div className="flex">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
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
                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                              <h3>{item.product.name}</h3>
                              <p className="ml-4">
                                {formatCurrency(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {item.product.category}
                            </p>

                            {(item.selectedColor || item.selectedSize) && (
                              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                {item.selectedColor && (
                                  <div className="flex items-center">
                                    <span>Color:</span>
                                    <span
                                      className="ml-1 inline-block h-3 w-3 rounded-full border border-gray-300 dark:border-gray-600"
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
                            <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded-l-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-sm text-gray-700 dark:text-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-r-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                  <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Add items to your cart to earn points and unlock rewards!
                  </p>
                  <button className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 space-y-8">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Subtotal
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </p>
                  </div>

                  {level >= 2 && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Member Discount (
                        {level === 2 ? "5%" : level === 3 ? "10%" : "15%"})
                      </p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        -
                        {formatCurrency(
                          subtotal *
                            (level === 2 ? 0.05 : level === 3 ? 0.1 : 0.15),
                        )}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Shipping
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {level >= 2 || subtotal >= 50
                        ? "Free"
                        : formatCurrency(10)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Taxes
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(tax)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Order total
                    </p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {formatCurrency(
                        total -
                          (level >= 2
                            ? subtotal *
                              (level === 2 ? 0.05 : level === 3 ? 0.1 : 0.15)
                            : 0),
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-md bg-indigo-50 p-4 dark:bg-indigo-900/20">
                  <div className="flex">
                    <Trophy className="h-5 w-5 text-indigo-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                        Points to earn
                      </h3>
                      <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-400">
                        You&apos;ll earn{" "}
                        <span className="font-bold">{pointsToEarn} points</span>{" "}
                        with this purchase!
                        {willLevelUp && (
                          <span className="block font-medium text-green-600 dark:text-green-400">
                            You&apos;ll level up to {nextLevel?.title}!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>

              {/* Daily challenges */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Daily Challenges
                  </h2>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                    2/3 completed
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Add 3 items to your cart
                      </span>
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      +15 points
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Share a product on social media
                      </span>
                    </div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      +10 points
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        <Target className="h-5 w-5" />
                      </div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Complete a purchase
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      +25 points
                    </span>
                  </div>
                </div>
              </div>

              {/* Redeem points */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Redeem Points
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex items-center">
                      <Gift className="h-6 w-6 text-indigo-500" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          $10 Discount
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Apply to your next order
                        </p>
                      </div>
                    </div>
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        points >= 200
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                      disabled={points < 200}
                    >
                      200 points
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex items-center">
                      <Gift className="h-6 w-6 text-indigo-500" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Free Shipping
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          On your next 3 orders
                        </p>
                      </div>
                    </div>
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        points >= 150
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                      disabled={points < 150}
                    >
                      150 points
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex items-center">
                      <Gift className="h-6 w-6 text-indigo-500" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Exclusive Product
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Unlock a limited edition item
                        </p>
                      </div>
                    </div>
                    <button
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        points >= 500
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                      disabled={points < 500}
                    >
                      500 points
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reward popup */}
      <AnimatePresence>
        {showRewardPopup && activeReward && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md rounded-lg bg-white p-8 text-center dark:bg-slate-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowRewardPopup(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <activeReward.icon className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                Achievement Unlocked!
              </h2>
              <p className="mt-2 text-lg font-medium text-amber-600 dark:text-amber-400">
                {activeReward.title}
              </p>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {activeReward.description}
              </p>

              <div className="mt-6 rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                <p className="text-amber-700 dark:text-amber-300">
                  +25 points added to your account!
                </p>
              </div>

              <button
                onClick={() => setShowRewardPopup(false)}
                className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level up animation */}
      <AnimatePresence>
        {showLevelUpAnimation && nextLevel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{
                scale: [0.9, 1.05, 1],
                opacity: 1,
                y: 0,
                transition: { duration: 0.6 },
              }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setShowLevelUpAnimation(false)}
                className="absolute right-4 top-4 text-white/70 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 1],
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.7 },
                }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
              >
                <Crown className="h-12 w-12 text-amber-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.6, duration: 0.4 },
                }}
              >
                <h2 className="mt-6 text-3xl font-bold">Level Up!</h2>
                <p className="mt-2 text-xl">
                  You&apos;ve reached {nextLevel.title} Level!
                </p>

                <div className="mt-6 rounded-md bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-medium">New benefits unlocked:</h3>
                  <ul className="mt-2 space-y-1 text-left">
                    {nextLevel.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: 0.8 + index * 0.1,
                            duration: 0.3,
                          },
                        }}
                        className="flex items-center"
                      >
                        <Check className="mr-2 h-5 w-5 text-green-400" />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setShowLevelUpAnimation(false)}
                  className="mt-6 w-full rounded-md bg-white px-4 py-3 font-medium text-indigo-600 hover:bg-white/90"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Check component for the list items
const Check = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default GamifiedCart;
