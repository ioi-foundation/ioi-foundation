import { Contribution } from '../types';

export const calculateTotalXP = (contributions: Contribution[]): number => {
  return contributions.reduce((total, contribution) => {
    return total + contribution.weight;
  }, 0);
};

export const formatXP = (xp: number): string => {
  return Math.round(xp).toLocaleString();
};