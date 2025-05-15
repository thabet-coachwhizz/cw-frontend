'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { RankedItem } from '@/types/assessments';

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
  description = `Click to select. You must choose exactly ${maxItems}.`,
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
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`cursor-pointer p-4 border rounded-xl transition ${
              isSelected(item.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <h3 className="font-semibold">{item.title}</h3>
            {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Button onClick={() => onFinishSelection(selected)} disabled={selected.length !== maxItems}>
          Continue
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Selected: {selected.length} / {maxItems}
        </p>
      </div>
    </div>
  );
}
