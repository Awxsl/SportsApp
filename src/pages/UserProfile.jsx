import {FaMapMarkerAlt, FaUser} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {collection, query, where, orderBy, limit, getCountFromServer, getDocs, addDoc, serverTimestamp} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate } from 'react-router-dom'

function UserProfile() {


  const {userId} = useParams()
  const navigate = useNavigate()
  const[user, setUser] = useState(null)
  const[loading, setLoading] = useState(true)
  const[invitationStatus, setInvitationStatus] = useState('notSent')

  const auth = getAuth()

  const sendInvite = async () => {
    await addDoc(collection(db, 'invitations'), {
      sentBy: auth.currentUser.uid, 
      sentTo: userId, 
      timestamp: serverTimestamp(),
      status: 'pending' 
    })
    setInvitationStatus('pending')
    
    navigate('/home')
  }


  useEffect(() => {
    const fetchUser = async () => {
      const response = await getDoc(doc(db, 'users', userId))
      const collectionRef = collection(db, 'invitations')
      const q = query(collectionRef, where('sentBy', '==', auth.currentUser.uid), where('sentTo', '==', userId))
      const snapshot = await getDocs(q)
      if(!snapshot.empty) {
        snapshot.forEach((doc) => setInvitationStatus(doc.data().status))
      }
      setUser(response.data())
      setLoading(false)
    }
    fetchUser()
  }, [])


  if(loading) {
    return <h1>loading...</h1>
  }

  return (
  <div className='main'>
   <p className="profileHeader">الملف الشخصي</p>
      <div className="profileContainer">
        <div className="profileBasicInfo">
          <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="profile" className="profilePicture"/>
          <div className="profilePersonalInfo">
            <h1 className="profileName" dir='rtl'>{user.name}</h1>
            <div className="profileItemGroup">
              <FaMapMarkerAlt className='profileItemGroupIcon'/>
              <p className="profileLocation" dir='rtl'>{`${user.city} ، ${user.area}`}</p>
            </div>
            <div className="profileItemGroup">
              <FaUser className='profileItemGroupIcon'/>
              <p className="profileAge" dir='rtl'>{`${user.age} سنة`}</p>
            </div>
          </div>
        </div>
        <div className="profileDetailedInfo">
          <p className='profileBioHeader'>عنّي</p>
          <p className="profileBio" dir='rtl'>
            {user.bio}
          </p>
        </div>
        <div className="profileHobbies">
          <p className="profileBioHeader">الاهتمامات</p>
            <ul className='profileHobbiesList'>
              <li className="hobby">السباحة</li>
              <li className="hobby">الرماية</li>
              <li className="hobby">الجري</li>
              <li className="hobby">درّاج</li>
              <li className="hobby">تنس</li>
              <li className="hobby">المشي</li>
            </ul>
        </div>
        {invitationStatus === 'notSent' && <div className="btnDiv" onClick={sendInvite}><button className="btn logoutBtn">تواصل معي</button></div>}
        {invitationStatus === 'pending' && <h3 className='invitationStatus'>ارسلت للمستخدم دعوة مسبقاً</h3>}
        {invitationStatus === 'accepted' && <h3 className='invitationStatus'>Whatsapp</h3>}
      </div> 
  </div>
  )
}

export default UserProfile