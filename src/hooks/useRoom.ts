import { useEffect, useState } from "react";
import { isCallLikeExpression } from "typescript";
import { database } from "../services/firebase";
import { useAuth } from "./auth";

type QuestionType = {
    id: string;
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
    likeCount: number;
    likeId: string | undefined;
}


type FirebaseQuestion = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
    likes: Record<string, {authorId: string}>
}>

export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const[title, setTitle] = useState ('') ;
    const { user } = useAuth();
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        
        roomRef.on('value', room => {
            
            const databaseRoom = room.val()
            const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {};
            const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value])  => {
                return  {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],

                }      
                
            })
            
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestion)
        })
    
            return () => {
                roomRef.off('value');
            }
    }, [roomId]);
    
        return{ questions, title }
}