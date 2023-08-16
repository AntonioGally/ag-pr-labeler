const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');

const { getCommitMessages, applyLabels, getCommitLabels } = require("./utils/sharedFunctions");
const { verifyIfRepoHasAllLabels } = require("./utils/missingLabels");

async function main() {
    const githubToken = core.getInput("githubToken");
    const createRepoLabels = core.getInput("createRepoLabels");

    const context = github.context;
    const octokit = new Octokit({ auth: githubToken });

    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const pull_number = context.payload.pull_request.number;
    const head_branch_name = context.payload.pull_request.head.ref;

    const commitMessages = await getCommitMessages(octokit, owner, repo, pull_number);

    let commitLabels = getCommitLabels(commitMessages, head_branch_name);

    if (commitLabels.length === 0) return;

    createRepoLabels && await verifyIfRepoHasAllLabels(octokit, owner, repo);

    await applyLabels(commitLabels, octokit, owner, repo, pull_number);
}

main();