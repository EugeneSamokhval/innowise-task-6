<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../main'
import PopUp from '@/components/InfoPopUp.vue'
export default {
  components: { PopUp },
  data() {
    return {
      emai: '',
      password: '',
      errormessage: '',
    }
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.emai, this.password)
        .then((userCredential) => {
          const user = userCredential.user

          return setDoc(doc(db, 'users', user.uid), {
            username: this.emai,
            tasks: [],
          })
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.errormessage = this.HandleRegisterErrors(error.message)
          this.$refs.popup.openPopup()
        })
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          const user = result.user

          return setDoc(doc(db, 'users', user.uid), {
            username: this.email,
            tasks: [],
          })
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.errormessage = this.HandleRegisterErrors(error.message)
          this.$refs.popup.openPopup()
        })
    },

    HandleRegisterErrors(errorcode) {
      const errorMessages = new Map([
        ['auth/email-already-exists', 'Email already exists'],
        ['auth/invalid-email', "Email isn't valid"],
        ['auth/invalid-password', 'Incorrect password'],
        ['auth/weak-password', 'Password is too weak. Write a stronger one.'],
        ['auth/user-disabled', 'Current user has been disabled'],
        ['auth/operation-not-allowed', 'This operation is not allowed'],
      ])

      errorcode = errorcode.replace('Firebase: Error (', '').replace(').', '')

      return errorMessages.get(errorcode) || errorcode
    },
  },
}
</script>

<template>
  <div class="registration-form">
    <label class="registration-login-label" for="user-name-input">Email</label>
    <input class="registration-input" type="text" name="user-name-input" v-model="emai" />
    <label class="registration-login-label" for="password-input">Password</label>
    <input class="registration-input" type="password" name="password-input" v-model="password" />
    <div class="register-bottom-buttons-layout">
      <button @click="signInWithGoogle" class="register-google-button">
        <span>Register with google</span
        ><img class="google-logo" src="../assets/google-icon-logo-svgrepo-com.svg" />
      </button>
      <a class="login-to-registration-links" href="/login">Already registered?</a>

      <input type="submit" class="big-flat-button accept-button" value="Submit" @click="register" />
    </div>
  </div>
  <PopUp ref="popup">{{ this.errormessage }}</PopUp>
</template>

<style scoped>
.registration-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 41px 60px) 127px;
  gap: 15px;
  justify-items: center;
  align-content: center;
  height: calc(100vh - 80px);
  background-color: var(--muted-color);
}
</style>
