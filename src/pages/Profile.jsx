import {FaMapMarkerAlt, FaUser} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {getAuth, signOut} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const navigate = useNavigate()
  const[user, setUser] = useState(null)
  const[loading, setLoading] = useState(true)

  const auth = getAuth()

  const logout = async () => {
    window.localStorage.removeItem('geolocation')
    window.localStorage.removeItem('gender')
    await signOut(auth)
    navigate('/signin')
  }


  useEffect(() => {
    const fetchUser = async () => {
      const response = await getDoc(doc(db, 'users', auth.currentUser.uid))
      setUser(response.data())
      setLoading(false)
    }
    fetchUser()
  }, [auth.currentUser.uid])


  if(loading) {
    return <h1>loading...</h1>
  }

  return (
  <div className='main'>
   <p className="profileHeader">الملف الشخصي</p>
      <div className="profileContainer">
        <div className="profileBasicInfo">
          <img src={user.avatarUrl} alt="profile" className="profilePicture"/>
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
            </ul>
        </div>
        <div className="btnDiv" onClick={logout}><button className="btn logoutBtn">تسجيل الخروج</button></div>
      </div> 
  </div>
  )
}

export default Profile