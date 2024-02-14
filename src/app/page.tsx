'use client';
import {useRef, useState} from "react";

export default function Home() {
    const [s3url, setS3url] = useState<string>('')
    const fileInput = useRef<HTMLInputElement>(null);
    const [s3response, setS3Response] = useState<string>('')
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!s3url || !fileInput || !fileInput?.current?.files) {
            window.alert("Fill out the URL and choose a file")
        } else {
            console.log('file', fileInput)
            const file = fileInput.current.files[0]

            setIsSending(true);
            const response = await fetch(s3url,
                {
                    body: file,
                    method: 'PUT',
                    headers: {
                        "Content-Type": file.type
                    },
                }
            )
            setS3Response(response.statusText)
            setIsSending(false);
        }
    }

    return (
        <main className="p-10">
            <h1 className={"block mb-2 text-3xl"}>File upload demo</h1>
            <label htmlFor="s3url">Presigned S3 URL (generated in Step 1: </label>
            <input id="s3url" type="text" className={"w-full dark:text-black"} value={s3url}
                   onChange={e => setS3url(e.target.value)}
                   required={true}
            />

            <input type="file"
                   ref={fileInput}
                   accept="image/*"
                   className="block mb-4"
                   required={true}
            />

            <button className="p-4 bg-orange-400 hover:bg-orange-600 text-black" onClick={handleSubmit}>Send to S3
            </button>

            {isSending && <div className={"mt-4"}>
                <p className="text-3xl">Uploading, please wait...</p>
            </div>}

            {s3response && <div className={"mt-4"}>
                <h2 className="text-3xl">S3 Response: {s3response}</h2>
            </div>}
        </main>
    );
}
