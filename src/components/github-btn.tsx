import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "./auth-components";


const Logo = styled.img`
    height: 25px;
`;

export default function GithubBotton() {
    const navigate = useNavigate();
    const onClick = async() => {
        try {
            const provider = new GithubAuthProvider();
            
            await signInWithPopup(auth, provider)
            navigate("/");
            
        } catch (error) {
            console.error(error)
        }
    }
    return <Button onClick={onClick}>
        <Logo src="/github-mark-white.png" />
        GitHub로 로그인하기
    </Button>
}