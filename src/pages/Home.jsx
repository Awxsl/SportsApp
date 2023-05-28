import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="homePage main">
      <header>
        <h1 className="homeHeading" dir="rtl">الصفحة الرئيسية</h1>
      </header>
      <main className="homeCards">
        <Link to='/users' className="homeCardLink">
          <div className="homeCard">
            <h2 className="homeCardHeading">الافراد</h2>
          </div>
        </Link>
        <Link to='/events' className="homeCardLink">
          <div className="homeCard">
            <h2 className="homeCardHeading">الفعاليات</h2>
          </div>
        </Link>
      </main>
    </div>
  )
}

export default Home