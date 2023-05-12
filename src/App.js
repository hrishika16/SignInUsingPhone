import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import Main from "./Main";

const App = () => {
	const [otp, setOtp] = useState("");
	const [ph, setPh] = useState("");
	const [loading, setLoading] = useState(false);
	const [showOTP, setShowOTP] = useState(false);
	const [user, setUser] = useState(null);

	function onCaptchVerify() {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				"recaptcha-container",
				{
					size: "invisible",
					callback: (response) => {
						onSignup();
					},
					"expired-callback": () => {}
				},
				auth
			);
		}
	}

	function onSignup() {
		setLoading(true);
		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;

		const formatPh = "+" + ph;

		signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setLoading(false);
				setShowOTP(true);
				toast.success("OTP sended successfully!");
			})
			.catch((error) => {
				// console.log(error);
				if (showOTP) toast.error("Field cannot be empty/ Enter Valid Number");
				setLoading(false);
			});
	}

	function onOTPVerify() {
		setLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res) => {
				// console.log(res);
				setUser(res.user);
				setLoading(false);
			})
			.catch((err) => {
				toast.error("Enter Valid OTP Number");
				setLoading(false);
			});
	}

	return (
		<section className="bg-[url('bg.jpg')] bg-no-repeat bg-cover flex items-center justify-center h-screen">
			<div>
				<Toaster toastOptions={{ duration: 4000 }} />
				<div id="recaptcha-container"></div>
				{user ? (
					<Main />
				) : (
					<div className="w-80 flex flex-col gap-4 rounded-lg p-4">
						<div className="bg-slate-700 text-slate-50 w-fit mx-auto p-4 rounded-full">
							<FaUser size={80} />
						</div>
						<h1 className="text-center text-slate-700 leading-normal font-medium text-3xl mb-3">
							LOGIN USING
							<br />
							PHONE NUMBER
						</h1>
						{showOTP ? (
							<>
								<div className="bg-white text-slate-700 w-fit mx-auto p-4 rounded-full">
									<BsFillShieldLockFill size={30} />
								</div>
								<label
									htmlFor="otp"
									className="font-bold text-xl text-white text-center">
									Enter your OTP
								</label>
								<OtpInput
									value={otp}
									onChange={setOtp}
									OTPLength={6}
									otpType="number"
									disabled={false}
									autoFocus
									className="opt-container "></OtpInput>
								<button
									onClick={onOTPVerify}
									className="bg-slate-700 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
									{loading && (
										<CgSpinner size={20} className="mt-1 animate-spin" />
									)}
									<span>Verify OTP</span>
								</button>
							</>
						) : (
							<>
								<div className="bg-white text-slate-700 w-fit mx-auto p-4 rounded-full">
									<BsTelephoneFill size={20} />
								</div>
								<label className="font-bold text-xl text-slate-700 text-center">
									Verify your phone number
								</label>
								<PhoneInput
									className="shadow-xl rounded-full "
									country={"in"}
									value={ph}
									onChange={setPh}
								/>
								<button
									onClick={onSignup}
									className="w-full shadow-xl bg-white rounded-full  flex gap-1 items-center text-slate-700 justify-center py-2.5 text-white font-bold">
									{loading && (
										<CgSpinner size={20} className="mt-1 animate-spin" />
									)}
									<span>Send code via SMS</span>
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default App;
