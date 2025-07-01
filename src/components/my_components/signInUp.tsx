import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInUp() {
	return (
		<>
			<Tabs defaultValue="account" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="account">Sign In</TabsTrigger>
					<TabsTrigger value="password">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="Sign In">Sign In In Here</TabsContent>
				<TabsContent value="Sign Up">Sign Up In Here</TabsContent>
			</Tabs>
		</>
	);
}
