"use client";

import { ReactElement, useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RiGitRepositoryLine, RiLoader4Line } from "react-icons/ri";

const MediaGenerator = (): ReactElement => {
    const [owner, setOwner] = useState<string>("Rainnny7");
    const [repo, setRepo] = useState<string>("gh-social-previews");
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [withStats, setWithStats] = useState<boolean>(false);
    const [transparent, setTransparent] = useState<boolean>(false);

    return (
        <div className="w-full max-w-screen-lg md:h-82 flex flex-col md:flex-row justify-between bg-zinc-900/65 rounded-xl divide-y md:divide-x md:divide-y-0 divide-zinc-800">
            <Settings
                owner={owner}
                repo={repo}
                darkMode={darkMode}
                withStats={withStats}
                transparent={transparent}
                setDarkMode={setDarkMode}
                setOwner={setOwner}
                setRepo={setRepo}
                setWithStats={setWithStats}
                setTransparent={setTransparent}
            />
            <MediaPreview
                owner={owner}
                repo={repo}
                darkMode={darkMode}
                withStats={withStats}
                transparent={transparent}
            />
        </div>
    );
};

const Settings = ({
    owner,
    repo,
    darkMode,
    withStats,
    transparent,
    setDarkMode,
    setOwner,
    setRepo,
    setWithStats,
    setTransparent,
}: {
    owner: string;
    repo: string;
    darkMode: boolean;
    withStats: boolean;
    transparent: boolean;
    setDarkMode: (value: boolean) => void;
    setOwner: (value: string) => void;
    setRepo: (value: string) => void;
    setWithStats: (value: boolean) => void;
    setTransparent: (value: boolean) => void;
}): ReactElement => (
    <div className="px-5 py-3.5 w-full flex flex-col gap-4 items-center">
        {/* Header */}
        <h1 className="text-xl font-semibold">Settings</h1>

        {/* Settings */}
        <div className="flex flex-col gap-4.5">
            <RepositoryInput
                owner={owner}
                repo={repo}
                setOwner={setOwner}
                setRepo={setRepo}
            />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <WithStatsToggle
                withStats={withStats}
                setWithStats={setWithStats}
            />
            <TransparencyToggle
                transparent={transparent}
                setTransparent={setTransparent}
            />
        </div>
    </div>
);

const MediaPreview = ({
    darkMode,
    owner,
    repo,
    withStats,
    transparent,
}: {
    darkMode: boolean;
    owner: string;
    repo: string;
    withStats: boolean;
    transparent: boolean;
}): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);
    const [errored, setErrored] = useState<boolean>(false);
    const previewSource: string = `/${owner}/${repo}?dark=${darkMode ? "true" : "false"}&stats=${withStats ? "true" : "false"}&transparent=${transparent ? "true" : "false"}`;

    // Reset loading state when source changes
    useEffect(() => {
        setLoading(true);
        setErrored(false);
    }, [previewSource]);

    return (
        <div className="px-5 py-3.5 w-full flex flex-col gap-4 items-center">
            {/* Header */}
            <h1 className="text-xl font-semibold">Preview</h1>

            {/* Preview */}
            <div className="flex flex-col gap-2.5">
                {(loading || errored) &&
                    (loading ? (
                        <RiLoader4Line className="mx-auto size-7 opacity-75 animate-spin" />
                    ) : (
                        <div className="px-2 py-0.5 flex gap-1 items-center text-sm bg-red-900 rounded-xl">
                            <RiGitRepositoryLine className="size-4" />
                            <span>Repository not found</span>
                        </div>
                    ))}
                {owner && repo && (
                    <Image
                        key={previewSource}
                        className={cn("rounded-xl", errored && "hidden")}
                        src={previewSource}
                        alt="Generated social preview"
                        width={532}
                        height={532}
                        draggable={false}
                        onLoad={() => {
                            setLoading(false);
                            setErrored(false);
                        }}
                        onError={() => {
                            setLoading(false);
                            setErrored(true);
                        }}
                    />
                )}
                {/* TODO: Download */}
            </div>
        </div>
    );
};

const RepositoryInput = ({
    owner,
    repo,
    setOwner,
    setRepo,
}: {
    owner: string;
    repo: string;
    setOwner: (value: string) => void;
    setRepo: (value: string) => void;
}): ReactElement => {
    const [inputValue, setInputValue] = useState<string>(
        `${owner}${repo ? `/${repo}` : ""}`
    );

    // When the owner or repo changes, update the input value
    useEffect(() => {
        setInputValue(`${owner}${repo ? `/${repo}` : ""}`);
    }, [owner, repo]);

    return (
        <div className="flex flex-col gap-1 justify-center">
            {/* Label */}
            <label className="font-semibold">Repository</label>

            {/* Setting */}
            <div className="flex">
                <input
                    className="w-full px-2 py-1.5 border text-white/85 border-zinc-800 rounded-lg"
                    placeholder="Repository Owner/Name"
                    value={inputValue}
                    onChange={(event) => {
                        const value: string = event.target.value;
                        setInputValue(value);

                        // Extract owner and repo from input value
                        const parts = value.split("/");
                        setOwner(parts[0]);
                        setRepo(parts.slice(1).join("/"));
                    }}
                />
            </div>
        </div>
    );
};

const ThemeToggle = ({
    darkMode,
    setDarkMode,
}: {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}): ReactElement => (
    <div className="flex gap-7 md:gap-10 items-center">
        {/* Label */}
        <div className="flex flex-col">
            <label className="font-semibold">Dark Mode</label>
            <p className="text-sm opacity-75">Whether the theme is dark mode</p>
        </div>

        {/* Setting */}
        <div className="p-1.5 flex gap-1 items-center bg-background/70 rounded-full">
            <button
                className={cn(
                    "p-1.5 cursor-pointer rounded-full transition-all transform-gpu",
                    darkMode && "bg-zinc-800"
                )}
                onClick={() => setDarkMode(true)}
            >
                <BsMoonStars className="size-4" />
            </button>
            <button
                className={cn(
                    "p-1.5 cursor-pointer rounded-full transition-all transform-gpu",
                    !darkMode && "bg-zinc-800"
                )}
                onClick={() => setDarkMode(false)}
            >
                <BsSun className="size-4" />
            </button>
        </div>
    </div>
);

const WithStatsToggle = ({
    withStats,
    setWithStats,
}: {
    withStats: boolean;
    setWithStats: (value: boolean) => void;
}): ReactElement => (
    <div className="flex gap-7 md:gap-10 items-center">
        {/* Label */}
        <div className="flex flex-col">
            <label className="font-semibold">With Stats</label>
            <p className="text-sm opacity-75">
                Whether to display repository stats
            </p>
        </div>

        {/* Setting */}
        <input
            className="ml-auto"
            type="checkbox"
            checked={withStats}
            onChange={(event) => setWithStats(event.target.checked)}
        />
    </div>
);

const TransparencyToggle = ({
    transparent,
    setTransparent,
}: {
    transparent: boolean;
    setTransparent: (value: boolean) => void;
}): ReactElement => (
    <div className="flex gap-7 md:gap-10 items-center">
        {/* Label */}
        <div className="flex flex-col">
            <label className="font-semibold">Transparent</label>
            <p className="text-sm opacity-75">
                Whether the background is transparent
            </p>
        </div>

        {/* Setting */}
        <input
            className="ml-auto"
            type="checkbox"
            checked={transparent}
            onChange={(event) => setTransparent(event.target.checked)}
        />
    </div>
);

export default MediaGenerator;
