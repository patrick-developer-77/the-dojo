import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAX_l2FJ2oGpTDhwEGuVUew2bF2l2HMQsc',
	authDomain: 'thedojosite-f6b43.firebaseapp.com',
	projectId: 'thedojosite-f6b43',
	storageBucket: 'thedojosite-f6b43.appspot.com',
	messagingSenderId: '1018249185129',
	appId: '1:1018249185129:web:fd44127ee3d13c1dfe1ff8',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }
