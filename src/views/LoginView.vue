<script>
import PopUp from '@/components/InfoPopUp.vue'
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
      email: '',
      password: '',
      errormessage: '',
    }
  },

  methods: {
    signin() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
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
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.errormessage = this.HandleRegisterErrors(error.message)
          this.$refs.popup.openPopup()
        })
    },

    HandleLoginErrors(errorcode) {
      const errorMessages = new Map([
        ['auth/wrong-password', 'The password is incorrect'],
        ['auth/user-not-found', 'No user found with this email'],
        ['auth/operation-not-allowed', 'This operation is not allowed'],
        ['auth/invalid-credential', 'The provided credential is invalid'],
        [
          'auth/account-exists-with-different-credential',
          'An account already exists with a different credential',
        ],
        ['auth/expired-action-code', 'The action code has expired'],
        ['auth/invalid-action-code', 'The action code is invalid'],
        ['auth/app-deleted', 'The Firebase app has been deleted'],
        ['auth/invalid-email', "Email isn't valid"],
        ['auth/invalid-password', 'Incorrect password'],
      ])

      errorcode = errorcode.replace('Firebase: Error (', '').replace(').', '')

      return errorMessages.get(errorcode) || 'An unknown error occurred'
    },
  },
}
</script>

<template>
  <div class="login-form">
    <label class="registration-login-label" for="user-name-input">Username</label>
    <input class="registration-input" type="text" name="user-name-input" v-model="email" />
    <label class="registration-login-label" for="password-input">Password</label>
    <input class="registration-input" type="password" name="password-input" v-model="password" />
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
.login-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 41px 60px) 127px;
  justify-items: center;
  align-content: center;
  gap: 15px;
  height: calc(100vh - 80px);
  background-color: var(--muted-color);
}
</style>
