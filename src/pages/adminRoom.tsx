import { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/Roomcode'
import '../style/room.scss'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/auth'
import { Question } from '../components/question'
import { useRoom } from '../hooks/useRoom'
import cn from 'classnames'


type RoomParams = {
    id: string;
}

export function AdminRoom() { 
    const history = useHistory();
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('');
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endeAt: new Date(),
        })
        history.push('/');
    }   
      
async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === ''){
        return
    }
    if (!user){
        throw new Error('Você precisa estar logado');
    }
    const question = {
        content: newQuestion,
        author: {
            name: user.name,
            avatar: user.avatar,
        },
        isHighlighted: false,
        isAnswered: false
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
}

async function handleDeleteQuestion(questionsId: string) {
   if (window.confirm('Tem Certeza que deseja excluir esta pergunta')) {
       await database.ref(`rooms/${roomId}/questions/${questionsId}`).remove();
   }
    
}

async function handleCheckQuestionAsAnswered (questionsId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionsId}`).update({
        isAnswered: true,
    })
}

async function handleHighlitQuestion(questionsId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionsId}`).update({
        isHighlighted: true,
    })
}

    return(
      <div id="page-room">
          <header>
              <div className="content">
                <img src={logoImg} alt="Letmeask" />
                <div>
              <RoomCode code={ roomId }/>
              <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
              </div>
              </div>
          </header>
      <main className="content">
          <div className="room-title">
              <h1>Sala {title}</h1>
              { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
          </div>
        
            {questions.map(questions => {
                return(
                    <Question 
                    key= {questions.id}
                      content={questions.content}
                      author={questions.author}
                      isAnsewered={questions.isAnswered}
                      isHighlighted={questions.isHighlighted}
                      >
                        {!questions.isAnswered && (  
                            <>
                                <button 
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswered(questions.id)}
                                >
                                    <img src={checkImg} alt="Marcar como respondido" />
                                </button> 
                                
                                <button 
                                type="button"
                                onClick={() => handleHighlitQuestion(questions.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque" />
                                </button>
                        </>
                        )}

                         <button 
                         type="button"
                         onClick={() => handleDeleteQuestion(questions.id)}
                         >
                             <img src={deleteImg} alt="remover pergunta" />
                        </button> 
                      </Question>
                );
            })}
      </main>
      </div>

    );

    
}