import {FaRegCalendarAlt, FaClock, FaMapMarkerAlt, FaLocationArrow} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function EventCard({user}) {


  const{name, imageUrls, description, timestamp, day, startAt, location, geolocation, userRef} = user.data

  const loggedInGeolocation = JSON.parse(window.localStorage.getItem('geolocation'))


  const getDestance = (lat1, lat2, lon1, lon2) => {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI/180; 
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; 
    return (d/1000) + 0.1
  }

  const getDate = (date) => {
    const time = new Date(timestamp.seconds*1000).toISOString().split('T')[0]
    return time
  }

  return (
    <Link to={`/users/${userRef}`} style={{ color: 'black' }}>
      <div className="userCard">
      <img src={imageUrls[0]}
      alt="Profile Pic" className="userCardPic" />
      <div className="userCardDetails">
        <div className="userCardGroup">
          <FaMapMarkerAlt className='userCardIcon' />
          <p className="userCardLocation">{`${location}`}</p>
        </div>
        <p className="userCardName">{name}</p>
        <p className="userCardDescription" dir='rtl'>
          {description.substring(0, 80) + '...'}
        </p>
        <div className="userCardDate">
          <div className="userCardGroup">
            <FaRegCalendarAlt className='userCardIcon' />
            <p className="preferedDays">{day}</p>
          </div>
          <div className="userCardGroup">
            <FaClock className='userCardIcon' />
            <p className="preferedTime" dir='rtl'>{startAt}</p>
          </div>
          <div className="userCardGroup">
            <FaLocationArrow className='userCardIcon' />
            <p className="preferedTime" dir={'rtl'}>{Math.round(getDestance(geolocation.latitude, loggedInGeolocation.latitude, geolocation.longitude, loggedInGeolocation.longitude) * 10) / 10} كم</p>
          </div>
        </div>
      </div>
        </div>
     </Link>

  )
}

export default EventCard