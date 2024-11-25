import { ReactElement } from "react";

const Header = (): ReactElement => (
    <header className="flex flex-col gap-1 items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">
            GitHub Social Previews
        </h1>
        <p className="max-w-sm sm:max-w-md sm:text-xl opacity-75">
            A simple Next.js app that generates social previews for GitHub
            repositories.
        </p>
    </header>
);
export default Header;
