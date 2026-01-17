import { Link } from "react-router";
import { ShoppingBag, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b px-4">
			<Card className="max-w-xl w-full rounded-2xl shadow-lg">
				<CardContent className="p-10 text-center space-y-6">
					{/* Icon */}
					<div className="flex justify-center">
						<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
							<ShoppingBag className="h-8 w-8 text-primary" />
						</div>
					</div>

					{/* Title */}
					<h1 className="text-4xl font-bold tracking-tight text-slate-900">
						404 – Page Not Found
					</h1>

					{/* Description */}
					<p className="text-slate-600 text-base leading-relaxed">
						Oops! The page you’re looking for doesn’t exist or may have been
						moved. Don’t worry — let’s get you back to shopping.
					</p>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
						<Button asChild size="lg" className="rounded-xl">
							<Link to="/" className="flex items-center gap-2">
								<Home className="h-4 w-4" />
								Back to Home
							</Link>
						</Button>

						<Button asChild variant="outline" size="lg" className="rounded-xl">
							<Link to="/search" className="flex items-center gap-2">
								<Search className="h-4 w-4" />
								Browse Products
							</Link>
						</Button>
					</div>

					{/* Footer hint */}
					<p className="text-sm text-slate-400 pt-6">
						If you believe this is a mistake, please contact our support team.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
