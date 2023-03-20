import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { serverTimestamp, addDoc, collection } from "firebase/firestore"
import { auth } from "../firebase.config"
import {toast} from 'react-toastify'
import { FaEye } from "react-icons/fa"
import { db } from '../firebase.config'


function SignUp() {

  const GEOCODING_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'

  const navigate = useNavigate('/')

  const[showPassword, setShowPassword] = useState(false)
  const[formData, setFormData] = useState({name: '', email: '', password: '', bio: '', location: '', age: 0, geolocation: {latitude: 0, longitude: 0}, avatarUrl: 'https://xsgames.co/randomusers/avatar.php?g=male'})
  const{email, password, bio, location, age, name} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
        const auth = getAuth() 
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user 
        await updateProfile(user, {displayName: formData.name})
        
        const geolocationRequest = await fetch(`${GEOCODING_API_ENDPOINT}?address=${location}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
        const geolocationRequestData = await geolocationRequest.json()

        if(geolocationRequestData.status === 'OK') {
          const geolocationInfo = geolocationRequestData.results[0]?.geometry.location 
          formData.geolocation.latitude = geolocationInfo.lat 
          formData.geolocation.longitude = geolocationInfo.lng
        }


        const formDataCopy = {...formData}
        delete formDataCopy.password 
        delete formDataCopy.email  
        formDataCopy.userRef = user.uid 
        formDataCopy.timestamp = serverTimestamp()


        await addDoc(collection(db, 'users'), formDataCopy)

        toast.success('تم تسجيل المستخدم')
        navigate('/events')
        
    } catch (error) {
      console.log(error)
      toast.error('صارت مشكلة ')
    }

    
  }

  return (
    <>
      <header>
        <p className="pageHeader">مستخدم جديد</p>
      </header>
      <main>
      <form onSubmit={onSubmit} className='signInForm'>
        <div className="signInPage">
        
          <p className="inputLabel">اسمك</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='name' value={name} onChange={onChange} placeholder='دخل اسمك هنا' />
          </div>

          <p className="inputLabel">البريد الالكتروني</p>
          <div className="inputItem">
            <input dir="rtl" type="email" className="input" id='email' value={email} onChange={onChange} placeholder='دخل ايميلك هنا' />
          </div>
          <p className="inputLabel">كلمة المرور</p>
          <div className="inputItem">
              <div className="showPasswordDiv">
                <input dir="rtl" type={showPassword ? 'text' : 'password'} className="input" id='password' value={password} onChange={onChange} placeholder='ادخل كلمة المرور'/>
                <FaEye className={showPassword ? 'showPasswordIconActive' : 'showPasswordIcon'} onClick={() => {setShowPassword((prevState) => !prevState)}} />
              </div>
          </div>
          <p className="inputLabel">معلومات عنك</p>
          <div className="inputItem">
            <textarea name="bio" id="bio" className="bioArea" placeholder="عرفنا عن نفسك وعن هواياتك" dir="rtl" value={bio} onChange={onChange}></textarea>
            {/* <input dir="rtl" type="email" className="input" id='email' value={email} onChange={onChange} placeholder='دخل ايميلك هنا' /> */}
          </div>

          <p className="inputLabel">عمرك</p>
          <div className="inputItem">
            <input dir="rtl" type="number" min={16} max={100} className="input" id='age' value={age} onChange={onChange} placeholder='دخل عمرك' />
          </div>

          <p className="inputLabel">عنوانك</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='location' value={location} onChange={onChange} placeholder='دخل عنوانك التفصيلي (الشارع، الحارة ...)' />
          </div>

        </div>
        <div className="btnDiv"><button type="submit" className="btn btnPrimary">تسجيل</button></div>
      <Link to='/signin'>
        <p className="gotoSignInOrUp">عندك حساب؟ سجّل الدخول</p>
      </Link>
      </form>
      </main>
    </>
  )
}

export default SignUp