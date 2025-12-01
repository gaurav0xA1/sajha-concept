import './Navbar.css'

function Navbar({ user, onSignOut, showProfilePopup, setShowProfilePopup }) {
    if (!user) return null

    const togglePopup = () => {
        setShowProfilePopup(!showProfilePopup)
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
            </div>
        </div>
    )
}

export default Navbar