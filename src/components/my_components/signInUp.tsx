import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	// CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import SignIn from "./signIn";
import SignUp from "./signUp";

export default function SignInUp() {
	return (
		<>
			<Tabs defaultValue="login">
				<TabsList>
					<TabsTrigger value="login" className="cursor-pointer">
						Masuk
					</TabsTrigger>
					<TabsTrigger value="register" className="cursor-pointer">
						Daftar
					</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60%">
						<CardHeader className="hidden">
							<CardTitle className="hidden">Masuk</CardTitle>
							<CardDescription className="hidden">
								Make changes to your account here. Click save when you are done.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SignIn />
						</CardContent>
						<CardFooter className="hidden">
							<Button>Save changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60%">
						<CardHeader className="hidden">
							<CardTitle className="hidden">Daftar</CardTitle>
							<CardDescription className="hidden">
								Change your password here. After saving, you will be logged out.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SignUp />
						</CardContent>
						<CardFooter className="hidden">
							<Button>Save password</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
