"use client";

import { Customer } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const CustomerContext = createContext<Customer | undefined>(undefined);

export function CustomerProvider({
  customer,
  children,
}: {
  customer: Customer;
  children: ReactNode;
}) {
  return (
    <CustomerContext.Provider value={customer}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomerContext() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
