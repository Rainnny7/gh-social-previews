import { ReactElement } from "react";
import Link from "next/link";

const HomePage = (): ReactElement => (
    <main className="h-screen flex flex-col gap-2 justify-center items-center text-center">
        <h1 className="text-4xl font-bold">Hello There!</h1>
        <p className="max-w-sm opacity-75">
            This is a basic GitHub social preview generator I made,{" "}
            <Link
                className="text-blue-400 hover:opacity-75 transition-all transform-gpu"
                href="/Rainnny7/gh-social-previews"
            >
                feel free to try it out
            </Link>
            !
        </p>
    </main>
);
export default HomePage;
