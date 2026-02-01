/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMotionValue } from "framer-motion";
import React, { Children, cloneElement } from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  height?: number;
  space?: number;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
};

function DockItem({ children, className = "", onClick, isActive = false }: DockItemProps) {
  const isHovered = useMotionValue(0);

  return (
    <div
      onMouseEnter={() => isHovered.set(1)}
      onMouseLeave={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center gap-1 cursor-pointer ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement<any>, { isHovered, isActive })
      )}
    </div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
};

function DockLabel({ children, className = "", ...rest }: DockLabelProps) {
  const { isActive } = rest as { isActive?: boolean };
  return (
    <div className={`${className} text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${
      isActive ? 'text-blue-500 dark:text-blue-400 font-semibold' : 'text-gray-700 dark:text-gray-300'
    }`}>
      {children}
    </div>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
};

function DockIcon({ children, className = "", ...rest }: DockIconProps) {
  const { isActive } = rest as { isActive?: boolean };

  return (
    <div className={`flex items-center justify-center transition-colors duration-200 ${
      isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
    } ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({ items, className = "", height = 64, space = 4 }: DockProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-white">
      <div
        className={`${className} w-full flex items-end justify-center gap-${space} bg-white/80 dark:bg-[#161616] border-t-2 border-gray-200 dark:border-gray-700 shadow-2xl pb-2 px-4`}
        style={{ height: `${height}px` }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem key={index} onClick={item.onClick} className={item.className} isActive={item.isActive}>
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
