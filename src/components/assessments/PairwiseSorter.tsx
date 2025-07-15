'use client';

import { useEffect, useState } from 'react';
import { RankedItem } from '@/types/assessments';
import Loader from '@/components/ui/Loader';

interface PairwiseSorterProps {
  items: RankedItem[];
  onSorted: (sorted: RankedItem[]) => void;
  title?: string;
}

/**
 * PairwiseSorter
 *
 * Sorts a list of items by asking the user to compare pairs.
 * Based on interactive merge sort: O(n log n) comparisons.
 */
export function PairwiseSorter({ items, onSorted, title }: PairwiseSorterProps) {
  const [rounds, setRounds] = useState<RankedItem[][]>(items.map((i) => [i]));
  const [left, setLeft] = useState<RankedItem[]>([]);
  const [right, setRight] = useState<RankedItem[]>([]);
  const [mergeResult, setMergeResult] = useState<RankedItem[]>([]);
  const [currentLeft, setCurrentLeft] = useState<RankedItem | null>(null);
  const [currentRight, setCurrentRight] = useState<RankedItem | null>(null);

  // 👇 Start new round when rounds are ready
  useEffect(() => {
    if (rounds.length <= 1) {
      onSorted(rounds[0] || []);
      return;
    }

    const nextRounds: RankedItem[][] = [];
    let started = false;

    for (let i = 0; i < rounds.length; i += 2) {
      const a = rounds[i];
      const b = rounds[i + 1];

      if (b) {
        nextRounds.push([...a, ...b]);

        if (!started) {
          setLeft([...a]);
          setRight([...b]);
          setMergeResult([]);
          started = true;
        }
      } else {
        nextRounds.push(a);
      }
    }
  }, [rounds, onSorted]);

  // 👇 Load next comparison
  useEffect(() => {
    if (!currentLeft && !currentRight && left.length && right.length) {
      setCurrentLeft(left[0]);
      setCurrentRight(right[0]);
    }

    // if one side is done, flush remaining
    if (
      (left.length === 0 || right.length === 0) &&
      currentLeft == null &&
      currentRight == null &&
      (left.length || right.length)
    ) {
      const remaining = [...left, ...right];
      const result = [...mergeResult, ...remaining];

      // Replace the first pair in rounds with merged result
      const newRounds = [...rounds];
      newRounds.splice(0, 2); // remove merged pair
      newRounds.unshift(result); // insert result

      setRounds(newRounds);
      setLeft([]);
      setRight([]);
      setMergeResult([]);
    }
  }, [currentLeft, currentRight, left, right, mergeResult, rounds]);

  const handleSelect = (winner: 'left' | 'right') => {
    const keep = winner === 'left' ? left[0] : right[0];
    setMergeResult((prev) => [...prev, keep]);

    if (winner === 'left') setLeft((prev) => prev.slice(1));
    else setRight((prev) => prev.slice(1));

    setCurrentLeft(null);
    setCurrentRight(null);
  };

  if (!currentLeft || !currentRight) {
    return (
      <div className="space-y-12 py-8 ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8 ">
      {title && <h2 className="text-xl font-semibold w-full text-center">{title}</h2>}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div
          className="cursor-pointer border-2 border-[#B5B9BE] rounded-xl p-4 sm:p-10 flex-1 text-center bg-[#333546]  hover:border-[#08B1C7] hover:bg-[#292A38] opacity-60 hover:opacity-100 transition"
          onClick={() => handleSelect('left')}
        >
          <h3 className="font-bold text-2xl mb-3">{currentLeft.title}</h3>
          {currentLeft.description && <p className="text-lg ">{currentLeft.description}</p>}
        </div>

        <div className="text-xl flex flex-col sm:flex-row items-center">OR</div>

        <div
          className="cursor-pointer border-2 border-[#B5B9BE] rounded-xl p-4 sm:p-10 flex-1 text-center bg-[#333546]  hover:border-[#08B1C7] hover:bg-[#292A38] opacity-60 hover:opacity-100 transition"
          onClick={() => handleSelect('right')}
        >
          <h3 className="font-bold text-2xl mb-3">{currentRight.title}</h3>
          {currentRight.description && <p className="text-lg ">{currentRight.description}</p>}
        </div>
      </div>
    </div>
  );
}
