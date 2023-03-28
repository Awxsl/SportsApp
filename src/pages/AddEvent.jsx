import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {getAuth} from 'firebase/auth'
import { serverTimestamp, setDoc, doc, addDoc, collection } from "firebase/firestore"
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {toast} from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
import { auth, db } from '../firebase.config'


function AddEvent() {

  const GEOCODING_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json'

  const navigate = useNavigate('/')

  const [readyToSubmit, setReadyToSubmit] = useState(false)

  const[formData, setFormData] = useState({name: '', maxAttendees: 0, description: '', day: '', startAt: '', endAt: '', location: '', geolocation: {latitude: 0, longitude: 0}})
  const{name, maxAttendees, description, day, startAt, endAt, location, images} = formData
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const auth = getAuth() 

    try {
        
        const geolocationRequest = await fetch(`${GEOCODING_API_ENDPOINT}?address=${location}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
        const geolocationRequestData = await geolocationRequest.json()

        if(geolocationRequestData.status === 'OK') {
          const geolocationInfo = geolocationRequestData.results[0]?.geometry.location
          formData.geolocation.latitude = geolocationInfo.lat 
          formData.geolocation.longitude = geolocationInfo.lng
        }



        const imageUrls = await Promise.all( 
          [...document.getElementById('images').files].map((picture, index) => {
            const imageRef = document.getElementById('images')
            const image = imageRef.files[index]
            getImageUrl(image)
          })
        ).catch((e) => {
          toast.error(e)
        }).then(() => console.log('sup'))

        const formDataCopy = {
          ...formData, 
          imageUrls, 
          timestamp: serverTimestamp(),
          userRef: auth.currentUser.uid
        }

        delete formDataCopy.images


        
    } catch (error) {
      console.log(error)
      toast.error('صارت مشكلة ')
    }

    
  }

  const getImageUrl = async (image) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage();
        // const auth = getAuth() 

        const storageRef = ref(storage, `images/${auth.currentUser.uid}-${uuidv4()}`);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
          (snapshot) => { }, 
          (error) => { reject(error) }, 

           () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          }
        );
      })
    }

      
  

  return (
    <>
      <header>
        <p className="pageHeader">فعالية جديدة</p>
      </header>
      <main>
      <form onSubmit={onSubmit} className='signInForm'>
        <div className="signInPage">
        
          <p className="inputLabel">اسم الفعالية</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='name' value={name} onChange={onChange} placeholder='مثل: بنطلع جبل احد' />
          </div>

          <p className="inputLabel">موقع الفعالية</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='location' value={location} onChange={onChange} placeholder='المدينة المنورة، مسجد الفسح' />
          </div>

          <p className="inputLabel">معلومات الفعالية</p>
          <div className="inputItem">
            <textarea name="description" id="description" className="bioArea" placeholder="عطنا معلومات اكثر عن الفعالية" dir="rtl" value={description} onChange={onChange}></textarea>
          </div>

          <p className="inputLabel">العدد الاقصى للمشاركين</p>
          <div className="inputItem">
            <input dir="rtl" type="number" min={3} max={100} className="input" id='maxAttendees' value={maxAttendees} onChange={onChange} placeholder='30' />
          </div>

          <p className="inputLabel">اليوم</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='day' value={day} onChange={onChange} placeholder='يوم الخميس' />
          </div>

          <p className="inputLabel">متى تبدا</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='startAt' value={startAt} onChange={onChange} placeholder='8 صباحاً' />
          </div>

          <p className="inputLabel">متى تنتهي</p>
          <div className="inputItem">
            <input dir="rtl" type="text" className="input" id='endAt' value={endAt} onChange={onChange} placeholder='12 ظهراً' />
          </div>

          <p className="inputLabel">صور الفعالية</p>
          <div className="inputItem">
            <input type='file' className="imageUpload" id='images' value={images} onChange={onChange} dir="rtl" multiple accept="image/*"/>
          </div>

        {/* TODO: Add hobbies selection here */}

        </div>
        <div className="btnDiv"><button type="submit" className="btn btnPrimary">تسجيل</button></div>
      </form>
      </main>
    </>
  )
}

export default AddEvent