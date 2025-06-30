interface MessageProps {
	name: string;
	sent: string;
	message: string;
	isSender: boolean;
}

export default function Message({
	name,
	sent,
	message,
	isSender,
}: MessageProps) {
	return (
		<>
			{isSender ? (
				<div className="flex items-start gap-2.5 my-5">
					{/* <img
					className="w-8 h-8 rounded-full"
					src="/docs/images/people/profile-picture-3.jpg"
					alt="Jese image"
				/> */}
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e3e3e3"
						className="w-8 h-8 rounded-full"
					>
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg> */}
					<div className="flex flex-col gap-1 w-full max-w-[320px]">
						<div className="flex items-center space-x-2 rtl:space-x-reverse">
							<span className="text-sm font-semibold text-gray-900 dark:text-white">
								{name}
							</span>
							<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
								{sent}
							</span>
						</div>
						<div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
							<p className="text-sm font-normal text-gray-900 dark:text-white">
								{" "}
								{message}
							</p>
						</div>
					</div>
					{/* <button
					id="dropdownMenuIconButton"
					data-dropdown-toggle="dropdownDots"
					data-dropdown-placement="bottom-start"
					className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
					type="button"
				>
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 4 15"
					>
						<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
					</svg>
				</button> */}
				</div>
			) : (
				<div className="flex items-start justify-end gap-2.5 my-5">
					<div className="flex flex-col gap-1 w-full max-w-[320px]">
						<div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
							<span className="text-sm font-semibold text-gray-900 dark:text-white">
								{name}
							</span>
							<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
								{sent}
							</span>
						</div>
						<div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
							<p className="text-sm text-end font-normal text-gray-900 dark:text-white">
								{" "}
								{message}
							</p>
						</div>
					</div>
					{/* <button
					id="dropdownMenuIconButton"
					data-dropdown-toggle="dropdownDots"
					data-dropdown-placement="bottom-start"
					className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
					type="button"
				>
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 4 15"
					>
						<path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
					</svg>
				</button> */}
					{/* <img
					className="w-8 h-8 rounded-full"
					src="/docs/images/people/profile-picture-3.jpg"
					alt="Jese image"
				/> */}
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e3e3e3"
						className="w-8 h-8 rounded-full"
					>
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg> */}
				</div>
			)}
		</>
	);
}
