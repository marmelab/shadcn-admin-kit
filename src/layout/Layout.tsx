
import { CoreLayoutProps } from "ra-core";
import { NavigationBar } from "./NavigationBar";
import { UserMenu } from "./UserMenu";

export const Layout = (props: CoreLayoutProps) => {
	return (
		<div className="min-h-screen flex flex-col p-2">
			<div className="border-b grow-0">
				<div className="flex pr-4 w-full justify-between">
					<NavigationBar />
					<UserMenu />
				</div>
			</div>
			<div className="grow mt-8">{props.children}</div>
		</div>
	);
};
