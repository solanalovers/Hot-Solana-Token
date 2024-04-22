"use client";
import React, { createContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBalance } from "@/function/wallet";

export const AppContext = createContext<any>({});

export default function AppAdapter({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMainnet, setIsMainnet] = useState(() => {
    if (typeof window !== "undefined") {
      const result = localStorage.getItem("isMainnet");
      if (!result) {
        localStorage.setItem("isMainnet", "true");
        return true;
      } else {
        return JSON.parse(result);
      }
    }
  });
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();

  const getWalletBalance = async () => {
    if (publicKey) {
      const balance: any = await getBalance(publicKey, isMainnet);
      setBalance(balance.toFixed(4));
    }
  };

  useEffect(() => {
    (async () => {
      await getWalletBalance();
    })();
  }, [publicKey, isMainnet]);
  return (
    <AppContext.Provider
      value={{ isMainnet, setIsMainnet, balance, getWalletBalance }}
    >
      {children}
    </AppContext.Provider>
  );
}
