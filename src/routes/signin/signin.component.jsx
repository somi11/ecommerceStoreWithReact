import { signInWithGooglePopup, getUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()

    const userDocRef = await getUserDocumentFromAuth(user)
    console.log(userDocRef)
  }

  return (
    <div className="sign-in">
      <h1>SignIn page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  )
}

export default SignIn
