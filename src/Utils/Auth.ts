import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "@firebase/auth";
import { auth } from "../firebaseConfig";
import {
	check_users_database,
	create_user,
	get_users_organization,
} from "./Backend";
import { setOrganisationList, setUserId } from "../redux/reducers/AuthSlice";
import { store } from "../redux/store";

//Function to handle authentication from google
export const authWithGithub = () => {
	const provider = new GithubAuthProvider();
	signInWithPopupCall(provider);
};

//Function to handle authentication from google
export const authWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	const navigate = signInWithPopupCall(provider)
    console.log(navigate);
};

//Function for popup auth
const signInWithPopupCall = (
	provider: GoogleAuthProvider | GithubAuthProvider
) => {
	signInWithPopup(auth, provider)
		.then(async (result: any) => {

			const user = result.user;
			const isUser = await check_users_database(user.uid);
            

			if (isUser) {
				const organisationList = await get_users_organization(user.uid);
				console.log(organisationList);
                store.dispatch(setUserId(user.uid));
                if(organisationList)
                    store.dispatch(setOrganisationList(organisationList));
			} else {
				let userDetails: TYPE_USER = {
					id: user.uid,
					name: user.displayName,
					avatar: user.photoURL,
					email: user.email,
					organisation: [],
				};

				//Create user and redirect to create organization
				await create_user(userDetails);
				store.dispatch(setUserId(user.uid));
			}
		})
		.catch((error) => {
			const errorMessage = error.message;
			console.log(errorMessage);
		});
};
