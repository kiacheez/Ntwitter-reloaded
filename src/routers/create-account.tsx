import React, { useState } from "react";
import styled from "styled-components"


const Wrapper = styled.div`
    height: 100%;
    displayL flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%
`;

const Input =styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border:vnone;
    width: 100%;
    font-size: 16px;
`;

const Title = styled.h1`
    font-size: 42px;    
`;

export default function CreateAccount() {
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
    const onSubmit = (e : React.FormEvent<HTMLFormElement> => {
        e.preventDefault();
        try{

        }
        catch(e) {

        }
        finally{
            setLoading(false);
        }

    })
    return <Wrapper>
        <Title></Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="이름" value={name} placeholder="Name" type="text" required />
            <Input onChange={onChange} name="이메일" value={email} placeholder="Email" type="email" required />
            <Input onChange={onChange} name="비밀번호" value={password} placeholder="Password" type="password" required />
            <Input type="submit" value={isL"제출"} />
        </Form>
    </Wrapper>
}