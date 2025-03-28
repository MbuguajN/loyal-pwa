"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductTabProps {
	image: string
	title: string
	price: string
	className?: string
	onClick?: () => void
}

export default function ProductTab({
	image = "/placeholder.svg?height=80&width=80",
	title = "Premium Cotton T-Shirt",
	price = "$29.99",
	className,
	onClick,
}: ProductTabProps) {
	return (
		<div
			className={cn(
				"flex items-center p-4 gap-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer",
				className,
			)}
			onClick={onClick}
		>
			<div className="flex-shrink-0">
				<Image
					src={image || "/placeholder.svg"}
					alt={title}
					width={80}
					height={80}
					className="rounded-md object-cover"
				/>
			</div>

			<div className="flex-grow">
				<h3 className="font-medium text-base md:text-lg truncate">{title}</h3>
			</div>

			<div className="flex-shrink-0 font-semibold text-base md:text-lg">{price}</div>
		</div>
	)
}
