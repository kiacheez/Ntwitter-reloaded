import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: red;
    background-color: black;
    width: 100%
    resize: none;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #ffe66b
    }
`;

const AttachFileButton = styled.label`
    padding: 10px;
    color: #ffe66b;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #ffe66b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #6bb3ff;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    fontsize: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.8;
    }
`;

export default function PostTweet() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>();
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const filesizeKB = 1024 * 1024
        const MaxMB = filesizeKB/filesizeKB

        if (files && files.length === 1 && files[0].size < filesizeKB ) {
            setFile(files[0]);
        } 
        if ( files && files[0].size > filesizeKB) {
            alert(`최대 ${MaxMB}MB까지 업로드할 수 있습니다.`)
        } return setFile(null);

    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser
        if (!user || isLoading || tweet === "") return;
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid
            });
            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}_${user.displayName}/${Date.now()}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url
                })
            };
            setTweet("");
            setFile(null);
        } catch (error) {
            console.log(e);
        } finally {
            setLoading(false);
        }

    }
    return <Form onSubmit={onSubmit}>
        <TextArea required rows={5} maxLength={1000} onChange={onChange} value={tweet} placeholder="입력하세요" />
        <AttachFileButton htmlFor="file">{file ? "사진이 첨부되었습니다." : "사진첨부"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
        <SubmitBtn type="submit" value={isLoading ? "등록중입니다." : "트윗"} />
    </Form>
}