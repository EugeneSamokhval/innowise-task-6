import { db } from '@/main'
import { getDoc, doc } from 'firebase/firestore'

export default async function userDataFetching(userId) {
  const docLink = await getDoc(doc(db, 'users', userId))
  const userData = docLink.data()
  return userData
}
