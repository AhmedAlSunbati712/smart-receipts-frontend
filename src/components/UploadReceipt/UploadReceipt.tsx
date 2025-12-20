import React from "react";
import { Button } from "../ui/button";


const UploadReceipt = ({selected, previewUrl, selectedFile, handleFileSelection, onClickSubmit, className=""}: any) => {
    return (
        <>
            <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border-darkteal border-dashed border-default-strong border-2 rounded-base cursor-pointer hover:bg-neutral-tertiary-medium rounded-md ${className}`}>
                <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                    <div className={`w-[100px] h-[115px] rounded-md border-2 border-darkteal ${selected ? "block" : "hidden"}`}>
                        <img className="w-full h-full object-cover" src={previewUrl} />
                    </div>
                    <p className={`${selected ? "block" : "hidden"} font-semibold text-darkteal`}>{selectedFile?.name}</p>
                    <svg className={`w-8 text-darkteal h-8 mb-4 ${!selected ? "block":"hidden"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/></svg>
                    <p className={`mb-2 text-sm text-darkteal ${!selected ? "block":"hidden"}`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className={`text-xs text-darkteal ${!selected ? "block":"hidden"}`}>SVG, PNG, JPG or GIF</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelection} />
            </label>
            <Button className={`bg-teal hover:bg-darkteal mt-3 ${className}`} variant="default" onClick={onClickSubmit}> Upload </Button>
        </>
    
    )
}

export default UploadReceipt;