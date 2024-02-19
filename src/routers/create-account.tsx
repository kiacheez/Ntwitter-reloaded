import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Swithcer, Title, Wrapper } from "../components/auth-components";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange =(e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : {name, value}} = e;
        if(name === "name"){
            setName(value)
        }
        else if (name === "email"){
            setEmail(value)
        }         
        else if (name === "password"){
            setPassword(value)
        }
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "") return;
        try{
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {displayName: name});
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
        <Title>계정생성 X</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name" value={name} placeholder="이름" type="text" required />
            <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
            <Input type="submit" value={isLoading ? "잠시만 기다려주세요" : "제출"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Swithcer>
            <Link to="/login">로그인</Link>
        </Swithcer>
    </Wrapper>
}