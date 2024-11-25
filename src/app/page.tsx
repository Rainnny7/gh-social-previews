import { ReactElement } from "react";
import Header from "@/components/header";
import MediaGenerator from "@/components/media-generator";
import Footer from "@/components/footer";

const HomePage = (): ReactElement => (
    <main className="px-5 pt-36 pb-5 h-screen flex flex-col gap-10 items-center">
        <Header />
        <MediaGenerator />
        <Footer />
    </main>
);
export default HomePage;
