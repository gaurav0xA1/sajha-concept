import './DrawerMenu.css'
import { useState } from 'react'
import { IoMenu, IoClose, IoHome, IoMap, IoBus, IoPersonCircle, IoSearch, IoInformationCircle } from 'react-icons/io5'

function DrawerMenu({ user, onSignOut, searchQuery, onSearchChange, showProfilePopup, setShowProfilePopup, isRouteViewOpen }) {
    const [isOpen, setIsOpen] = useState(false)

    if (!user) return null

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    const toggleProfilePopup = () => {
        setShowProfilePopup(!showProfilePopup)
    }

    const handleSignOut = () => {
        setShowProfilePopup(false)
        setIsOpen(false)
        onSignOut()
    }

    return (
        <>
            {/* Bottom Bar */}
            <div className={`bottom-bar ${isRouteViewOpen ? 'slide-down' : ''}`}>
                {/* Search Box */}
                <div className="search-wrapper">
                    <IoSearch className="search-icon" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by station..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Drawer Toggle Button */}
                <button className="drawer-toggle-bottom" onClick={toggleDrawer}>
                    {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                </button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div className="drawer-overlay" onClick={toggleDrawer} />
            )}

            {/* Drawer Menu (slides from bottom-right) */}
            <div className={`drawer-menu-right ${isOpen ? 'open' : ''}`}>
                {/* User Profile Section */}
                <div className="drawer-header">
                    <img 
                        src={user.photoURL || '/default-avatar.png'} 
                        alt="profile" 
                        className="drawer-avatar"
                    />
                    <div className="drawer-user-info">
                        <p className="drawer-user-name">{user.displayName || 'User'}</p>
                        <p className="drawer-user-email">{user.email}</p>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="drawer-nav">
                    <a href="https://sajha.anupbhattarai2.com.np" className="drawer-link">
                        <IoHome size={24} />
                        <span>Home</span>
                    </a>
                    <a href="#" className="drawer-link">
                        <IoMap size={24} />
                        <span>Routes</span>
                    </a>
                    <a href="#" className="drawer-link">
                        <IoBus size={24} />
                        <span>My Trips</span>
                    </a>
                    <a href="#" className="drawer-link" onClick={(e) => { e.preventDefault(); toggleProfilePopup(); }}>
                        <IoPersonCircle size={24} />
                        <span>Profile</span>
                    </a>
                    <a href="https://anupbhattarai2.com.np" target="_blank" rel="noopener noreferrer" className="drawer-link">
                        <IoInformationCircle size={24} />
                        <span>About Developer</span>
                    </a>
                </nav>

                {/* Sign Out Button */}
                <button className="drawer-signout" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>

            {/* Profile Popup Modal */}
            {showProfilePopup && (
                <>
                    <div className="profile-popup-overlay" onClick={toggleProfilePopup} />
                    <div className="profile-popup-modal">
                        <button className="profile-popup-close" onClick={toggleProfilePopup}>
                            <IoClose size={24} />
                        </button>
                        <div className="profile-popup-content">
                            <img 
                                src={user.photoURL || '/default-avatar.png'} 
                                alt="profile" 
                                className="profile-popup-avatar"
                            />
                            <h3 className="profile-popup-name">{user.displayName || 'User'}</h3>
                            <p className="profile-popup-email">{user.email}</p>
                            <button className="profile-popup-signout" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default DrawerMenu