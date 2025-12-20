import React from "react";
import { useState } from "react";
import { getPresignedUrl, getViewUrl, uploadToS3 } from "@/api/image";
import { toast } from 'react-toastify';
import UploadReceipt from "../UploadReceipt/UploadReceipt";
import { processReceipt, getJobResult, getJobStatus } from "@/api/ocr";
import type { ReceiptData, Category } from "@/types/receipt";
import { NewReceipt } from "./NewReceipt";
import Spinner from "./Spinner";
import { sleep } from "@/utils/sleep";
import { extractInfo } from "@/api/gpt";

const NewReceiptModal = () => {
    const [selected, setselected] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [receiptKey, setKey] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [receiptReady, setReceiptStatus] = useState<boolean>(false);
    const [ocrJobId, setJobId] = useState<string>("");
    const [datePickerOpen, setOpen] = useState(false);
    const [receiptText, setReceiptText] = useState<string | undefined>(undefined);

    const [receiptData, setReceiptData] = useState<ReceiptData>(
        {
        vendor: "",
        category: undefined,
        total: 0,
        date: undefined,
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

    const setCategory = (v: Category) => {
        setReceiptData({...receiptData, category: v});
    } 
    
    const pollJobStatus = async (jobId: string) => {
        const MAX_RETRIES = 30;
        const POLL_INTERVAL = 2000;
        for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
            const jobStatus = await getJobStatus(jobId);
            if (jobStatus.status == "completed") {
                return;
            }

            if (jobStatus.status == "failed") {
                throw new Error("OCR job failed");
            }

            await sleep(POLL_INTERVAL);
        }

        throw new Error("OCR job timedout!");
    }

    const handleFileSelection = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setselected(true);
    }

    const processingJob = async (imageUrl: string) => {
        try {
            const data = await processReceipt({ imageUrl });
            const {status, jobId} = data;
            setJobId(jobId.id);

            // Now need to poll
            await pollJobStatus(jobId.id);
            
            // Request the raw text of the image
            const resData = await getJobResult(jobId.id);
            setReceiptText(resData.text);


            // Now ask chatgpt to extract data in a structured way
            const receiptData = await extractInfo(resData.text);
            setReceiptData(receiptData);

        } catch (error) {
            console.error(error);
            toast.error("Failed to process receipt image!");
        }
    }


    const onUploadClick = async () => {
        try {
            // Get a presigned s3 url to upload to s3
            const response_data = await getPresignedUrl({fileName: selectedFile?.name!, contentType: selectedFile?.type!});
            if (!response_data) return;
            const {uploadUrl, key} = response_data;
            setKey(key);
            
            // upload to s3
            await uploadToS3(uploadUrl, selectedFile!, selectedFile!.type);
            toast.success("Succesfully uploaded your receipt!")
            const viewUrl = await getViewUrl(key);
            
            // Adjust state properly
            setPreviewUrl(viewUrl); // To view the receipt image from the s3 bucket instead
            setUploaded(true); // To move on to the next stage and start loading
            
            // The real work happening here: Sends the image to the backend to extract text
            // and to extract structured info for display
            await processingJob(viewUrl);
            toast.success("Successfully processed receipt!");
            setReceiptStatus(true);
        } catch(error) {
            console.error(error);
            toast.error("Failed to upload image!");
            setUploaded(false);
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

    <div className="min-h-[400px] flex bg-white p-5 rounded-md items-center justify-center w-full flex flex-col shadow-md border border-3 border-darkteal">
        { !uploaded && (
            <UploadReceipt selected={selected} previewUrl={previewUrl} selectedFile={selectedFile} handleFileSelection={handleFileSelection} onClickSubmit={onUploadClick}/>
        )}

        {(uploaded && !receiptReady) && (
            <div className="flex flex-1 items-center justify-center">
                <Spinner />
            </div>
        )}
        {(receiptReady && uploaded) && (
        <NewReceipt 
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            receiptData={receiptData}
            setCategory={setCategory}
            setReceiptData={setReceiptData}
            datePickerOpen={datePickerOpen}
            setOpen={setOpen}
            clickAdd={clickAdd}
        />
        )}
    </div> 

    )
}
export default NewReceiptModal;