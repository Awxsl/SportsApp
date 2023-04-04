import {FaRegCalendarAlt, FaClock, FaMapMarkerAlt, FaLocationArrow} from 'react-icons/fa'

function UserCard() {
  return (
    <div className="userCard">
    <img src="https://xsgames.co/randomusers/avatar.php?g=male" 
    alt="Profile Pic" className="userCardPic" />
    <div className="userCardDetails">
      <div className="userCardGroup">
        <FaMapMarkerAlt className='userCardIcon' />
        <p className="userCardLocation">المدينة المنورة، سلطانة</p>
      </div>
      <p className="userCardName">محمد خالد الحربي</p>
      <p className="userCardDescription" dir='rtl'>
        احب مختلف الرياضات مثل الركض ورفع الاثقال والمشي بالدراجات وايضاً من هواياتي الهايكنق و...
      </p>
      <div className="userCardDate">
        <div className="userCardGroup">
          <FaRegCalendarAlt className='userCardIcon' />
          <p className="preferedDays">الويكند</p>
        </div>
        <div className="userCardGroup">
          <FaClock className='userCardIcon' />
          <p className="preferedTime">العصر/المغرب</p>
        </div>
        <div className="userCardGroup">
          <FaLocationArrow className='userCardIcon' />
          <p className="preferedTime">3.2 كم</p>
        </div>
      </div>
    </div>
  </div>

  )
}

export default UserCard