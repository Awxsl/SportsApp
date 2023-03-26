import {FaMapMarkerAlt, FaUser} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'

function Profile() {

  const[user, setUser] = useState(null)
  const[loading, setLoading] = useState(true)

  const auth = getAuth()

  // onAuthStateChanged(auth, async (user) => {
  //   if(user) {
  //     const response = await getDoc(doc(db, 'users', auth.currentUser.uid))
  //     setUser(response.data())
  //     setLoading(false)
  //   }    
  // })

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getDoc(doc(db, 'users', auth.currentUser.uid))
      setUser(response.data())
      setLoading(false)
    }
    fetchUser()
  }, [auth.currentUser.uid])

  const colors = ['CF4B55', '7E87BD', '8A9E7E', 'D6D3B6', 'D87356', '2D2A3D', 'E4CB7E']

  function getRandomColor ()  {
    Math.floor(Math.random() * (colors.length - 0 + 1) + 0)
  }

  if(loading) {
    return <h1>loading...</h1>
  }

  return (
  <>
   <p className="profileHeader">الملف الشخصي</p>
      <div className="profileContainer">
        <div className="profileBasicInfo">
          <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="profile" className="profilePicture"/>
          <div className="profilePersonalInfo">
            <h1 className="profileName" dir='rtl'>{user.name}</h1>
            <div className="profileItemGroup">
              <FaMapMarkerAlt className='profileItemGroupIcon'/>
              <p className="profileLocation" dir='rtl'>{user.location}</p>
            </div>
            <div className="profileItemGroup">
              <FaUser className='profileItemGroupIcon'/>
              <p className="profileAge" dir='rtl'>{`${user.age} سنة`}</p>
            </div>
          </div>
        </div>
        <div className="profileDetailedInfo">
          <p className='profileBioHeader'>عنّي</p>
          <p className="profileBio">
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
      </div> 
  </>
  )
}

export default Profile