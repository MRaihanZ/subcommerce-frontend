import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	// CardAction,
	CardContent,
	// CardDescription,
	// CardFooter,
	CardHeader,
	// CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

import SignIn from "./signIn";
import SignUp from "./signUp";

export default function SignInUp() {
	return (
		<>
			<Tabs defaultValue="login">
				<TabsList>
					<TabsTrigger value="login">Masuk</TabsTrigger>
					<TabsTrigger value="register">Daftar</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60%">
						<CardHeader>
							{/* <CardTitle>Masuk</CardTitle>
							<CardDescription>
								Make changes to your account here. Click save when you&apos;re
								done.
							</CardDescription> */}
						</CardHeader>
						<CardContent>
							<SignIn />
						</CardContent>
						{/* <CardFooter>
							<Button>Save changes</Button>
						</CardFooter> */}
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60%">
						<CardHeader>
							{/* <CardTitle>Daftar</CardTitle>
							<CardDescription>
								Change your password here. After saving, you&apos;ll be logged
								out.
							</CardDescription> */}
						</CardHeader>
						<CardContent>
							<SignUp />
						</CardContent>
						{/* <CardFooter>
							<Button>Save password</Button>
						</CardFooter> */}
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
