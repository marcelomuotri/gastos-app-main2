import { iTransaction } from "../types";

export const groupTransactionsByCategory = (
    transactions: iTransaction[],
  ): { category: string; price: number; color: string }[] => {
    const categories: { [category: string]: { price: number; color: string } } = {};
  
    transactions.forEach((transaction) => {
      const categoryName = transaction.category.name;
      const categoryColor = transaction.category.color;
  
      if (categories[categoryName]) {
        categories[categoryName].price += transaction.amount;
      } else {
        categories[categoryName] = { price: transaction.amount, color: categoryColor };
      }
    });
  
    return Object.keys(categories).map((category) => ({
      category,
      price: categories[category].price,
      color: categories[category].color,
    }));
  };