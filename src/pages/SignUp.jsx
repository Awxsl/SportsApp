import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { serverTimestamp, setDoc, doc } from "firebase/firestore"
import { auth } from "../firebase.config"
import {toast} from 'react-toastify'
import { FaEye } from "react-icons/fa"
import { db } from '../firebase.config'


function SignUp() {

  const GEOCODING_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'

  const navigate = useNavigate('/')

  const[showPassword, setShowPassword] = useState(false)
  const[formData, setFormData] = useState({name: '', email: '', password: '', gender: 'male', preferedDays: '', preferedTime: '', bio: '', location: '', city: '', area: '', sight: '', age: 0, geolocation: {latitude: 0, longitude: 0}, avatarUrl: `https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(Math.random() * 78) + 1}.jpg`})
  const{email, password, bio, city, area, location, sight, age, name} = formData

  const onChange = (e) => {

    if(e.target.id === 'city' || e.target.id === 'area' || e.target.id === 'sight') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value, 
        location: `${city}  ${area} ${sight}` 
      }))
    } else {      
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.id]: e.target.value
      }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if(bio.length < 100) {
      toast.error('الوصف قصير')
      return
    }

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


        await setDoc(doc(db, 'users', user.uid), formDataCopy)

        window.localStorage.setItem('geolocation', JSON.stringify(formDataCopy.geolocation))
        window.localStorage.setItem('gender', formDataCopy.gender)

        toast.success('تم تسجيل المستخدم')
        navigate('/')
        
    } catch (error) {
      console.log(error)
      toast.error('صارت مشكلة ')
    }

    
  }

  return (
    <>
      <header className="header">
        <p className="pageHeader">مستخدم جديد</p>
      </header>
      <main className="main">
      <form onSubmit={onSubmit} className='signInForm'>
        <div className="signInPage">
        
          <p className="inputLabel">اسمك</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='name' value={name} onChange={onChange} placeholder='دخل اسمك هنا' required/>
          </div>

          <p className="inputLabel">البريد الالكتروني</p>
          <div className="inputItem">
            <input dir="rtl" type="email" className="input" id='email' value={email} onChange={onChange} placeholder='دخل ايميلك هنا' required/>
          </div>
          <p className="inputLabel">كلمة المرور</p>
          <div className="inputItem">
              <div className="showPasswordDiv">
                <input dir="rtl" type={showPassword ? 'text' : 'password'} className="input" id='password' value={password} onChange={onChange} placeholder='ادخل كلمة المرور' required/>
                <FaEye className={showPassword ? 'showPasswordIconActive' : 'showPasswordIcon'} onClick={() => {setShowPassword((prevState) => !prevState)}} />
              </div>
          </div>
          <p className="inputLabel">معلومات عنك</p>
          <div className="inputItem">
            <textarea name="bio" id="bio" className="bioArea" placeholder="عرفنا عن نفسك وعن هواياتك" dir="rtl" value={bio} onChange={onChange} minLength={100} maxLength={500} required={true}></textarea>
          </div>

          <div className="inputGroup">
              <p className="inputLabel">الجنس</p>
              <div className="inputItem">
              <div className="inputItem">
                <select className="input" id="gender" onChange={onChange} required>
                  <option value="male">ذكر</option>
                  <option value="female">انثى</option>
                </select>
              </div>
            </div>
            </div>

          <p className="inputLabel">عمرك</p>
          <div className="inputItem">
            <input dir="rtl" type="number" min={16} max={100} className="input" id='age' value={age} onChange={onChange} placeholder='دخل عمرك' required/>
          </div>

          <p className="inputLabel">مدينتك</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='city' value={city} onChange={onChange} placeholder='المدينة المنورة' required/>
          </div>
          <p className="inputLabel">الحي</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='area' value={area} onChange={onChange} placeholder='سلطانة' required/>
          </div>
          <p className="inputLabel">معلم قريب من بيتك</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='sight' value={sight} onChange={onChange} placeholder='مسجد القبلتين' required/>
          </div>

          <div className="timeDateSelector">
            <div className="inputGroup">
              <p className="inputLabel">الوقت المفضّل</p>
              <div className="inputItem">
              <div className="inputItem">
                <select className="input" id="preferedTime" onChange={onChange}>
                  <option value="الصباح">الصباح</option>
                  <option value="العصر">العصر</option>
                  <option value="المغرب">المغرب</option>
                  <option value="العشاء" >العشاء</option>
                </select>
              </div>
            </div>
            </div>
            <div className="inputGroup">
              <p className="inputLabel">الايام المفضّلة</p>
              <div className="inputItem">
                <select className="input dropDown" id="preferedDays" onChange={onChange}>
                  <option value="ايام الاسبوع">ايام الاسبوع</option>
                  <option value="الويكند">الويكند</option>
                </select>
              </div>
            </div>
          </div>

        {/* TODO: Add hobbies selection here */}

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