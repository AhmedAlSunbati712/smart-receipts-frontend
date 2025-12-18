import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { getPresignedUrl, getViewUrl, uploadToS3 } from "@/api/image";
import { toast } from 'react-toastify';
import UploadReceipt from "../UploadReceipt/UploadReceipt";
import Spinner from "./Spinner";
const NewReceiptModal = () => {
    const [selected, setselected] = useState(false);
    const [receiptKey, setKey] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
    const [spinnerState, setSpinnerState] = useState<boolean>(true);

    const handleFileSelection = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setselected(true);
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
    return (

    <div className="flex bg-white p-5 rounded-md items-center justify-center w-full flex flex-col shadow-md">
        <UploadReceipt selected={selected} previewUrl={previewUrl} selectedFile={selectedFile} handleFileSelection={handleFileSelection} onClickSubmit={onUploadClick} />
    </div> 

    )
}
export default NewReceiptModal;