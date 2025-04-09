import axios from "axios";

export const fetchMarkdown = async (path: string) => {
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3.raw",
    },
  });

  return res.data;
};
