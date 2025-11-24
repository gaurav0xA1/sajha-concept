import './Login.css'
import { FcGoogle } from "react-icons/fc";

function Login({ onLogin }) {
	return (
		<div className="login-page">
            <div id="logo">साझा</div>
			<div className="login-card">
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
