import { useState, useEffect } from "react";

import { apiUrl } from "@/lib/importEnv";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CommentProps {
	prodId: string | null;
}
interface RatingComments {
	u_name: string;
	img: string;
	pv_name: string;
	interval: number;
	i_name: string;
	rating: number;
	comment: string;
	created_at: string;
}

export default function Comment({ prodId }: CommentProps) {
	const [ratingComments, setRatingComments] = useState<RatingComments[] | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [notFound, setNotFound] = useState<boolean>(false);
	useEffect(() => {
		const prodNumParam = Number(prodId);
		const fetchComments = async () => {
			try {
				const res = await fetch(
					`${apiUrl}/api/v1/ratings/comments/` + prodNumParam,
				);
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setRatingComments(json.data);
					setLoading(false);
				} else if (json.code === 400 && json.status === "error") {
					setNotFound(true);
					setLoading(false);
				} else {
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchComments();
	}, [prodId]);
	if (loading) return <p>Loading...</p>;
	if (notFound) {
		return <p>Tidak Ada Komen</p>;
	}
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			{ratingComments?.map((r, i) => (
				<section key={i}>
					<section className="mt-3 pb-5">
						<section className="flex items-center mt-3">
							<section className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
								</svg>
								<p>{r.u_name}</p>
							</section>
							<p className="mx-2">|</p>
							<p className="font-semibold text-lg">⭐ {r.rating}</p>
						</section>
						<p className="text-xs ms-6.5">{r.created_at}</p>
						<p className="mt-5 mb-1">
							Varian:
							<Badge variant="outline" className="mx-1">
								{r.pv_name}
							</Badge>
						</p>
						<p className="mb-5">
							Periode:
							<Badge variant="outline" className="mx-1">
								{r.interval} {r.i_name}
							</Badge>
						</p>
						<section>
							<p>{r.comment}</p>
						</section>
					</section>
					<Separator />
				</section>
			))}
		</>
	);
}
