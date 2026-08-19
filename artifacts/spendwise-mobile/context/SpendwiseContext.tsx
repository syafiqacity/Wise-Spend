import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Transaction = { id: string; title: string; category: string; type: 'expense' | 'income'; amount: number; date: string; account: string; color: string };
export type Budget = { id: string; name: string; spent: number; limit: number; color: string };
export type Goal = { id: string; name: string; saved: number; target: number; color: string; icon: string };
export type Account = { id: string; name: string; type: string; balance: number; color: string };
type State = { transactions: Transaction[]; budgets: Budget[]; goals: Goal[]; accounts: Account[] };
const initial: State = {
  accounts: [
    { id: 'a1', name: 'Maybank', type: 'Savings account', balance: 4820.5, color: '#5b4ee8' },
    { id: 'a2', name: 'Touch n Go', type: 'E-wallet', balance: 286.2, color: '#3db78a' },
    { id: 'a3', name: 'Cash wallet', type: 'Cash', balance: 120, color: '#efa84b' },
  ],
  transactions: [
    { id: 't1', title: 'Salary', category: 'Income', type: 'income', amount: 4200, date: 'Today, 9:00 AM', account: 'Maybank', color: '#3db78a' },
    { id: 't2', title: 'The Daily Grind', category: 'Food & Drinks', type: 'expense', amount: 14.8, date: 'Today, 8:42 AM', account: 'Touch n Go', color: '#efa84b' },
    { id: 't3', title: 'Grab ride', category: 'Transport', type: 'expense', amount: 18.5, date: 'Yesterday', account: 'Touch n Go', color: '#5c9ee8' },
    { id: 't4', title: 'Grocery run', category: 'Shopping', type: 'expense', amount: 86.2, date: '18 Aug 2026', account: 'Maybank', color: '#d95959' },
    { id: 't5', title: 'Freelance project', category: 'Income', type: 'income', amount: 850, date: '16 Aug 2026', account: 'Maybank', color: '#3db78a' },
  ],
  budgets: [
    { id: 'b1', name: 'Food & Drinks', spent: 342, limit: 500, color: '#efa84b' },
    { id: 'b2', name: 'Transport', spent: 96, limit: 200, color: '#5c9ee8' },
    { id: 'b3', name: 'Shopping', spent: 264, limit: 300, color: '#d95959' },
  ],
  goals: [
    { id: 'g1', name: 'New laptop', saved: 1850, target: 3500, color: '#5b4ee8', icon: 'laptop-outline' },
    { id: 'g2', name: 'Emergency fund', saved: 4200, target: 6000, color: '#3db78a', icon: 'shield-checkmark-outline' },
  ],
};
const storageKey = 'spendwise-state-v1';
const makeId = () => Date.now().toString() + Math.random().toString(36).slice(2, 8);
type ContextValue = State & { ready: boolean; dark: boolean; toggleTheme: () => void; addTransaction: (title: string, amount: number, type: 'expense' | 'income', category: string) => void; addGoal: (name: string, target: number) => void };
const SpendwiseContext = createContext<ContextValue | null>(null);

export function SpendwiseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { AsyncStorage.getItem(storageKey).then(value => { if (value) setState(JSON.parse(value)); setReady(true); }); }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(storageKey, JSON.stringify(state)); }, [state, ready]);
  const value = useMemo<ContextValue>(() => ({
    ...state, ready, dark, toggleTheme: () => setDark(value => !value),
    addTransaction: (title, amount, type, category) => setState(current => ({ ...current, transactions: [{ id: makeId(), title, category, type, amount, date: 'Just now', account: 'Maybank', color: type === 'income' ? '#3db78a' : '#5b4ee8' }, ...current.transactions] })),
    addGoal: (name, target) => setState(current => ({ ...current, goals: [...current.goals, { id: makeId(), name, target, saved: 0, color: '#5b4ee8', icon: 'flag-outline' }] })),
  }), [state, ready, dark]);
  return <SpendwiseContext.Provider value={value}>{children}</SpendwiseContext.Provider>;
}
export function useSpendwise() { const value = useContext(SpendwiseContext); if (!value) throw new Error('SpendwiseProvider is missing'); return value; }