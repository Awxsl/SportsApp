import UserCard from "./UserCard"
import {collection, query, getDocs, where, orderBy, limit} from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import {db} from '../firebase.config'
import { useEffect, useState } from 'react'

function UsersList() {

  const auth = getAuth()

  const[users, setUsers] = useState([])
  const[isLoading, setIsLoading] = useState(true)
  const[userLimit, setUserLimit] = useState(0) 

useEffect(() => {
  getUsers()

}, [])

const getUsers = async () => {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, orderBy('age', 'desc'), where('gender', '==', window.localStorage.getItem('gender')), limit(userLimit+10))
  const querySnap = await getDocs(q)
  var users = []
  querySnap.forEach((doc) => {
    if(doc.id !== auth.currentUser.uid)
    users.push({data: doc.data()})
  })
  setUsers(users)
  setIsLoading(false)
  setUserLimit((prevState) => prevState+10)
}


  if(isLoading) {
    return (<h1>Loading...</h1>)
  }

  else {
    return (
      <div className="usersList">
        {users.map((user) => <UserCard user={user}/>)}
       {users.length % 9 === 0 && <div className="btnDiv">
          <button className="btn btnLoad"
          onClick={getUsers}>حمّل مستخدمين اكثر
          </button>
        </div>}
      </div>
    )
  }
}

export default UsersList