import './Login.css'
import { FcGoogle } from "react-icons/fc";

function Login({ onLogin }) {
	return (
		<div className="login-page">
            <div className="logo">साझा</div>
			<div className="login-card">
				<div className="bus-illustration">
					<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
						{/* Bus body */}
						<rect x="50" y="40" width="300" height="70" rx="8" fill="#4d804a"/>
						{/* Windows */}
						<rect x="65" y="50" width="40" height="30" rx="3" fill="#e8f5e9"/>
						<rect x="115" y="50" width="40" height="30" rx="3" fill="#e8f5e9"/>
						<rect x="165" y="50" width="40" height="30" rx="3" fill="#e8f5e9"/>
						<rect x="215" y="50" width="40" height="30" rx="3" fill="#e8f5e9"/>
						<rect x="265" y="50" width="40" height="30" rx="3" fill="#e8f5e9"/>
						<rect x="315" y="50" width="25" height="30" rx="3" fill="#e8f5e9"/>
						{/* Door */}
						<rect x="55" y="85" width="30" height="25" rx="2" fill="#2d5a2d"/>
						{/* Wheels */}
						<circle cx="100" cy="110" r="15" fill="#333"/>
						<circle cx="100" cy="110" r="8" fill="#555"/>
						<circle cx="300" cy="110" r="15" fill="#333"/>
						<circle cx="300" cy="110" r="8" fill="#555"/>
						{/* Details */}
						<rect x="320" y="60" width="15" height="15" rx="2" fill="#FDBE34"/>
						<text x="200" y="98" fontSize="12" fill="white" textAnchor="middle" fontWeight="600">SAJHA YATAYAT</text>
					</svg>
				</div>

				<h3>Simplify your travel!</h3>

				<button type="button" className="login-btn" onClick={onLogin}>
                    <FcGoogle size={24} /> Continue with Google
				</button>

				<p className="terms-copy">
					<a href="https://anupbhattarai2.com.np/" target="_blank" rel="noreferrer">
						Terms and Conditions
					</a>
				</p>
			</div>
		</div>
	)
}

export default Login
