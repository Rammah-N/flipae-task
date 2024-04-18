import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
				<ScrollArea className="h-full flex-1 ">
					<main className="flex-1 py-5">{children}</main>
				</ScrollArea>
			</body>
		</html>
	);
}
