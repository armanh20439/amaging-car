import { useEffect, useState } from "react";
import initializeFiebase from "../pages/Firebase/firebase.init";
import { getAuth,GoogleAuthProvider ,signInWithPopup, createUserWithEmailAndPassword,signOut,onAuthStateChanged,signInWithEmailAndPassword   } from "firebase/auth";

initializeFiebase()
const useFirebase=()=>{
  const googleProvider = new GoogleAuthProvider();
  const [authError, setAuthError] = useState('');
    const [user,setUser]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const auth = getAuth();
    
    //google signIn
    const googleSinIn=(email,password)=>{
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAuthError('')
        const user = result.user;
        setUser(user)
        
      }).catch((error) => {
        setAuthError(error.message);
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

    const registerUser=(email,password,location,history)=>{
      setIsLoading(true);
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Signed in 
            const destination=location?.state?.from ||'/'
        history.replace(destination)
            
            setAuthError('')
            // ...
          })
          .catch((error) => {
            
            setAuthError(error.message);
            // ..
          })
          .finally(() => setIsLoading(false));
    }

   

     
// log in 

const loginUser = (email, password,location,history) => {
  setIsLoading(true);
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const destination=location?.state?.from ||'/'
        history.replace(destination)
          
          setAuthError('');
      })
      .catch((error) => {
          setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
}

// observer user state
useEffect(() => {
  const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
          setUser(user);
      } else {
          setUser({})
      }
      setIsLoading(false);
  });
  return () => unsubscribed;
}, [])

    //logout
    const logOut=()=>{
      setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(() => setIsLoading(false));

    }

    return{
        user,
        isLoading,
        authError,
        registerUser,
        logOut,
        loginUser,
        googleSinIn
    }

}

export default useFirebase;