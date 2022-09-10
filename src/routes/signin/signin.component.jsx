import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
const SignIn = () => {
  //   const logGoogleUserRedirect = async () => {
  //     const response = await getRedirectResult(auth)
  //     console.log(response)
  //     if (response) {
  //       const userDocRef = await getUserDocumentFromAuth(response.user)

  //       console.log(userDocRef)
  //     }
  //   }
  //   useEffect(() => {
  //     logGoogleUserRedirect()
  //   }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()

    const userDocRef = await createUserDocumentFromAuth(user)

    console.log(userDocRef)
  }

  return (
    <div className="sign-in">
      <h1>SignIn page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
