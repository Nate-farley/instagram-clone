import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from '../constants/routes';



export default function Profile() {
    const { username } = useParams();
  const [user, setUser] = useState(null);
    const history = useNavigate();

useEffect(() => {
        async function checkUserExists() {
          const [ user ] = await getUserByUsername(username);
          if (user?.userId) {
            setUser(user);
          } else {
            history(ROUTES.NOT_FOUND);
          }
        }
    
        checkUserExists();
        console.log('user', user)
      }, [username, history]);
    
      return user?.username ? (
        <div className="bg-gray-background">
       
          <div className="mx-auto max-w-screen-lg">
          
          </div>
        </div>
      ) : null;
    }

