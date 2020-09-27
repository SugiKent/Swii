import "firebase/firestore";

import firebase, {db} from './../config/firebaseConf'

const fetchUid = () => {
  const user = firebase.auth().currentUser;
  const userId = String(user?.uid)
  return userId
}

export const fetchMonthlyData = (): firebase.firestore.Query<firebase.firestore.DocumentData> => {
  const result = db.collection('users').doc(fetchUid()).collection('monthly').limit(30)
  return result;
}

export const updateDataByYidAndLabel = (collectionName: string, id: string, value: Object) => {
  db.collection('users')
    .doc(fetchUid())
    .collection(collectionName)
    .doc(id)
    .set({ ...value, updatedAt: new Date()}, { merge: true })
}
