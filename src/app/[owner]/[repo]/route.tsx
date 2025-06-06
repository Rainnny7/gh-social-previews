import { cn } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { Octokit } from "octokit";
import { ReactElement, ReactNode } from "react";
import { GoIssueOpened, GoRepoForked } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ owner: string; repo: string }> }
) => {
    const { owner, repo } = await params;
    const { searchParams } = new URL(request.url);
    const withStats: boolean =
        searchParams.has("stats") && searchParams.get("stats") === "true";
    const isDark: boolean =
        !searchParams.has("dark") || searchParams.get("dark") !== "false";
    const transparentBackground: boolean =
        searchParams.has("transparent") &&
        searchParams.get("transparent") === "true";

    // Validate the given input prior to making the request
    if (!owner || !repo || owner.length === 0 || repo.length === 0) {
        return Response.json({ error: "Invalid repository" }, { status: 400 });
    }

    // Lookup the repository via the GitHub API
    let ghRepository: any | undefined = undefined;
    try {
        ghRepository = (
            await octokit.request("GET /repos/{owner}/{repo}", {
                owner,
                repo,
            })
        ).data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return Response.json(
                { error: "Failed to locate repository" },
                { status: 404 }
            );
        }
        console.error("Failed to fetch repository:", error);
    }

    // Return the rendered image
    return new ImageResponse(
        (
            <div
                tw={cn(
                    "p-[3.333rem] w-full h-full flex flex-col justify-center",
                    isDark ? "bg-black/95 text-white" : "bg-white/95",
                    transparentBackground && "bg-transparent"
                )}
            >
                {/* Repository Name & Description */}
                <div tw="flex flex-col">
                    <h1 tw="text-6xl font-bold leading-[5px]">
                        {ghRepository?.full_name}
                    </h1>
                    <p tw="max-w-3xl text-xl opacity-75">
                        {ghRepository?.description}
                    </p>
                </div>

                {/* Repository Owner & Stats */}
                <div tw="absolute inset-x-15 bottom-12 flex justify-between">
                    {/* Owner Avatar */}
                    <img
                        tw="rounded-full"
                        src={ghRepository?.owner.avatar_url}
                        alt={`Avatar of ${ghRepository?.owner.login}`}
                        width={86}
                        height={86}
                    />

                    {/* Stats */}
                    {withStats && (
                        <div tw="flex items-center">
                            <Stat
                                icon={<IoStarOutline size={40} />}
                                value={ghRepository?.stargazers_count}
                            />
                            <Stat
                                icon={<GoIssueOpened size={40} />}
                                value={ghRepository?.open_issues_count}
                            />
                            <Stat
                                icon={<GoRepoForked size={40} />}
                                value={ghRepository?.forks_count}
                            />
                        </div>
                    )}
                </div>
            </div>
        ),
        {
            width: 1280,
            height: 640,
        }
    );
};

const Stat = ({
    icon,
    value,
}: {
    icon: ReactNode;
    value: string;
}): ReactElement => (
    <div tw="px-2 flex flex-col items-center">
        <div tw="flex pb-1.5">{icon}</div>
        <span className="text-3xl opacity-75">{value}</span>
    </div>
);
