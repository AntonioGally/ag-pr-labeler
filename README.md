## GitHub PR Labeler based on commit messages

This action add lables to your PR. These labels are based on your pr's commits messages.

### Inputs

| **Name**             | Type   | Description                                                                                               | Required |
|----------------------|--------|-----------------------------------------------------------------------------------------------------------|----------|
| **createRepoLabels** | string | This action can create all necessary labels, to do so, this flag must be active                                                   | false     |
| **githubToken**      | string | GH token that will provide the permissions to read and write in your repository                           | true     |


### Usage
Include this action in your workflow file. Here is an example:

```yml
on:
  pull_request:
    types: [opened] #only closed pr

jobs:
  labeler:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run label CI
        uses: AntonioGally/ag-pr-labeler/@main
        with:
          createRepoLabels: true
          githubToken: ${{ secrets.GITHUB_TOKEN }} #Github default token, PATs are recomended
```

### Observations
This action uses the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) guideline to add labels. The code read all commits inside the PR and with regex, extract the type of each commit. For each commit type, one label is added. Besides that, if you're merging a branch with the prefix `itsm` or `hotfix`, will be added labels for those as well. 

### Example

<img width="800" alt="image" src="https://github.com/AntonioGally/ag-pr-labeler/assets/68209906/cda7e0cb-7c02-46de-8055-4ef1c5fc96ad">
<br/>
<img width="190" alt="image" src="https://github.com/AntonioGally/ag-pr-labeler/assets/68209906/88daca4a-0e5b-46e1-8429-ac8fe8fcc2dc">

### Contributing
Just send a nice PR that I'll review it with love :D Or just email me as well I'll read

### Under the hood
(Not ready yet, but go take a look at the code, u can do this :D)

### Contacts

 - antonio.gally@gmail.com
 - https://www.linkedin.com/in/antonio-gally/
 - https://github.com/AntonioGally