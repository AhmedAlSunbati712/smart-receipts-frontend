export type Category =
  | "GROCERIES"
  | "DINING"
  | "ENTERTAINMENT"
  | "TRANSPORTATION"
  | "RENT"
  | "UTILITIES"
  | "SHOPPING"
  | "HEALTHCARE"
  | "EDUCATION"
  | "TRAVEL"
  | "SUBSCRIPTIONS"
  | "INSURANCE"
  | "PERSONAL"
  | "GIFTS"
  | "OTHER";

export interface GetReceipt {
    vendor?: string;
    total?: number;
    category?: Category;
    date?: string;
}

export interface CreateReceipt {
    id?: string | undefined;
    vendor: string;
    category: Category;
    total: number;
    date: string | Date;
    rawText?: string | null | undefined;
    imageUrl?: string | null | undefined;
}

export interface UpdateReceipt {
    vendor?: string;
    category?: Category;
    total?: number;
    date?: Date;
    rawText?: string | null;
    imageUrl?: string | null;
    
    createItems?: {
        name: string;
        price: number;
        quantity: number;
    }[];

    connectItemIds?: string[];
};