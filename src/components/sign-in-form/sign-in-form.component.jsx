import { useState } from 'react'
import {
  signInWithGooglePopup,
  loginUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
const defaultFromFields = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields)
  const { email, password } = formFields
  const resetFormFields = () => {
    setFormFields(defaultFromFields)
  }

  const loginWithGoogle = async () => {
    await signInWithGooglePopup()
    // await createUserDocumentFromAuth(user)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { user } = await loginUserWithEmailAndPassword(email, password)

      // setCurrentUser(user)
      alert('login successful')
      resetFormFields()
    } catch (e) {
      switch (e.code) {
        case 'auth/wrong-password':
          alert('incorrect password')
          break
        case 'auth/user-not-found':
          alert('incorrect email')
          break
        default:
          console.log(e)
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>{' '}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Passowrd"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={loginWithGoogle}>
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
