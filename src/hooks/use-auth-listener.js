import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';



export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const auth = getAuth();

    useEffect(() => {
       
        const listener = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                localStorage.setItem('user', JSON.stringify(authUser));
                setUser(authUser);
                

            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }

        });
        return () => listener();
    }, [auth]);

    return { user };

}



