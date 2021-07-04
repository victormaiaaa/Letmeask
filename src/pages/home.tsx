import { useHistory } from "react-router-dom"
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleImg from "../assets/images/google-icon.svg"
import { Button } from "../components/button";
import "../style/auth.scss"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase";
import { useAuth } from "../hooks/auth";




export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomsCode, setRoomsCode] = useState('');

    async function handleCreateRoom () {
        if (!user ){
            await signInWithGoogle()
        }
        history.push('/room/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        if(roomsCode.trim() === ''){
            return
        }

            const roomRef = await database.ref(`rooms/${roomsCode}`).get();

        if (roomRef.val().endeAt) {
            alert('A sala já está fechada.')
            return;
        }
     

        if(!roomRef.exists()){
            alert('Essa sala não existe!')
            return;
        }
        history.push(`/rooms/${roomsCode}`);

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
        <button className="create-room" onClick={handleCreateRoom}> 
        <img src={googleImg} alt="Logo do Google" />
        Crie sua sala com o Google
        </button>
        <div className="separador">ou entre em uma sala</div>
        <form onSubmit={handleJoinRoom}>
            <input 
            type="text"  
            placeholder="Digite o codigo da sala"
            onChange={event => setRoomsCode(event.target.value) }
            value={roomsCode}
            />
            <Button type="submit">
            Entrar na sala     
            </Button>
        </form>
        </div>
    </main>
</div>
    )
}