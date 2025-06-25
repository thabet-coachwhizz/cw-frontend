'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { RankedItem } from '@/types/assessments';
import { Check, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface TopSelectionListProps {
  items: RankedItem[];
  onFinishSelection: (selected: number[]) => void;
  maxItems?: number;
  title?: string;
  description?: string;
}

/**
 * TopSelectionList
 *
 * Allows the user to select a limited number of items (e.g. top 10).
 * Used in Core Values and Career Passions assessments before sorting.
 */
export function TopSelectionList({
  items,
  onFinishSelection,
  maxItems = 10,
  title = 'Select your top items',
}: TopSelectionListProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : prev.length < maxItems
          ? [...prev, id]
          : prev,
    );
  };

  const isSelected = (id: number) => selected.includes(id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xl">
        <h2 className="font-semibold">{title}</h2>
        <span className="text-[#72747A]"> {selected.length} Selected</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`cursor-pointer p-4 rounded-xl transition border-2 ${
              isSelected(item.id)
                ? 'border-[#08B1C7] bg-[#292A38]'
                : 'border-[#333546] bg-[#333546] hover:border-[#08B1C7] hover:bg-[#292A38] opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold mb-1 flex-1">{item.title}</h3>
              <div
                className={clsx(
                  'border-2  h-[18px] w-[18px] rounded-sm flex justify-center items-center',
                  {
                    'bg-[#08B1C7] border-[#08B1C7]': isSelected(item.id),
                    'border-[#B5B9BE]': !isSelected(item.id),
                  },
                )}
              >
                {isSelected(item.id) && <Check width={11} strokeWidth={6} />}
              </div>
            </div>
            {item.description && <p className="text-sm ">{item.description}</p>}
          </div>
        ))}
      </div>

      <div className="pt-6 text-right">
        <Button
          onClick={() => onFinishSelection(selected)}
          disabled={selected.length !== maxItems}
          className={`px-6 ${selected.length !== maxItems ? 'bg-white text-[#B5B9BE]!' : ''}`}
        >
          {selected.length < maxItems ? (
            `Select ${maxItems - selected.length} more`
          ) : (
            <div className="flex items-center ">
              Continue <ArrowRight width={20} className="ml-1" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
