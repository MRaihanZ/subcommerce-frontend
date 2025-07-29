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

import SignIn from "./signIn";
import SignUp from "./signUp";

interface SignInUpProps {
	setOpenCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignInUp({ setOpenCloseDialog }: SignInUpProps) {
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
							<CardTitle></CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent>
							<SignIn setOpenCloseDialog={setOpenCloseDialog} />
						</CardContent>
						<CardFooter className="hidden"></CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60%">
						<CardHeader className="hidden">
							<CardTitle></CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent>
							<SignUp setOpenCloseDialog={setOpenCloseDialog} />
						</CardContent>
						<CardFooter className="hidden"></CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
