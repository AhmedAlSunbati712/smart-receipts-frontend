import React from "react";
import { useState } from "react";
import { getPresignedUrl, getViewUrl, uploadToS3 } from "@/api/image";
import { toast } from 'react-toastify';
import UploadReceipt from "../UploadReceipt/UploadReceipt";
import { extractInfo } from "@/api/gpt";
import { processReceipt } from "@/api/ocr";
import type { ReceiptData } from "@/types/receipt";
import { TextInput } from "../common/TextInput";
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";

const NewReceiptModal = () => {
    const [selected, setselected] = useState(false);
    const [receiptKey, setKey] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [spinnerState, setSpinnerState] = useState<boolean>(true);
    const [ocrJobId, setJobId] = useState<number>(-1);
    const [receiptData, setReceiptData] = useState<ReceiptData>(
        {
        vendor: "",
        category: "OTHER",
        total: 0,
        date: "",
        items: [
            {
                name: "",
                quantity: 0,
                price: -1,
            },
            {
                name: "",
                quantity: 0,
                price: 0,
            }
        ],
    });
    

    const handleFileSelection = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setselected(true);
    }

    const addProcessingJob = async (imageUrl: string) => {
        try {
            const data = await processReceipt({imageUrl});
            const {status, jobId} = data;
            if (status == "success") {
                setJobId(jobId);
                toast.success("Image being processed");

            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to process receipt image!");
        }
    }

    const onUploadClick = async () => {
        try {
            const response_data = await getPresignedUrl({fileName: selectedFile?.name!, contentType: selectedFile?.type!});
            if (!response_data) return;
            const {uploadUrl, key} = response_data;
            setKey(key);
            await uploadToS3(uploadUrl, selectedFile!, selectedFile!.type);
            toast.success("Succesfully uploaded your receipt!")
            const viewUrl = await getViewUrl(key);
            setPreviewUrl(viewUrl);

        } catch(error) {
            console.error(error);
            toast.error("Failed to upload image!");
        }
    }

    const clickAdd = () => {
        let newItems = receiptData.items;
        newItems.push({
            name: "",
            price: 0,
            quantity: 0,
        });
        setReceiptData({...receiptData, items: newItems});
    }
    return (

    <div className="flex bg-white p-5 rounded-md items-center justify-center w-full flex flex-col shadow-md border border-3 border-darkteal">
        {/*<UploadReceipt selected={selected} previewUrl={previewUrl} selectedFile={selectedFile} handleFileSelection={handleFileSelection} onClickSubmit={onUploadClick} /> */}
        <div className="w-full items-center flex gap-2 mb-4">
            <div className={`w-[85px] h-[85px] rounded-md border-2 border-darkteal shadow-lg`}>
                <img className="w-full h-full object-cover" src={previewUrl} />        
            </div>
                <p>{selectedFile?.name || "No image selected"}</p>
        </div>
        <div className="w-full flex flex-col">
            <div className="w-full flex">
                <span className="text-darkgrey font-bold text-[18px] mr-auto">General Info</span>
                <span className="font-bold border border-1 border-darkteal rounded-md px-2">Total: ${receiptData.total}</span>
            </div>
            <span className="w-30 border border-2 border-lightgrey rounded-md"></span>
            <TextInput label="Vendor" value={receiptData.vendor} type="text" name="vendor" className="mt-2" onChange={(e) => setReceiptData({...receiptData, vendor: e.target.value})}/>
            <TextInput label="Date" value={receiptData.date} type="text" name="date" className="mt-2" onChange={(e) => setReceiptData({...receiptData, date: e.target.value})}/>
        </div>
        <div className="w-full align-left flex flex-col mt-2">
            <div className="w-30 flex">
            <span className="text-darkgrey font-bold text-[18px] mr-auto">Items</span>
            <button onClick={clickAdd}><FaPlus className="font-bold text-2xl text-darkteal hover:cursor-pointer" /></button>
            </div>
            <span className="w-30 border border-2 border-lightgrey rounded-md"></span>
        </div>
        {receiptData.items && 
            receiptData.items.map((item, index) => (
                <div className="w-full flex gap-1 mt-2" key={index}>
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
        <Button className="bg-teal hover:bg-darkteal text-[16px] mt-3" variant="default">Save</Button>
    </div> 

    )
}
export default NewReceiptModal;