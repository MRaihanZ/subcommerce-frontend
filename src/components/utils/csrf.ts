export async function CreateCsrf(): Promise<string> {
	const res = await fetch("http://localhost:8080/api/v1/csrf/", {
		credentials: "include",
	});
	const data = await res.json();
	return data.csrf_token;
}

export async function GetCsrf(): Promise<string> {
	const res = await fetch("http://localhost:8080/api/v1/csrf/session", {
		credentials: "include",
	});
	const data = await res.json();
	if (data.code === 401 && data.error !== null) {
		return "error";
	}
	return data.csrf_token;
}
