import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "./auth-components";


const Logo = styled.img`
    height: 25px;
`;

export default function GoogleBotton() {
    const navigate = useNavigate();
    const onClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            
            await signInWithPopup(auth, provider)
            navigate("/");
            
        } catch (error) {
            console.error(error)
        }
    }
    return <Button onClick={onClick}>
        <Logo src="/google.png" />
        Google로 로그인하기
    </Button>
}