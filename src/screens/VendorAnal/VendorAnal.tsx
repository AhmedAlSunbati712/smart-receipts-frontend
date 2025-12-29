import React, { useState, useMemo } from "react";
import { getVendorAnalytics } from "@/api/analytics";
import { DatePicker } from "@/components/common/DatePicker";
import { CategoryPicker } from "@/components/common/CategoryPicker";
import { SpendingLineChart } from "@/components/common/SpendingLineChart";
import PieChartWithLabels from "@/components/common/PieChartWithLabels";
import { formatPieData, fillMissingDates } from "@/utils/dataProcessing";
import { DropdownPick } from "@/components/common/DropdownPick";
import type { Category } from "@/types/receipt";
import type { CategoryAnalytics, VendorAnalytics } from "@/types/analytics";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
});

const currencyPreciseFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1,
});

const VendorAnal = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [vendor, setVendor] = useState<string | undefined>(undefined);

    const { data: analytics, isLoading, isError } = getVendorAnalytics(startDate!, endDate!);
    

    const vendorLabels = useMemo(() => {
        if (!analytics) return null;
        return analytics.vendorsRecord;
    }, [analytics]);
    const processedData = useMemo(() => {
        if (!analytics || !vendor) return null;
        
        const currAnal = analytics.vendors.find((c: VendorAnalytics) => c.vendor === vendor);
        if (!currAnal) return null;
        const rawCategoryArray = Object.entries(currAnal.spendingByCategory as Record<string,number>).map(([category, total]) => ({
            category,
            total
        }))
        const categoryPieData = formatPieData({
            data: rawCategoryArray,
            primaryKey: "category",
            sortKey: "total"
        })
        

        const filledLineChartData = fillMissingDates(
            currAnal.spendingOverTime, 
            "date", 
            "total"
        );

        const totalPeriodSpending = analytics.periodSpending || 0;
        const vendorSpending = currAnal.vendorSpending || 0;
        const count = currAnal.numReceipts || 0;

        return {
            currAnal,
            categoryPieData,
            filledLineChartData,
            displayTotal: currencyFormatter.format(totalPeriodSpending),
            displayPercentage: percentFormatter.format(totalPeriodSpending > 0 ? vendorSpending / totalPeriodSpending : 0),
            displayAverage: currencyPreciseFormatter.format(count > 0 ? vendorSpending / count : 0),
            displayCount: count.toLocaleString()
        };
    }, [analytics, vendor]);

    if (isLoading) return <div className="flex h-screen items-center justify-center font-bold text-teal text-xl">Loading Analytics...</div>;
    if (isError) return <div className="flex h-screen items-center justify-center text-red-500 font-bold">Error loading analytics.</div>;
    console.log(analytics);
    return (
        <div className="flex flex-col w-full h-full items-center justify-center bg-white mt-[170px] mb-[170px]">
            <div className="w-full max-w-[1000px] flex flex-wrap items-center justify-center gap-3">
                <div className="relative w-[300px] h-[270px] flex flex-col justify-center items-center bg-teal rounded-md border-3 border-darkteal shadow-xl">
                    <span className="absolute top-2 text-white font-bold text-[30px]">Select Range</span>
                    <div className="absolute w-60 flex flex-col gap-2 bottom-8">
                        <DatePicker 
                            open={openStart} date={startDate} placeHolder="Select Start"
                            onOpenChange={() => setOpenStart(!openStart)} 
                            onSelect={(date) => { setStartDate(date); setOpenStart(false); }} 
                        />
                        <span className="text-white text-center font-bold text-[20px]">To</span>
                        <DatePicker 
                            open={openEnd} date={endDate} placeHolder="Select End"
                            onOpenChange={() => setOpenEnd(!openEnd)} 
                            onSelect={(date) => { setEndDate(date); setOpenEnd(false); }} 
                        />
                    </div>
                </div>
                {vendorLabels ? (
                <div className="relative w-[300px] h-[270px] flex flex-col justify-center items-center bg-teal rounded-md border-3 border-darkteal shadow-xl">
                    <span className="absolute top-2 text-white font-bold text-[30px]">Select Vendor</span>
                    <div className="w-60 flex flex-col gap-2">
                        <DropdownPick labels={vendorLabels} value={vendor} onChange={setVendor} placeHolder="Vendor" />
                    </div>
                </div>
                ) : (                
                <div className="relative w-[300px] h-[270px] flex flex-col justify-center items-center border-2 border-dashed border-darkteal rounded-md">
                    <span className="font-bold text-[28px] text-darkteal text-center">Please select a date range</span>
                </div>

            )}

            </div>
            {vendor && processedData ? (
                <div className="w-full max-w-[1200px] flex flex-wrap items-center justify-center gap-3 mt-8 animate-in fade-in duration-500">
                    <div className="w-[100%] flex justify-between items-center gap-8">
                        <div className="flex w-[800px] h-[200px] bg-white rounded-md border-3 border-darkteal shadow-xl">
                            <StatBox label="Total Spent" value={processedData.displayTotal} />
                            <StatBox label="Vendor %" value={processedData.displayPercentage} />
                            <StatBox label="Avg / Receipt" value={processedData.displayAverage} />
                            <StatBox label="Receipts" value={processedData.displayCount} isLast />
                        </div>
                        <div className="relative flex items-center justify-center w-[400px] h-[290px] border-3 border-darkteal rounded-md shadow-xl bg-white">
                            <span className="absolute top-4 text-teal font-bold text-[18px]">Spending by Vendor</span>
                            <PieChartWithLabels chartData={processedData.categoryPieData} primaryKey="category" />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center w-full h-[450px] mt-8 border-3 border-darkteal rounded-md shadow-xl bg-white p-6">
                        <span className="absolute top-4 text-teal font-bold text-[20px]">Spending Over Time</span>
                        <SpendingLineChart data={processedData.filledLineChartData} />
                    </div>
                </div>
            ) : (
                <div className="mt-20 text-darkteal font-bold text-xl border-2 border-dashed border-darkteal p-8 rounded-lg">
                    {!startDate || !endDate ? "Please select a date range to begin." : "Select a category to view detailed analytics."}
                </div>
            )}
        </div>
    );
};

const StatBox = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
    <div className={`relative w-1/4 flex flex-col items-center justify-center ${!isLast ? 'border-r-3 border-darkteal' : ''}`}>
        <span className="absolute top-4 text-teal font-bold text-[16px] text-center px-2">{label}</span>
        <span className="font-bold text-[28px] mt-4 text-darkteal">{value}</span>
    </div>
);

export default VendorAnal;