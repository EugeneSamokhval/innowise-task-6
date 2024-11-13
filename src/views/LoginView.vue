<script>
import PopUp from '@/components/icons/PopUp.vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

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
    signin() {
      signInWithEmailAndPassword(getAuth(), this.emai, this.password)
        .then((data) => {
          console.log('Signed in:', data)
          this.$router.push('/')
        })
        .catch((error) => {
          this.errormessage = this.HandleLoginErrors(error.message)
          this.$refs.popup.openPopup()
        })
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.errormessage = this.HandleRegisterErrors(error.message)
          this.$refs.popup.openPopup()
        })
    },
    HandleLoginErrors(errorcode) {
      let currentErrorMessage = ''
      errorcode = errorcode.replace('Firebase: Error (', '').replace(').', '')
      switch (errorcode) {
        case 'auth/wrong-password':
          currentErrorMessage = 'The password is incorrect'
          break
        case 'auth/user-not-found':
          currentErrorMessage = 'No user found with this email'
          break
        case 'auth/operation-not-allowed':
          currentErrorMessage = 'This operation is not allowed'
          break
        case 'auth/invalid-credential':
          currentErrorMessage = 'The provided credential is invalid'
          break
        case 'auth/account-exists-with-different-credential':
          currentErrorMessage = 'An account already exists with a different credential'
          break
        case 'auth/expired-action-code':
          currentErrorMessage = 'The action code has expired'
          break
        case 'auth/invalid-action-code':
          currentErrorMessage = 'The action code is invalid'
          break
        case 'auth/app-deleted':
          currentErrorMessage = 'The Firebase app has been deleted'
          break
        case 'auth/invalid-email':
          currentErrorMessage = "Email isn't valid"
          break
        case 'auth/invalid-password':
          currentErrorMessage = 'Incorrect password'
          break
        default:
          currentErrorMessage = 'An unknown error occurred'
          break
      }
      return currentErrorMessage
    },
  },
}
</script>

<template>
  <div id="login-form">
    <label class="registration-login-label" for="user-name-input">Username</label>
    <input class="registration-input" type="text" name="user-name-input" />
    <label class="registration-login-label" for="password-input">Password</label>
    <input class="registration-input" type="password" name="password-input" />
    <div class="register-bottom-buttons-layout">
      <button @click="signInWithGoogle" class="register-google-button">
        <span>Login with google</span
        ><img class="google-logo" src="../assets/google-icon-logo-svgrepo-com.svg" />
      </button>
      <a class="login-to-registration-links" href="/register">Isn't registered yet?</a>

      <input type="submit" class="big-flat-button accept-button" value="Submit" @click="signin" />
    </div>
  </div>
  <PopUp ref="popup">{{ this.errormessage }}</PopUp>
</template>

<style scoped>
#login-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 41px 60px) 127px;
  justify-items: center;
  align-content: center;
  gap: 15px;
  height: calc(100vh - 80px);
  background-color: #ffebd4;
}
</style>
