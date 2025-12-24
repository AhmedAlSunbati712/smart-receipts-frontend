import React from "react";
import { TextInput } from "../common/TextInput";
import { CategoryPicker } from "../common/CategoryPicker";
import { DatePicker } from "../common/DatePicker";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import type { ReceiptItem } from "@/types/receipt";

export const NewReceipt = ({
    selectedFile,
    previewUrl,
    receiptData,
    setCategory,
    setReceiptData,
    datePickerOpen,
    setOpen,
    clickAdd,
    onClickSave,
    }: any) => {
    return (
        <>
        <div className={`w-full items-center flex flex-wrap gap-2 mb-4`}>
            <div className={`w-[85px] h-[85px] rounded-md border-2 border-darkteal shadow-lg`}>
                <img className="w-full h-full object-cover" src={previewUrl} />        
            </div>
                <p>{selectedFile?.name || "No image selected"}</p>
        </div>
        <div className={`w-full flex flex-col`}>
            <div className="w-full flex">
                <span className="text-darkgrey font-bold text-[18px] mr-auto">General Info</span>
                <span className="font-bold border border-1 border-darkteal rounded-md px-2">Total: ${receiptData.total}</span>
            </div>
            <span className="w-30 border border-2 border-lightgrey rounded-md"></span>
            <TextInput label="Vendor" value={receiptData.vendor} type="text" name="vendor" className="mt-2" onChange={(e) => setReceiptData({...receiptData, vendor: e.target.value})}/>
            <CategoryPicker value={receiptData.category} onChange={setCategory}/>
            <DatePicker open={datePickerOpen} date={receiptData.date} onOpenChange={() => setOpen(!datePickerOpen)} onSelect={(date) => {
                setReceiptData({...receiptData, date: date});
                setOpen(false);
            }} placeHolder="Select Date"/>
        </div>
        <div className={`w-full align-left flex flex-col mt-2 `}>
            <div className="w-30 flex">
            <span className="text-darkgrey font-bold text-[18px] mr-auto">Items</span>
            <button onClick={clickAdd}><FaPlus className="font-bold text-2xl text-darkteal hover:cursor-pointer" /></button>
            </div>
            <span className="w-30 border border-2 border-lightgrey rounded-md"></span>
        </div>
        {receiptData.items && 
            receiptData.items.map((item: ReceiptItem, index: number) => (
                <div className={`w-full flex gap-1 mt-2`} key={index}>
                    <div className="w-50">
                        <TextInput label="Name" value={item.name} type="text" name="name" className="" onChange={(e) => {
                            const newItems = [...receiptData.items];
                            newItems[index] = {
                                ...newItems[index],
                                name: e.target.value,
                            };

                            setReceiptData({
                                ...receiptData,
                                items: newItems,
                            });
                        }} />
                    </div>
                    <div className="w-30">
                    <TextInput label="Price" value={item.price <= 0 ? "" : String(item.price)} type="text" name="price" className="" onChange={(e) => {
                        const newItems = [...receiptData.items];
                        newItems[index] = {
                            ...newItems[index],
                            price: Number(e.target.value),
                        };

                        setReceiptData({
                            ...receiptData,
                            items: newItems,
                        })
                    }} />
                    </div>
                    <div className="w-20">
                    <TextInput label="Qty" value={item.quantity <= 0 ? "" : String(item.quantity)} type="text" name="quantity" className="" onChange={(e) => {
                        const newItems = [...receiptData.items];
                        newItems[index] = {
                            ...newItems[index],
                            quantity: Number(e.target.value),
                        };

                        setReceiptData({
                            ...receiptData,
                            items: newItems,
                        })
                    }} />
                    </div>
                </div>
            )
        )}
        <Button className={`bg-teal hover:bg-darkteal text-[16px] mt-3`} variant="default" onClick={onClickSave}>Save</Button>
        </>
    )
}

