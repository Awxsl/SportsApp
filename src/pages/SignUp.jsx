import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaEye } from "react-icons/fa"

function SignUp() {

  const[showPassword, setShowPassword] = useState(false)
  const[formData, setFormData] = useState({email: '', password: '', bio: '', location: ''})
  const{email, password, bio, location} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <header>
        <p className="pageHeader">مستخدم جديد</p>
      </header>
      <main>
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
          <p className="inputLabel">معلومات عنك</p>
          <div className="inputItem">
            <textarea name="bio" id="bio" className="bioArea" placeholder="عرفنا عن نفسك وعن هواياتك" dir="rtl"></textarea>
            {/* <input dir="rtl" type="email" className="input" id='email' value={email} onChange={onChange} placeholder='دخل ايميلك هنا' /> */}
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