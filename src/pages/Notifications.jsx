import InvitationList from '../components/InvitationList'

function Notifications() {
  return (
    <>
      <header className='header'>
      <h1 className="profileHeading" dir="rtl">الدعوات</h1>
    </header>
      <main className='main'>
        <InvitationList/>
      </main>
    </>
  )
}

export default Notifications