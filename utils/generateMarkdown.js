// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(badge) {
  if (badge) {
    console.log(badge);

    return `![Static Badge](https://img.shields.io/badge/license-${badge}-brightgreen)`;
  } else {
    return " ";
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
// function renderLicenseLink(license) {

// }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
async function renderLicenseSection(
  data,
  licenses,
  userLicense,
  writeToFile,
  octokit
) {
  // console.log(licenses);
  // console.log(userLicense);

  let userLicenseData = licenses.data.find(
    (license) => license.name === userLicense[0]
  );
  console.log(userLicenseData.key, "Founded ****");

  // Search the license text with the key
  let licenseDetail = await octokit.request(
    `GET /licenses/${userLicenseData.key}`,
    {
      license: "LICENSE",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  let currentYear = new Date().getFullYear();
  let licenseText = licenseDetail.data.body;

  if (userLicenseData.key == "mit") {
    licenseText = licenseDetail.data.body
      .replace("[year]", currentYear)
      .replace("[fullname]", data.username);
  }

  writeToFile("./LICENSE.txt", licenseText, (err) => {
    if (err) {
      return err;
    }
  });
}

function installationGuide(data) {
  if (data.installation) {
    return `
## Installation Guide
For installation, download this project from GitHub and, simply run the following command in your terminal:

\`\`\`bash
npm install
\`\`\`

## Usage Guide

After installation, simply run the following command in your terminal:

\`\`\`bash
node index.js
\`\`\`

Then answer the prompts to create a professional README file for your project.
    `;
  } else {
    return "";
  }
}

function contributingGuide(data) {
  if (data.contributing) {
    return `
## Contributing

If you would like to contribute to this project, please fork the repository and make your contributions. You can then create a pull request.`;
  } else {
    return "";
  }
}
// TODO: Create a function to generate markdown for README
function generateMarkdown(data, licenses, writeToFile, octokit) {
  // return `# ${data.title}
  console.log("===>", data);

  if (data.license != "none") {
    renderLicenseSection(data, licenses, data.license, writeToFile, octokit);
  }

  return `
# ${data.project_name}

${renderLicenseBadge(
  data.license[0].split(" ")[0]
)} ![GitHub commit activity](https://img.shields.io/github/commit-activity/t/${
    data.github
  }/${data.project_name
    .split(" ")
    .join(
      "-"
    )}) ![GitHub contributors](https://img.shields.io/github/contributors/${
    data.github
  }/${data.project_name.split(" ").join("-")})



## This Project

${data.description}

## README Generator 

<p align="center">
<img src="./src/${data.project_name}.png" />
</p>

${installationGuide(data)}

${contributingGuide(data)}

## License

Lincensed under the ${data.license}`;
}

module.exports = generateMarkdown;
