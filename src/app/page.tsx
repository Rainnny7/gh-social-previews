import { ReactElement } from "react";
import Header from "@/components/header";
import MediaGenerator from "@/components/media-generator";

const HomePage = (): ReactElement => (
    <main className="px-5 py-44 h-screen flex flex-col gap-10 items-center">
        <Header />
        <MediaGenerator />
    </main>
);
export default HomePage;
