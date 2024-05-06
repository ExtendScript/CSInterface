module.exports = {
  branches: [{ name: "master" }],

  // ],
  npmPublish: true,
  dryRun: false,
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    ["@semantic-release/github", { successComment: true }],
  ],
};
