import type { Category } from "./receipt"
export type CategoryAnalytics = {
    category: Category;
    numReceipts: number;
    categorySpending: number;
    spendingOverTime: {date: string, total: number};
    spendingByVendor: {vendor: string, total: number};
}