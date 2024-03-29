import React from 'react'
import {db} from '../Firebase.config'
import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

export const OAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick =  async e => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
 
        // Check for user
        const docRef = doc(db, 'users', user.uid) 
        console.log(docRef)
        const docSnap = await getDoc(docRef)
        try {


            // if user does not exist, create user
            if(!docSnap.exists()) {

                // save user to firebase
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp() 
                })
            }
            navigate('/')
        } catch (error) {
            toast.error("Could not authorize with Google")
            console.log(error)
            
        }
    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up'? 'Up': "In"} with</p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>

    </div>
  )
}
