import styled from "styled-components";

export const Button = styled.span`
    background-color: gray;
    margin-top: 20px;
    font-weight: 700;
    width: 100%
    padding: 10px 20px;
    border-radius: 50px;
    height: 40px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Wrapper = styled.div`
    height: 100%;
    displayL flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

export const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 10px;
`;

export const Input =styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border:vnone;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

export const Error = styled.span`
    font-weight: 600;
    color: red;
`;

export const Title = styled.h1`
    font-size: 42px;    
`;

export const Swithcer = styled.span`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        color: #6bb3ff
    }
`;

