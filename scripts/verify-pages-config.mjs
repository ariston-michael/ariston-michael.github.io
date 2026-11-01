const repository = process.env.GITHUB_REPOSITORY;
if (repository !== "ariston-michael/ariston-michael.github.io")
  throw new Error("Unexpected release repository.");
const response = await fetch(
  `https://api.github.com/repos/${repository}/pages`,
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  },
);
if (!response.ok)
  throw new Error(
    `Cannot verify Pages configuration: HTTP ${response.status}.`,
  );
const pages = await response.json();
if (pages.build_type !== "workflow")
  throw new Error(
    "Pages source must be switched to GitHub Actions after explicit owner approval; this workflow will not change settings.",
  );
if (pages.html_url !== "https://ariston-michael.github.io/")
  throw new Error("Unexpected Pages URL.");
console.log("Pages source and canonical root verified; no settings changed.");
