import React from 'react';
import axios from "axios";
import { SERVER_URL } from '../utils/constants';
import { getPresignedUrl, uploadToS3 } from '../api/image';
const UploadReceipt = () => {


    const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const contentType = file.type;
        const fileName = file.name;
        const data = await getPresignedUrl({fileName, contentType});
        await uploadToS3(data?.uploadUrl, file, contentType);
    };

    return (
        <input type="file" accept="image/*" onChange={onFileUpload}/>
    )
}

export default UploadReceipt;