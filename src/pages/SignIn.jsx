import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaEye } from "react-icons/fa"

function SignIn() {

  const[showPassword, setShowPassword] = useState(false)
  const[formData, setFormData] = useState({email: '', password: ''})
  const{email, password} = formData

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
        <p className="pageHeader">!ياهلا والله</p>
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
              <input dir="rtl" type={showPassword ? 'text' : 'password'} className="input" id='password' value={password} onChange={onChange} placeholder='ادخل كلمة المرور'/>
          </div>
        </div>
        <div className="btnDiv"><button type="submit" className="btn btnPrimary">تسجيل الدخول</button></div>
      <p className="gotoSignInOrUp">عندك حساب؟ سجل الدخول</p>
      </form>
      </main>
    </>
  )
}

export default SignIn