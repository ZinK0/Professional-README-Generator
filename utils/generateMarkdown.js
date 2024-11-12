// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
// function renderLicenseLink(license) {

// }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
async function renderLicenseSection(
  licenses,
  userLicense,
  writeToFile,
  octokit
) {
  console.log(licenses);
  console.log(userLicense);

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

  console.log(licenseDetail.data.body);

  writeToFile("./LICENSE.txt", licenseDetail.data.body, (err) => {
    if (err) {
      return err;
    }
  });
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, licenses, writeToFile, octokit) {
  // return `# ${data.title}
  console.log("===>", data);

  renderLicenseSection(licenses, data.license, writeToFile, octokit);

  // `;
}

module.exports = generateMarkdown;
