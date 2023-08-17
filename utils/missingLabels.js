const { commitTypeToLabel } = require("./sharedFunctions");

const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const createMissingLabels = async (octokit, owner, repo, missingLabels) => {
    try {
        for (let label of missingLabels) {
            const color = getRandomHexColor().substring(1);  // Removing the '#'

            await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
                name: label,
                color: color
            });

            console.log(`Label "${label}" with color "${color}" created successfully.`);
        }
    } catch (error) {
        console.error("Error creating label:", error);
    }
}


const verifyIfRepoHasAllLabels = async (octokit, owner, repo) => {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/labels`);
    const existingLabelsNames = response.data.map(label => label.name);

    const requiredLabels = Object.values(commitTypeToLabel);
    const missingLabels = requiredLabels.filter(label => !existingLabelsNames.includes(label));

    if (missingLabels.length > 0) {
        await createMissingLabels(octokit, owner, repo, missingLabels);
        return;
    }

    console.log("All required labels existents");
}

module.exports = {
    verifyIfRepoHasAllLabels
}