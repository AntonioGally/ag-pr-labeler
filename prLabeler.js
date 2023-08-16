const { Octokit } = require("@octokit/core");
const github = require('@actions/github');
const core = require('@actions/core');

const context = github.context;
const githubToken = core.getInput("githubToken");
// Create a new Octokit instance
const octokit = new Octokit({ auth: githubToken });

// Extract the relevant information from the GitHub Actions context
const owner = context.repo.owner;
const repo = context.repo.repo;
const pull_number = context.payload.pull_request.number;
const head_branch_name = context.payload.pull_request.head.ref;

// Define a mapping from commit type to label
const commitTypeToLabel = {
    feat: 'Feature',
    fix: 'Bug',
    docs: 'Documentation',
    style: 'Style',
    refactor: 'Refactor',
    perf: 'Performance',
    test: 'Tests',
    build: 'Build',
    ci: 'CI',
    chore: 'Chore',
    revert: 'Revert',
    itsm: 'ITSM',
    hotfix: 'Hotfix',
};

// Define a function to get all commit messages for a PR
async function getCommitMessages() {
    const commits = await octokit.request(`GET /repos/${owner}/${repo}/pulls/${pull_number}/commits`);

    return commits.data.map(commit => commit.commit.message);
}

// Define a function to apply a label to a PR
async function applyLabel(label) {
    await octokit.request(`POST /repos/${owner}/${repo}/issues/${pull_number}/labels`, {
        labels: [label]
    });
}

// Get the commit messages and apply labels
getCommitMessages().then(commitMessages => {

    commitMessages.forEach(message => {
        // This regex looks for a pattern like "type(scope): description" at the start of the commit message
        const match = message.match(/^(\w+)(\(.+\))?: .+/);

        if (match) {
            const commitType = match[1];
            const label = commitTypeToLabel[commitType];

            if (label) {
                applyLabel(label);
            }
        }
    });

    if (head_branch_name.indexOf("hotfix") > -1) {
        applyLabel(commitTypeToLabel["hotfix"]);
    }

    if (head_branch_name.indexOf("itsm") > -1) {
        applyLabel(commitTypeToLabel["itsm"]);
    }

}).catch(console.error);
