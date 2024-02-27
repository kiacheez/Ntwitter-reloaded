
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";


export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow-y: scroll;
`;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([])
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null; //데이터값 절약을 위해 데이터제한하기
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"), orderBy("createdAt", "desc"), limit(20)
            );
            /* const snapshot = await getDocs(tweetsQuery);
             const tweets = snapshot.docs.map((doc) => {
                 const {tweet, createdAt, userId, username, photo} = doc.data();
                 return {
                     tweet, createdAt, userId, username, photo, id:doc.id,
                 };
             }); */
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        tweet, createdAt, userId, username, photo, id: doc.id,
                    };
                });
                setTweet(tweets);
            })
        }; //tweet불러오기
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        }// unsubscribe함수 호출 ->timeline 컴포넌트 사용되지 않을때 호출됨
    }, [])//fetchTweets호출하기
    return <Wrapper>
        {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
        ))}
    </Wrapper>
}