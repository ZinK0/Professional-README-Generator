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
    let licenseText = licenseDetail.data.body
      .replace("[year]", currentYear)
      .replace("[fullname]", data.username);
  }

  writeToFile("./LICENSE.txt", licenseText, (err) => {
    if (err) {
      return err;
    }
  });
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, licenses, writeToFile, octokit) {
  // return `# ${data.title}
  console.log("===>", data);

  if (data.license != "none") {
    renderLicenseSection(data, licenses, data.license, writeToFile, octokit);
  } else {
    return " ";
  }
  // `;
}

module.exports = generateMarkdown;
