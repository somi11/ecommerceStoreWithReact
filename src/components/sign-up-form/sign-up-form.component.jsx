import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'
import './sign-up-form.styles.scss'
const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields)
  const { displayName, email, password, confirmPassword } = formFields
  const resetFormFields = () => {
    setFormFields(defaultFromFields)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }
    try {
      let country = 'pakistan'
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName, country })
      alert('Account Created Sucessfully')
      resetFormFields()
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      }
      console.log(e)
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  //  console.log(formFields)

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
