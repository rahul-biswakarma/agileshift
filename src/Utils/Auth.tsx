import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../firebaseConfig";

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

            const user = result.user;
            console.log(user);

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
                //Action if user exists
                //list all the organizations for user
            }else{
                    let userDetails: TYPE_USER = {
                        id: user.uid,
                        name:user.name,
                        avatar: user.photoURL,
                        email: user.email,
                        organisation:[]
                    };
                    //Create user and redirect to create organization
            }

        }).catch((error) => {
            const errorMessage = error.message;
        });
}