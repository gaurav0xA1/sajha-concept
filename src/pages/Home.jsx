import './Home.css'
import Navbar from '../components/Navbar/Navbar.jsx'
import MapView from '../components/MapView/MapView.jsx'
import RouteList from '../components/RouteList/RouteList.jsx'

function Home({ user, onSignOut }) {
    if (!user) return null

    return (
        <div className="home-page">
            <Navbar user={user} onSignOut={onSignOut} />
            <MapView />
            <RouteList/>
        </div>
    )
}

export default Home