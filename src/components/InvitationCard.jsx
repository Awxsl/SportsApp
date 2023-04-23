import { useEffect, useState } from 'react'
import {FaCheck, FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'

function InvitationCard({invite}) {

    const[loading, setLoading] = useState(true)
    const[user, setUser] = useState({}) 
    const{name, bio, avatarUrl} = user

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        const response = await getDoc(doc(db, 'users', invite.data.sentBy))
        const data = await response.data()
        setUser(data)
        setLoading(false)
    }

    const handleAction = async (e) => {
        if(e.target.id === 'Reject') {
            await updateDoc(doc(db, 'invitations', invite.id), {status: 'rejected'})
            console.log('reject')
        } 
        else {
            await updateDoc(doc(db, 'invitations', invite.id), {status: 'accepted'})
            console.log('accept')
        } 
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

  return (
    <div className="invitationCard" key={invite.id}>
        <img src={avatarUrl} alt="dsd" className="invitationCardImage"/>
        <Link style={{ color: 'black' }} to={`/users/${invite.data.sentBy}`}>
            <div className="invitationCardDetails">
                <h3 className="invitationCardName">{name}</h3>
                <p className="invitationCardDetailsDescription" dir='rtl'>
                    {bio.substring(0, 30) + '...'}
                </p>
            </div>
        </Link>
            <div className="invitationCardButtons">
                <div className="invitationCardButtonsAccept" id='Accept' onClick={handleAction}>
                    <FaCheck/>
                </div>
                <div className="invitationCardButtonsReject" id='Reject' onClick={handleAction}>
                    <FaTimes/>
                </div>
            </div>
    </div>
  )
}

export default InvitationCard