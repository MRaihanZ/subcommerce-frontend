import {
	SidebarProvider,
	SidebarTrigger,
	Sidebar,
	SidebarContent,
	// SidebarFooter,
	// SidebarGroup,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
export default function Chat() {
	return (
		<>
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>test</SidebarHeader>
					<SidebarContent>
						{/* <SidebarGroup>
                        </SidebarGroup> */}
						<Button type="button" variant="outline">
							test
						</Button>
					</SidebarContent>
					{/* <SidebarFooter /> */}
				</Sidebar>
				<main>
					<SidebarTrigger />
					<section>Chat Pages</section>
				</main>
			</SidebarProvider>
		</>
	);
}
