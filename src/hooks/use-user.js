
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';





export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState();
  
    useEffect(() => {
      async function getUserObjByUserId(userId) {
        const [user] = await getUserByUserId(userId);
        setActiveUser(user || {});
      }
  
      if (userId) {
        getUserObjByUserId(userId);
      }
    }, [userId]);
  
   
  
    return { user: activeUser, setActiveUser };
  }




/*


export default function useUser() {
    const [ activeUser, setActiveUser ] = useState({});
    const  { user }  = useContext(UserContext);


    useEffect(() => {

        async function GetUserObjByUserId() {
        
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);

        }
        if (user?.uid) {
            GetUserObjByUserId();
        }
    }, [user]);

    console.log(user);

    return { user: activeUser };
}


*/

