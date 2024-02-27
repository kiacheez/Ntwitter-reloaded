import styled from "styled-components";
import { auth, db, storage } from "../firebase"
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const AvatarImg = styled.img`
    width: 100%
`;

const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    display: flex;
    justify-content: center;
`;

const AvatarInput = styled.input`
    display: none;
`;

const Name = styled.span`
    font-size: 28px;
`;

const Tweets = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ChangeName = styled.label`
    padding: 10px;
    color: #ffe66b;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #ffe66b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const ChangeNameField = styled.textarea`
    border: 2px solid white;
    border-radius: 1%;
    padding: 20px;
    width: 50%;
    font-size: 18px;
    
`;


export default function Profile() {
    const user = auth.currentUser;
    //유저 이미지 확인후 유저이미지를 업데이트하기
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [userName, setEditName] = useState("");
    const [isEditing, setisEditing] = useState(false);
    // 외부에서 나의 프로필사진을 볼수 있게 만들기
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        //user이미지가 없을경우 null 로 리턴
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`)
            const result = await uploadBytes(locationRef, file);
            const avatarURL = await getDownloadURL(result.ref);
            setAvatar(avatarURL)
            await updateProfile(user, { photoURL: avatarURL });
        }
    }
    const fetchTweets = async () => {
        const queryTweets = query(
            collection(db, "tweets"),
            //query filltering하기 userId가 현재 user와 같다면을 표시함. 나중에 새로고침후 console log따라 firebase에 필터조정해줘야함
            where("userId", "==", user?.uid),
            orderBy("createdAt", "desc"),
            limit(10)
        );
        //doc가져오기
        const snapshot = await getDocs(queryTweets);
        const myTweets = snapshot.docs.map(doc => {
            const { tweet, createdAt, username, userId, photo } = doc.data();
            return { tweet, createdAt, userId, username, photo, id: doc.id };
        });
        setTweets(myTweets);
    };
    //이름변경 이벤트 시작
    const onClickEditName = () => {
        setisEditing(true);
    }

    const onUsernameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditName(e.target.value)
    }
    //form형성 안했으니 async안에 formelement삭제
    const onApplyName = async () => {
        if (!user || userName === "") return;
        try {
            await updateProfile(user, { displayName: userName });
        } catch (error) {
            console.log(error)
        } finally {
            setisEditing(false);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    return <Wrapper>
        <AvatarUpload htmlFor="avatar">
            {/* 유저이미지가 있으면 이미지를 보여주거나 아니면 기본아이콘만 보여주기 */}
            {avatar ? <AvatarImg src={avatar} /> : (<FaUserNinja size={80} style={{ fill: 'white' }} />)}
        </AvatarUpload>
        <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
        {isEditing ? (
            <>
                <ChangeNameField onChange={onUsernameChange} value={userName} />
                <ChangeName onClick={onApplyName}>이름저장</ChangeName></>) :
        (
            <>
                <Name>
                    {/* 유저가 displayname을 갖으면 displayName으로 나타내고나 익명으로 표시하기 */}
                    {user?.displayName ? user.displayName : "익명"}
                </Name>
                <ChangeName onClick={onClickEditName}>이름변경하기</ChangeName>
            </>
        )
        }
        <Tweets>
            {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
        </Tweets>
    </Wrapper>
}