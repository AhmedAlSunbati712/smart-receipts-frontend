export const computeStartDate = (range: string): string => {
    const now = new Date();
  
    switch (range) {
      case "7d":
        now.setDate(now.getDate() - 7);
        break;
      case "30d":
        now.setDate(now.getDate() - 30);
        break;
      case "3m":
        now.setMonth(now.getMonth() - 3);
        break;
      case "9m":
        now.setMonth(now.getMonth() - 9);
        break;
      case "12m":
        now.setMonth(now.getMonth() - 12);
        break;
      default:
        return "";
    }
  
    return now.toISOString().slice(0, 10); // YYYY-MM-DD
  }