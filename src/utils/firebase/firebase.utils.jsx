import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyC1xsfJ0RlpBhJVozjUisiFg0WpQUqZEfg',
  authDomain: 'pak-clothing-db.firebaseapp.com',
  projectId: 'pak-clothing-db',
  storageBucket: 'pak-clothing-db.appspot.com',
  messagingSenderId: '773248083141',
  appId: '1:773248083141:web:ec6a9a9e470d88a5f57cac',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const getUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (e) {
      console.log(`error creating user`, e.message)
    }
  }
  return userDocRef
}