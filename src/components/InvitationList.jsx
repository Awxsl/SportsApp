import { useEffect, useState } from "react"
import InvitationCard from "./InvitationCard"
import {db} from '../firebase.config'
import { getAuth } from "firebase/auth"
import {collection, query, getDocs, where, orderBy, limit} from 'firebase/firestore'


function InvitationList() {

  const auth = getAuth()

    const[invites, setInvites] = useState([])
    const[loading, setLoading] = useState(true)

    useEffect(() => {

      const getInvites = async () => {
        const invitationRef = collection(db, 'invitations')
        const q = query(invitationRef, where('sentTo', '==', auth.currentUser.uid), where('status', '==', 'pending'), orderBy('timestamp', 'desc'), limit(10))
        const querySnap = await getDocs(q)

        const snaps = []
        querySnap.forEach((snap) => snaps.push({
          id: snap.id,
          data: snap.data()
        }))

        // console.log(snaps)

        setInvites(snaps)
        setLoading(false)

      }

      getInvites()
    }, [])

    if(loading) {
      return (<h1>Loading...</h1>)
    }

    if(!loading && invites.length === 0) {
      return(<h1 className="centeredMessage">لاتوجد دعوات</h1>)
    }


  return (
    <div className="invitationList">
        {invites.map((invite) => <InvitationCard invite={invite} />)}
    </div>
  )
}


export default InvitationList