import type { Metadata, Viewport } from "next";
import { ReactElement, ReactNode } from "react";
import "./style/globals.css";

export const metadata: Metadata = {
    title: "GitHub Social Previews",
    description:
        "A simple Next.js app that generates social previews for GitHub repositories.",
};
export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: ReactNode;
}>): Promise<ReactElement> => (
    <html lang="en">
        <body className={`scroll-smooth antialiased`}>{children}</body>
    </html>
);
export default RootLayout;
