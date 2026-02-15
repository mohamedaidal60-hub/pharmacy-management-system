"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, ReactNode } from "react";

interface PharmacyContextType {
    selectedStoreId: string | null;
    setSelectedStoreId: (id: string | null) => void;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

export function PharmacyProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [selectedStoreId, setSelectedStoreId] = useState<string | null>(
        session?.user?.storeId || "store_001" // Default store for no-auth
    );

    return (
        <PharmacyContext.Provider value={{ selectedStoreId, setSelectedStoreId }}>
            {children}
        </PharmacyContext.Provider>
    );
}

export function usePharmacy() {
    const context = useContext(PharmacyContext);
    if (context === undefined) {
        throw new Error("usePharmacy must be used within a PharmacyProvider");
    }
    return context;
}
