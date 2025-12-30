import { useState, useEffect, useMemo } from "react";
import { getAnalytics } from "@/api/analytics";
import { HistoryDrop } from '../../components/Dashboard/HistoryDrop';
import { formatPieData, preprocessUpperCaseStrings, fillMissingDates } from '../../utils/dataProcessing';
import PieChartWithLabels from '../../components/common/PieChartWithLabels';
import { SpendingLineChart } from '../../components/common/SpendingLineChart';
import { computeStartDate } from '../../utils/date';


const Dashboard = () => {
    const [value, setValue] = useState<string | undefined>("30d");
    const startDate = useMemo(() => computeStartDate(value!), [value]);

    // Fetching analytics from the backend
    const {data: analytics, isLoading: isLoadingAnalytics, isError: isErrorAnalytics, isSuccess: isSuccessAnalytics} = getAnalytics(startDate);

    // Different analytics to display
    const spendingOverTime = analytics?.spendingOverTime ?? [];
    const spendingByCategory = analytics?.categorySpending ?? [];
    const spendingByVendor = analytics?.vendorSpending ?? [];

    // Assigning days where there's no spending record to 0
    const normalizedData = useMemo(() => {
        if (!spendingOverTime.length) return [];
        return fillMissingDates(spendingOverTime, "date", "total");
      }, [spendingOverTime]);

    // Formats data for the pie chart. {category, value, fill}
    const formatted_by_category_pie = useMemo(() => {
        if (!spendingByCategory.length) return [];
        return formatPieData({
          data: spendingByCategory,
          primaryKey: "category",
          sortKey: "total",
        }).map(item => ({
          ...item,
          category: preprocessUpperCaseStrings(item.category),
        }));
    }, [spendingByCategory]);

    // Formates data for pie chart. {vendor, value, fill}
    const formatted_by_vendor_pie = useMemo(() => {
        if (!spendingByVendor.length) return [];
        return formatPieData({
          data: spendingByVendor,
          primaryKey: "vendor",
          sortKey: "total",
        });
      }, [spendingByVendor]);
    

    // Total amount of money spent
    const totalSpent = useMemo(
        () => spendingOverTime.reduce((acc:number, item:any) => acc + item.total, 0),
        [spendingOverTime]
    );

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(totalSpent);

    if (isLoadingAnalytics) {
        return <div>loading</div>
    }
    if (isErrorAnalytics) {
        return <div>error</div>
    }

    return (
        <>
            <div className='flex flex-col w-full h-full items-center justify-center bg-white mt-[170px] mb-[170px]'>
                <div className="w-full max-w-[1000px] flex flex-wrap items-center justify-center gap-3">
                <div className="relative w-[274px] h-[164px] flex flex-col justify-center items-center bg-teal rounded-md border-3 border-darkteal shadow-xl md:mr-auto">
                    <span className="absolute top-2 text-white font-bold text-[30px]"> Dashboard</span>
                    <HistoryDrop value={value} setValue={setValue} />
                </div>
                <div className="flex w-[571px] h-[164px] bg-white rounded-md border-3 border-darkteal shadow-xl">
                    <div className="relative w-[190px] flex flex-col items-center border-r-3 border-darkteal justify-center">
                    <span className="absolute top-4 text-teal font-bold text-[20px]">Total spent</span>
                    <span className="font-bold text-[30px] text-teal">{formattedTotal}</span>
                    </div>
                    <div className="relative w-[190px] flex flex-col items-center border-r-3 border-darkteal justify-center">
                    <span className="absolute top-4 text-teal font-bold text-[20px]">Receipts</span>
                    <span className="font-bold text-[30px] text-teal">{analytics.numReceipts}</span>
                    </div>
                    <div className="relative w-[190px] flex flex-col items-center justify-center">
                        <span className="absolute top-4 text-teal font-bold text-[20px]">Top Category</span>
                        <span className="font-bold text-[30px] text-teal">{formatted_by_category_pie[0] ? formatted_by_category_pie[0].category : ""}</span>
                    </div>
                </div>
                </div>
                {analytics.numReceipts > 0 ? (
                    <>
                        <div className="flex w-full items-center justify-center max-w-[40%] h-[400px] border border-3 border-darkteal mt-8 rounded-md shadow-xl">
                            <SpendingLineChart data={normalizedData} />
                        </div>
                        <div className="flex w-full items-center justify-between max-w-[65%] h-[290px]">
                            <div className='relative flex items-center justify-center w-[450px] h-[290px] border border-3 border-darkteal mt-8 rounded-md shadow-xl'>
                                <span className="absolute top-4 text-teal font-bold text-[20px]">Top Categories</span>
                                    <PieChartWithLabels chartData={formatted_by_category_pie} primaryKey='category' />
                            </div>
                            <div className='relative flex items-center justify-center w-[450px] h-[290px] border border-3 border-darkteal mt-8 rounded-md shadow-xl'>
                                <span className="absolute top-4 text-teal font-bold text-[20px]">Top Vendors</span>
                                <PieChartWithLabels chartData={formatted_by_vendor_pie} primaryKey='vendor' />
                            </div>
                        </div>
                    </>
                ) : (<></>)}

            </div>
        </>
    )
}

export default Dashboard;