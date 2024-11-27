<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../main'

export default {
  data() {
    return { visible: false, current: 'warm' }
  },
  methods: {
    showMenu() {
      this.visible = true
    },
    dissmissMenu() {
      this.visible = false
    },
    async updateUserTheme() {
      const id = getAuth().currentUser?.uid

      const userDoc = await getDoc(doc(db, 'users', id))
      const userData = userDoc.data()
      userData.theme = this.current

      await setDoc(doc(db, 'users', id), userData)
    },
    signOutHandler() {
      const auth = getAuth()
      if (auth) {
        signOut(auth)
      }
      this.$router.push('/login')
    },
  },
  watch: {
    current(newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme)
      this.updateUserTheme()
    },
  },
  async mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))

        const userData = userDoc.data()

        this.current = userData.theme

        document.documentElement.setAttribute('data-theme', this.current)
      }
    })
  },
}
</script>
<template>
  <img
    src="../assets/menu.svg"
    id="dropdown-menu"
    height="48px"
    width="48px"
    @click.capture="showMenu"
  />
  <div v-if="visible" class="theme-menu-back-padding" @click="dissmissMenu">
    <div class="theme-switcher">
      <div class="option">
        <input name="white" type="radio" value="white" v-model="current" />
        <label for="white"> White theme</label>
      </div>
      <div class="option">
        <input name="dark" type="radio" value="dark" v-model="current" />
        <label for="dark"> Dark theme</label>
      </div>
      <div class="option">
        <input name="warm" type="radio" value="warm" v-model="current" />
        <label for="warm"> Warm theme</label>
      </div>
      <div class="option">
        <input name="cold" type="radio" value="cold" v-model="current" />
        <label for="cold"> Cold theme</label>
      </div>
      <button @click="signOutHandler" class="log-out-button">
        <img width="48px" height="48px" src="../assets/log-out.svg" />
        <p class="log-out-button-text">Sign Out</p>
      </button>
    </div>
  </div>
</template>
<style lang="css">
.theme-switcher {
  position: absolute;
  right: 25px;
  top: 25px;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 999;
  background-color: var(--info-color);
  width: 200px;
  height: 270px;
  border-radius: 25px;
  padding: 10px;
}
.option {
  background-color: var(--subtle-color);
  border-radius: 15px;
  height: 50px;
  width: 180px;
  padding-left: 15px;
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: center;
  justify-content: center;
}
.theme-menu-back-padding {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.2);
}
.log-out-button {
  border-radius: 15px;
  width: 200px;
  height: 50px;
  font-size: 24px;
  border-width: 0px;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-color);
  grid-template-columns: 50px 1fr;
  color: var(--secondary-color);
}
.log-out-button-text {
  margin: 0px;
}
#dropdown-menu {
  margin-right: 36px;
  margin-left: auto;
  height: 48px;
  width: 48px;
  float: right;
  z-index: 97;
  cursor: pointer;
}
label {
  font-size: 24px;
  height: 25px;
  width: 150px;
  color: var(--secondary-color);
}
input {
  height: 24px;
  width: 24px;
}
</style>
