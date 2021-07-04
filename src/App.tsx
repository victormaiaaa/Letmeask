import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { createContext, useState, useEffect, useContext } from "react";
import { Home } from "./pages/home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/room";
// import { auth, firebase } from "./services/firebase";
import { AuthContextProvider } from "./context/authContext";
import { AdminRoom } from "./pages/adminRoom";

// type AuthContextType = {
//     user: User | undefined;
//     singInWithGoogle: () => Promise<void>;
// }
// type User = {
//     id: string,
//     name: string,
//     avatar: string,
// }

// export const AuthContextType = createContext({} as AuthContextType);

export function App(){
    // const [user, setUser] = useState<User>();
    // useEffect(() => {
    //     const unsubscrbe = auth.onAuthStateChanged(user => {
    //         if(user){
    //         const { displayName, photoURL, uid } = user   
                
    //             if (!displayName || !photoURL) {
    //                 throw new Error ('Missing information from Google Account.');
    //             }
    //             setUser({
    //                 id: uid,
    //                 avatar: photoURL,
    //                 name: displayName,

    //             })

    //         }
    //     })
    //     return () => {
    //         unsubscrbe();
    //     }
    // }, [])
    // async function singInWithGoogle() {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     const result = await auth.signInWithPopup(provider);
    //         if (result.user){
    //             const { displayName, photoURL, uid } = result.user   
                
    //             if (!displayName || !photoURL) {
    //                 throw new Error ('Missing information from Google Account.');
    //             }
    //             setUser({
    //                 id: uid,
    //                 avatar: photoURL,
    //                 name: displayName,

    //             })
    //         }
    //     }

return(
    <BrowserRouter>
    <AuthContextProvider>
    <Switch>
    <Route path="/" exact component={Home}  />    
    <Route path="/room/new" component={NewRoom}  />
    <Route path="/room/:id" component={Room}  />
    <Route path="/admin/room/:id" component={AdminRoom}  />
    
    </Switch>
    </AuthContextProvider> 
     </BrowserRouter>

)};


 