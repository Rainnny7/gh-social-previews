import { ImageResponse } from "next/og";
import { Octokit } from "octokit";
import { ReactElement, ReactNode } from "react";
import { IoStarOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { GoIssueOpened, GoRepoForked } from "react-icons/go";

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
            <div tw="p-[3.333rem] w-full h-full flex flex-col justify-center bg-black/95 text-white">
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
                        width={72}
                        height={72}
                    />

                    {/* Stats */}
                    {withStats && (
                        <div tw="flex items-center">
                            <Stat
                                className="text-yellow-500"
                                icon={<IoStarOutline />}
                                value={ghRepository?.stargazers_count}
                            />
                            <Stat
                                className="text-red-500"
                                icon={<GoIssueOpened />}
                                value={ghRepository?.open_issues_count}
                            />
                            <Stat
                                className="text-blue-500"
                                icon={<GoRepoForked />}
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
    className,
    icon,
    value,
}: {
    className?: string;
    icon: ReactNode;
    value: string;
}): ReactElement => (
    <div tw="px-2 flex flex-col items-center">
        <div tw={cn("flex pb-0.5", className)}>{icon}</div>
        <span className="opacity-75">{value}</span>
    </div>
);
