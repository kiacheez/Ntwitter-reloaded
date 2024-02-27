import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditTweet from "./edittweet";

const Wrapper = styled.div`
    display: grid;
    grid-template-column: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`;

const Column = styled.div`
    padding: 5px;
`;

const Photo = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 15px;
    
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 30px;
`;

const DeleteButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
    margin-l
`;

const EditButton = styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;




export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
    const [isEditing, setIsEditing] = useState(false);
    const user = auth.currentUser; //async는 비동기함수를 동기화시켜줌
    const onDelete = async () => {
        const ok = confirm("게시물을 삭제하겠습니까?")
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "tweets", id));
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}_${user.displayName}/${user.uid}`)
                await deleteObject(photoRef)
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    };
    const onEdit = () => {
        setIsEditing((prev) => !prev);

    }

    return <Wrapper>
        <Column>
            <Username>
                {username}
            </Username>
            {
            photo ? (<Column>
                <Photo src={photo} />
            </Column>) : null
        }
            {isEditing ? (<EditTweet
                tweet={tweet}
                photo={photo}
                id={id}
                setIsEditing={setIsEditing}
            />) :
                <Payload>
                    {tweet}
                </Payload>
            }

            {user?.uid === userId ? <DeleteButton onClick={onDelete}>삭제</DeleteButton> : null}
            {user?.uid === userId ? <EditButton onClick={onEdit}>변경</EditButton> : null}
        </Column>
    </Wrapper >
}