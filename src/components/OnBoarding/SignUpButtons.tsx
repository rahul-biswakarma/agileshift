import React from "react";

import InfoIcon from "../../assets/icons/info-icon.svg";
import GithubIcon from "../../assets/icons/github-icon.svg";
import GoogleIcon from "../../assets/icons/google-icon.svg";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, db } from "../../firebaseConfig";
// import { doc, getDoc } from "@firebase/firestore";

function SignUpButtons() {

	//Function to handle authentication from google
	const authWithGoogle = () =>{
        const provider = new GoogleAuthProvider();
        
        signInWithPopup(auth, provider)
            .then(async (result:any) => {

                const user = result.user;
				console.log(user);

                // const docRef = doc(db, "users", user.uid);
                // const docSnap = await getDoc(docRef);
                
                // if (docSnap.exists()) {
                // }else{
                //     let userDetails:User = {
                //         id: user.uid,
                //         name: user.displayName,
                //         avatar: user.photoURL,
                //         email: user.email,
                //         status: "Active",
                //         timezone: "",
                //         phoneNumber: user.phoneNumber,
                //         workspace: [],
                //         directMessages:[]
                //     };
                //     props.setUser(userDetails);
                    
                //     handleSignUp();
                // }

            }).catch((error) => {
                const errorMessage = error.message;
        });
    }

	//Function to handle authentication from google
    const authWithGithub = () =>{
		const provider = new GithubAuthProvider();

		signInWithPopup(auth, provider)
		.then(async (result) => {

			const user = result.user;
			console.log(user);

			// const docRef = doc(db, "users", user.uid);
			// const docSnap = await getDoc(docRef);
			
			// if (docSnap.exists()) {
			// 	props.setUser(docSnap.data());
			// 	handleSignUpNavigation();
			// }else{
			// 	let userDetails:any = {
			// 		id: user.uid,
			// 		name: user.displayName,
			// 		avatar: user.photoURL,
			// 		email: user.email,
			// 		status: "Active",
			// 		timezone: "",
			// 		phoneNumber: user.phoneNumber,
			// 		workspace: [],
			// 		directMessages:[]
			// 	};
			// 	props.setUser(userDetails);
				
			// 	handleSignUp();
			// }
		}).catch((error) => {
			const errorMessage = error.message;
		});
    }

	return (
		<div className="flex flex-col gap-[1rem] w-full max-[400px]:mt-[2rem] mt-[4rem]">

			{/* Google Authentication Button */}
			<button
				data-testid="continue-with-google-button"
				className="relative w-full bg-blue_1 p-[0.5rem_1rem] rounded flex flex-wrap items-center"
				onClick={()=>authWithGoogle()}
			>
				<img
					src={GoogleIcon}
					alt="Google Icon"
					className="w-6 h-6"
				/>
				<span className="absolute text-center w-full text-white text-sm font-[500] ml-2">
					Continue with Google
				</span>
			</button>

			{/* Github Authentication Button */}
			<button
				data-testid="continue-with-github-button"
				className="relative w-full bg-dark_gray p-[0.5rem_1rem] rounded flex items-center flex-wrap"
				onClick={()=>authWithGithub()}
			>
				<img
					src={GithubIcon}
					alt="Google Icon"
					className="w-6 h-6"
				/>
				<span className="absolute text-center w-full text-white text-sm font-[500] ml-2">
					Continue with Github
				</span>
			</button>
			
			<div className="flex items-center gap-[10px]">
				<img
					src={InfoIcon}
					alt="Info Icon"
					className="w-5 h-5"
				/>
				<p className="text-sm text-black/40">
					We recommend using your work email
				</p>
			</div>
		</div>
	);
};

export { SignUpButtons };
