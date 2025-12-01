import './Home.css'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import MapView from '../components/MapView/MapView.jsx'
import RouteList from '../components/RouteList/RouteList.jsx'
import DrawerMenu from '../components/DrawerMenu/DrawerMenu.jsx'

function Home({ user, onSignOut }) {
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [showProfilePopup, setShowProfilePopup] = useState(false)

    if (!user) return null

    return (
        <div className="home-page">
            <Navbar user={user} onSignOut={onSignOut} showProfilePopup={showProfilePopup} setShowProfilePopup={setShowProfilePopup} />
            <MapView selectedRoute={selectedRoute} searchQuery={searchQuery} />
            <RouteList onRouteClick={setSelectedRoute} selectedRoute={selectedRoute} searchQuery={searchQuery} />
            <DrawerMenu user={user} onSignOut={onSignOut} searchQuery={searchQuery} onSearchChange={setSearchQuery} showProfilePopup={showProfilePopup} setShowProfilePopup={setShowProfilePopup} />
        </div>
    )
}

export default Home