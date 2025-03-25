import { CreditCard, Wifi } from "lucide-react"
import Link from "next/link";

export default function BankCardFront({ holderName, points, storeName, storeId }: { storeId: number; holderName: string; points: number; storeName: string }) {
	return (
		<Link className="m-2" href={`/rewards/${storeId}`}>
			<div className="w-full max-w-md mx-auto">
				<div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-purple-600 to-blue-700 p-6 text-white">
					<div className="flex justify-between items-start">
						<div className="font-bold text-xl tracking-tight">{storeName}</div>
						<div className="text-right">
							<div className="text-xs opacity-75">Balance</div>
							<div className="font-bold">{points}</div>
						</div>
					</div>

					<div className="mt-6 flex items-center">
						<div className="w-12 h-9 bg-yellow-300/90 rounded-md mr-3"></div>
						<div className="flex items-center gap-2">
							<CreditCard className="w-8 h-8 opacity-80" />
							<Wifi className="w-6 h-6 rotate-90 opacity-80" />
						</div>
					</div>

					{/*			<div className="mt-8 text-xl tracking-widest font-mono">
					<span>5412</span> <span>7534</span> <span>8901</span> <span>2345</span>
				</div>*/}

					<div className="mt-6 grid grid-cols-2">
						<div>
							<div className="text-xs opacity-75">Points Holder</div>
							<div className="font-medium tracking-wide">{holderName}</div>
						</div>
						<div>
							<div className="text-xs opacity-75"></div>
							<div className="font-medium tracking-wide"></div>
						</div>
					</div>

					<div className="absolute bottom-6 right-6">
						<svg className="h-10 w-16 opacity-80" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.8)" />
							<circle cx="40" cy="20" r="18" fill="rgba(255,255,255,0.6)" fillOpacity="0.8" />
						</svg>
					</div>
				</div>
			</div></Link>
	)
}


