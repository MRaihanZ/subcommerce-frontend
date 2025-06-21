export default function Loading() {
	return (
		<>
			<div style={{ height: "100vh" }}>
				<div className="d-flex h-100 justify-content-center">
					<div className="spinner-border align-self-center" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		</>
	);
}
