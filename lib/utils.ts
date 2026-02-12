import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(date))
}

export function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 7)
    return `ORD-${timestamp}-${random}`.toUpperCase()
}

export function generatePrescriptionNumber(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 7)
    return `RX-${timestamp}-${random}`.toUpperCase()
}

export function calculateDiscount(price: number, discountPercent: number): number {
    return price * (discountPercent / 100)
}

export function calculateTax(amount: number, taxPercent: number): number {
    return amount * (taxPercent / 100)
}
