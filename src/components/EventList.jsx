import EventCard from "./EventCard"
import {collection, query, getDocs, where, orderBy, limit} from 'firebase/firestore'
import { FaPlus } from "react-icons/fa"
import {db} from '../firebase.config'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"

function UsersList() {

  const navigate = useNavigate()

  const[users, setUsers] = useState([])
  const[isLoading, setIsLoading] = useState(true)
  const[userLimit, setUserLimit] = useState(0) 

useEffect(() => {
  getUsers()

}, [])

const getUsers = async () => {
  const collectionRef = collection(db, 'events')
  const q = query(collectionRef, limit(userLimit+10))
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
      <div className="eventWrapper">
      <div className="usersList">
        {users.map((user) => <EventCard user={user}/>)}
       {users.length % 10 === 0 && <div className="btnDiv">
          <button className="btn btnLoad"
          onClick={getUsers}>حمّل فعاليات اكثر
          </button>
        </div>}
      </div>
        <Link to='/addevent'>
          <FaPlus className="addEvent"/>
        </Link>
        </div>
    )
  }
}

export default UsersList