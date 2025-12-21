import { format, addDays, isSameDay, parseISO } from 'date-fns';


const PIEFILL = [
    "#0f766e",
    "#14b8a6",
    "#2dd4bf",
    "#5eead4",
    "#99f6e4",
  ];
  
 type DataItem<T extends string> = Record<T, string> & { total: number };
  
type PieInput<T extends string> = {
    data: DataItem<T>[];
    primaryKey: T;
    sortKey: keyof DataItem<T>;
};

export const preprocessUpperCaseStrings = (str: string) => {
    return str.slice(0,1).toUpperCase() + str.slice(1, str.length).toLowerCase()
}
export const formatPieData = <T extends string>({
    data,
    primaryKey,
    sortKey,
  }: PieInput<T>) => {
    const sorted = [...data].sort(
      (a, b) => Number(b[sortKey]) - Number(a[sortKey])
    );

  
    const MAX_ITEMS = PIEFILL.length - 1;
    
    const result: Array<{ [K in T]: string } & { total: number; fill: string }> = [];
  
    let otherTotal = 0;
  
    sorted.forEach((item, index) => {
      if (index < MAX_ITEMS) {
        result.push({
          [primaryKey]: item[primaryKey],
          total: item.total, 
          fill: PIEFILL[index],
        } as any);
      } else {
        otherTotal += item.total;
      }
    });
  
    if (otherTotal > 0) {
      result.push({
        [primaryKey]: "Other",
        total: otherTotal,
        fill: PIEFILL[PIEFILL.length - 1],
      } as any);
    }
  
    return result;
  };
  
  export const fillMissingDates = (data: any[], dateKey: string, valueKey: string) => {
    if (!data || data.length === 0) return [];
    if (data.length < 2) return data;
  
    // 1. Create a quick lookup map so we don't have to use .find() every day
    // We use the formatted date string as the key
    const dataMap = new Map();
    data.forEach(item => {
      const d = typeof item[dateKey] === 'string' ? parseISO(item[dateKey]) : item[dateKey];
      dataMap.set(format(d, 'yyyy-MM-dd'), item[valueKey]);
    });
  
    // 2. Identify bounds correctly regardless of backend sort order
    const dates = data.map(d => parseISO(d[dateKey]).getTime());
    const startDate = new Date(Math.min(...dates));
    const endDate = new Date(Math.max(...dates));
  
    const filledData = [];
    let currentDate = startDate;
  
    // 3. Fill the gap
    while (currentDate <= endDate) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      
      filledData.push({
        [dateKey]: dateStr,
        [valueKey]: dataMap.has(dateStr) ? dataMap.get(dateStr) : 0,
      });
  
      currentDate = addDays(currentDate, 1);
    }
  
    return filledData;
  };