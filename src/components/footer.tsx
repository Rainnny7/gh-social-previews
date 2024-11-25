import { ReactElement } from "react";
import Link from "next/link";
import { SlSocialGithub } from "react-icons/sl";

const Footer = (): ReactElement => (
    <footer className="mt-auto pb-5 flex flex-col gap-2.5 items-center opacity-85">
        {/* Credits */}
        <div className="text-sm">
            Made with <span className="animate-pulse">💙</span> by{" "}
            <Link
                className="text-blue-500 hover:opacity-75 transition-all transform-gpu"
                href="https://github.com/Rainnny7"
            >
                Rainnny
            </Link>
        </div>

        {/* Source Link */}
        <Link
            className="hover:opacity-75 transition-all transform-gpu"
            href="https://github.com/Rainnny7/gh-social-previews"
        >
            <SlSocialGithub className="size-6" />
        </Link>
    </footer>
);
export default Footer;
