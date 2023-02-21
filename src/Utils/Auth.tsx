import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../firebaseConfig";
import { check_users_database, create_user, get_users_organization } from "./Backend";
import { setUserId } from "../redux/reducers/AuthSlice";
import {store} from "../redux/store"

//Function to handle authentication from google
export const authWithGithub = () =>{
    const provider = new GithubAuthProvider();
    signInWithPopupCall(provider)
}

//Function to handle authentication from google
export const authWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopupCall(provider)
}


//Function for popup auth 
const signInWithPopupCall = (provider:GoogleAuthProvider | GithubAuthProvider) =>{

    signInWithPopup(auth, provider)
        .then(async (result:any) => {
            // const dispatch = useAppDispatch();

            const user = result.user;
            const isUser = await check_users_database(user.uid) 
            
            if (isUser) {
                //Action if user exists
                //list all the organizations for user
                const organisationList = await get_users_organization(user.uid)

            }else{
                    let userDetails: TYPE_USER = {
                        id: user.uid,
                        name:user.displayName,
                        avatar: user.photoURL,
                        email: user.email,
                        organisation:[]
                    };

                    //Create user and redirect to create organization
                    await create_user(userDetails)
                    store.dispatch(setUserId(user.uid))
            }

        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}