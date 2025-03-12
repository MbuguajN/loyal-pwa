// app/providers.tsx
"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from 'jotai'
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
		<Provider>
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={session}>
					<Toaster />
					{children}
				</SessionProvider>
			</QueryClientProvider>
		</Provider>
	);
}
