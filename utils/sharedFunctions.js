const commitTypeToLabel = {
    feat: 'Feature :sparkles:',
    fix: 'Bug :bug:',
    docs: 'Documentation :memo:',
    style: 'Style :lipstick:',
    refactor: 'Refactor :hammer_and_wrench:',
    perf: 'Performance :racing_car:',
    test: 'Tests :microscope:',
    build: 'Build :construction_worker:',
    ci: 'CI :robot:',
    chore: 'Chore :broom:',
    revert: 'Revert :rewind:',
    itsm: 'ITSM :clipboard:',
    hotfix: 'Hotfix :fire_extinguisher:',
};

async function getCommitMessages(octokit, owner, repo, pull_number) {
    const commits = await octokit.request(`GET /repos/${owner}/${repo}/pulls/${pull_number}/commits`);

    return commits.data.map(commit => commit.commit.message);
}

async function applyLabels(labels, octokit, owner, repo, pull_number) {
    await octokit.request(`POST /repos/${owner}/${repo}/issues/${pull_number}/labels`, {
        labels
    });
    
    console.log("Added labels: ", labels);
}

function getCommitLabels(commitMessages, head_branch_name) {
    let commitLabels = [];
    commitMessages.forEach(message => {
        // This regex looks for a pattern like "type(scope): description" in the commit message
        const match = message.match(/^(\w+)(\(.+\))?: .+/);
        if (match) {
            const commitType = match[1];
            const label = commitTypeToLabel[commitType];
            if (label) commitLabels.push(label);
        }
    });

    if (head_branch_name.indexOf("hotfix") > -1) {
        commitLabels.push(commitTypeToLabel["hotfix"]);
    }

    if (head_branch_name.indexOf("itsm") > -1) {
        commitLabels.push(commitTypeToLabel["itsm"]);
    }

    return commitLabels;
}

module.exports = {
    getCommitMessages,
    applyLabels,
    getCommitLabels,
    commitTypeToLabel
}