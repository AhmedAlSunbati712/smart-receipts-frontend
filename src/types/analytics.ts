import type { Category } from "./receipt"
export type CategoryAnalytics = {
    category: Category;
    numReceipts: number;
    categorySpending: number;
    spendingOverTime: {date: string, total: number}[];
    spendingByVendor: Partial<Record<string, number>>;
}

export type VendorAnalytics = {
    vendor: string;
    vendorSpending: number;
    numReceipts: number;
    spendingOverTime: {date: string, total: number}[];
    spendingByCategory: Partial<Record<Category, number>>;
}