<script>
import HomeCalendar from '@/components/HomeCalendar.vue'
import { generateYearData } from '@/logic/constructCalendar.js'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../main.js'
import { getAuth } from 'firebase/auth'
import HomeTaskList from '@/components/HomeTaskList.vue'

async function getUserData() {
  const userId = getAuth().currentUser?.uid
  if (!userId) {
    console.error('No user is logged in.')
    return null
  }

  console.log('Fetching data for user ID:', userId)

  try {
    const userDataDoc = await getDoc(doc(db, 'users', userId))
    if (userDataDoc.exists()) {
      console.log('User data fetched:', userDataDoc.data())
      return userDataDoc.data()
    } else {
      console.error('No user data found for the given ID.')
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
export default {
  components: { HomeCalendar, HomeTaskList },
  data() {
    return {
      calendarData: [],
      userData: [],
    }
  },
  async mounted() {
    try {
      const fetchedUserData = await getUserData()
      if (fetchedUserData) {
        this.userData = fetchedUserData
        this.calendarData = await generateYearData(fetchedUserData)
        console.log('Calendar data loaded:', this.calendarData)
      } else {
        console.error('Failed to fetch or process user data.')
        this.calendarData = []
      }
    } catch (error) {
      console.error('Error while fetching user data:', error)
      this.calendarData = []
    }
  },
}
</script>

<template>
  <main>
    <Suspense>
      <HomeCalendar
        :calendarData
        v-if="calendarData.length"
        :calendarEntries="calendarData"
      ></HomeCalendar>
    </Suspense>
    <HomeTaskList></HomeTaskList>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - 80px);
  width: 100vw;
  overflow-x: hidden;
  background-color: #ffebd4;
}
</style>
