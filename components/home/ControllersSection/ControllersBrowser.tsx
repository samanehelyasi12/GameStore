"use client";

import { useState } from "react";
import ControllerCard from "./ControllerCard";
import {
  CONTROLLER_TABS,
  CONTROLLER_PRODUCTS,
  type ControllerPlatform,
} from "./controllers-data";
import { cx } from "@/components/layout/Navbar/navbar-styles";

const tab = cx(
  "rounded-full px-4 py-1.5 text-sm font-bold",
  "transition-colors duration-base ease-standard",
);

/**
 * Platform filter for the controllers list. Only the selected platform's
 * cards are rendered.
 */
export default function ControllersBrowser() {
  const [active, setActive] = useState<ControllerPlatform>("ps5");

  const list = CONTROLLER_PRODUCTS[active];

  return (
    <div className="flex flex-col gap-6">
      {/* دکمه‌های پلتفرم */}
      <div className="flex flex-wrap items-center gap-2 rounded-full border border-border-subtle bg-surface p-1 w-fit">
        {CONTROLLER_TABS.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              aria-pressed={isActive}
              className={cx(
                tab,
                isActive
                  ? "bg-red-500 text-text-inverse"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-text-tertiary">
        {list.length} دسته در این پلتفرم
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((product) => (
          <ControllerCard key={product.id} product={{ ...product, href: "" }} layout="grid" />
        ))}
      </div>
    </div>
  );
}
