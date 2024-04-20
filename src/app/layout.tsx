import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContextProvider } from "@/context/employees";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "FlipAE EMS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className)}>
				<Sidebar />
				<ScrollArea className="h-screen w-full">
					<ContextProvider>
						<main className="flex-1">{children}</main>
					</ContextProvider>
				</ScrollArea>
				<Toaster />
			</body>
		</html>
	);
}
