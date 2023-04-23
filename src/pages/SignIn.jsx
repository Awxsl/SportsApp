import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { FaEye } from "react-icons/fa"
import { toast } from "react-toastify"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"

function SignIn() {

  const auth = getAuth()

  // onAuthStateChanged(auth, async (user) => {
  //   if(user) {
  //     const response = await getDoc(doc(db, 'users', auth.currentUser.uid))
  //     console.log(response)
  //     const user = await response.json() 

  //     window.localStorage.setItem('geolocation', JSON.stringify(user.geolocation))
  //     window.localStorage.setItem('gender', user.gender)
  //   }
  // })

  const navigate = useNavigate()

  const[showPassword, setShowPassword] = useState(false)
  const[formData, setFormData] = useState({email: '', password: ''})
  const{email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
        console.log(auth.currentUser.uid)
        const response = await getDoc(doc(db, 'users', auth.currentUser.uid))
        console.log(response)
        const user = await response.data()
        window.localStorage.setItem('geolocation', JSON.stringify(user.geolocation))
        window.localStorage.setItem('gender', user.gender)
        toast.success('Signed In Successfully!')
        navigate('/profile')

    } catch (error) {
      console.log(error)
      toast.error('Credentials are incorrect')
    }
  }

  return (
    <>
      <header>
        <p className="pageHeader">!ياهلا والله</p>
      </header>
      <main className="main">
      <form onSubmit={onSubmit} className='signInForm'>
        <div className="signInPage">
        
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
        </div>
        <div className="btnDiv"><button type="submit" className="btn btnPrimary">تسجيل الدخول</button></div>
      <Link to='/signup'>
        <p className="gotoSignInOrUp">ماعندك حساب؟ سجل الان</p>
      </Link>
      </form>
      </main>
    </>
  )
}

export default SignIn