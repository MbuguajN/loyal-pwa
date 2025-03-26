import { Loader2 } from "lucide-react";

export function CenteredLoading() {
	return (

		<div className="grid h-screen w-screen place-items-center">

			<Loader2 className="animate-spin w-10 h-10" />
		</div>
	)

}
