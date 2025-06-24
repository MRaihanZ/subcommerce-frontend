import { useEffect, useState } from "react";

export default function ButtonHomeCatalog() {
	const [hash, setHash] = useState(window.location.hash);

	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash);
		};

		// Listen to URL hash changes
		window.addEventListener("hashchange", handleHashChange);

		// Cleanup
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	return (
		<>
			<button
				role="tab"
				className={hash === "#hot" ? "tab tab-active" : "tab"}
				onClick={() => (window.location.hash = "hot")}
			>
				Hot
			</button>
			<button
				role="tab"
				className={hash === "#one-time" ? "tab tab-active" : "tab"}
				onClick={() => (window.location.hash = "one-time")}
			>
				one-time
			</button>
			<button
				role="tab"
				className={hash === "#subscriptions" ? "tab tab-active" : "tab"}
				onClick={() => (window.location.hash = "subscriptions")}
			>
				subscriptions
			</button>
		</>
	);
}
