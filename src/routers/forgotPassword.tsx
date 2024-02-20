
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail} from "firebase/auth";
import { Error, Form, Input, Title, Wrapper } from "../components/auth-components";

export default function FindPassword() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const onChange =(e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        if (name === "email"){
            setEmail(value)
        }         
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "") return;
        try{
            setLoading(true);
            await sendPasswordResetEmail(auth, email).then(() =>{
                console.log("메일이 보내졌습니다.")
                }
            )
            navigate("/")
        }
        catch(e) {
            if (e instanceof FirebaseError){
                setError(e.message);
            }
        }
        finally{
            setLoading(false);
        }
    };
    return <Wrapper>
        <Title>비밀번호찾기</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
            <Input type="submit" value={isLoading ? "잠시만 기다려주세요" : "제출하기"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
}
