// app/providers.tsx
"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
export function Providers({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session | null;
}) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				{children}
			</SessionProvider>
		</QueryClientProvider>
	);
}
