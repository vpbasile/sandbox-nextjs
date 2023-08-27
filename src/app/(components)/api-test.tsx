import { Octokit } from "octokit";

const octokit = new Octokit({});

await octokit.request("GET /octocat", {})