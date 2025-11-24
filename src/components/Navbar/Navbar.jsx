import './Navbar.css'
import { useState } from 'react'

function Navbar({ user, onSignOut }) {
    const [showPopup, setShowPopup] = useState(false)

    if (!user) return null

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleSignOut = () => {
        setShowPopup(false)
        onSignOut()
    }

    return (
        <div className="nav-bar">
            <a href="https://sajha.anupbhattarai2.com.np/" id="text-logo-link">
                <div id="text-logo">साझा</div>
            </a>

            <div className="user-profile-wrapper">
                <div className="user-profile" onClick={togglePopup}>
                    <img src={user.photoURL || '/default-avatar.png'} alt="profile" />
                    <div>
                        <p className="welcome-line">Hi,</p>
                        <p className="user-name">{user.displayName || user.email}</p>
                    </div>
                </div>

                {showPopup && (
                    <div className="profile-popup">
                        <div className="popup-header">
                            <img src={user.photoURL || '/default-avatar.png'} alt="profile" />
                            <div>
                                <p className="popup-name">{user.displayName || 'User'}</p>
                                <p className="popup-email">{user.email}</p>
                            </div>
                        </div>
                        <button className="signout-btn" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar