import './Home.css'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import MapView from '../components/MapView/MapView.jsx'
import RouteList from '../components/RouteList/RouteList.jsx'
import DrawerMenu from '../components/DrawerMenu/DrawerMenu.jsx'
import RouteView from '../components/Routeview/RouteView.jsx'


function Home({ user, onSignOut }) {
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [showProfilePopup, setShowProfilePopup] = useState(false)
    const [clickedRoute, setClickedRoute] = useState(null)

    if (!user) return null

    return (
        <div className="home-page">
            <Navbar user={user} onSignOut={onSignOut} showProfilePopup={showProfilePopup} setShowProfilePopup={setShowProfilePopup} />
            <MapView selectedRoute={selectedRoute} searchQuery={searchQuery} isRouteViewOpen={!!clickedRoute} />
            
            {/* Show RouteView OR RouteList, not both */}
            {clickedRoute ? (
                <RouteView
                    route={clickedRoute}
                    onClose={() => setClickedRoute(null)}
                />
            ) : (
                <RouteList onRouteClick={setSelectedRoute} onRouteViewClick={setClickedRoute} selectedRoute={selectedRoute} searchQuery={searchQuery} />
            )}
            
            <DrawerMenu 
                user={user} 
                onSignOut={onSignOut} 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
                showProfilePopup={showProfilePopup} 
                setShowProfilePopup={setShowProfilePopup}
                isRouteViewOpen={!!clickedRoute}
            />
        </div>

    )
}

export default Home