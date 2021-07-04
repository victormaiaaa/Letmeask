import { FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "../style/auth.scss"
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/button";
import { database } from "../services/firebase"
import { useAuth } from "../hooks/auth"
// import userEvent from "@testing-library/user-event"



export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');


    async function createRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim()=== '') {
            return;
        }
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/room/${firebaseRoom.key}`)
    }

    return ( 
<div id="page">
    <aside>    
        <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp; A ao vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo real</p>
    </aside>
    <main>
        <div className="main-content">
        <img src={logoImg} alt="Letmeask" />
       <h2>Criar uma nova sala</h2>
        <form onSubmit={createRoom}>
            <input 
            type="text"  
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">
           Criar sala     
            </Button>
        </form>
        <p>Quer entrar em uma sala já existente? <Link to="/">clique aqui</Link></p>
        </div>
    </main>
</div>
    )
}