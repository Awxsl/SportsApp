import UserCard from "./UserCard"
import {collection, query, getDocs, where, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useEffect, useState } from 'react'

function UsersList() {

  const[users, setUsers] = useState([])
  const[isLoading, setIsLoading] = useState(true)
  const[userLimit, setUserLimit] = useState(0) 

useEffect(() => {
  // const getUsers = async () => {
  //   const collectionRef = collection(db, 'users')
  //   const q = query(collectionRef, orderBy('age', 'desc'), limit(userLimit+10), startAt(userLimit))
  //   const querySnap = await getDocs(q)
  //   var users = []
  //   querySnap.forEach((doc) => users.push({data: doc.data()}))
  //   setUsers(users)
  //   setIsLoading(false)
  // }
  getUsers()

}, [])

const getUsers = async () => {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef, orderBy('age', 'desc'), where('gender', '==', window.localStorage.getItem('gender')), limit(userLimit+10))
  const querySnap = await getDocs(q)
  var users = []
  querySnap.forEach((doc) => users.push({data: doc.data()}))
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
       {users.length % 10 === 0 && <div className="btnDiv">
          <button className="btn btnLoad"
          onClick={getUsers}>حمّل مستخدمين اكثر
          </button>
        </div>}
      </div>
    )
  }
}

export default UsersList