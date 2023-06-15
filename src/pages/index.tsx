import Layout from "@/components/layout";
import { Box } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Contribution from "../components/card";
const { Octokit } = require("@octokit/core");

const inter = Inter({ subsets: ["latin"] });
const GITHUB_TOKEN = process.env.GITHUB_SECRET;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export default function Home() {
  const { data: session } = useSession();
  const [GhId, setGhId] = useState<string>();
  const [Repos, setRepos] = useState<string[]>([]);
  const [Contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    setGhId(filter(session?.user?.image ?? ""));
    getUserInfo();
    getGithubUsers();
    getRepos();
  }, [GhId, session]);

  useEffect(() => {
    Repos.map((repo, i) => {
      return getContributions(repo);
    });
  }, [Repos]);

  const [PullRequests, setPullRequests] = useState<any[]>([]);
  const [UserInfo, setUserInfo] = useState(); //repos_url: "https://api.github.com/users/sonylomo/repos" login: "sonylomo"

  const filter = (url: string) => {
    /* "https://avatars.githubusercontent.com/u/49971500?v=4" */
    if (url) return url.split("/")[4].split("?")[0];
  };
  console.log("GH id", GhId);

  async function getUserInfo() {
    if (GhId) {
      const info = await octokit.request(`GET /user/${GhId}`, {
        // username: 'USERNAME',
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log("Didid it; ", info.data);
      setUserInfo(info.data);
    }
  }

  async function getGithubUsers() {
    const pulls = await octokit.request(
      "GET /repos/Mirrorful/mirrorful/pulls",
      {
        owner: "Mirrorful",
        repo: "mirrorful",
        state: "all",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    setPullRequests(pulls.data);
    // console.log("Didid it; ", pulls.data);
  }

  async function getRepos() {
    if (UserInfo) {
      const repos = await octokit.request(
        `GET /users/${UserInfo.login}/repos`,
        {
          // username: UserInfo.login,
          sort: "updated",
          per_page:5,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      setRepos(
        repos.data.map((repo: { name: any }) => {
          return repo.name;
        })
      );
      // setRepos(repos.data)

      console.log("state repos; ", Repos);

      console.log("repos; ", repos.data[0]);
    }
  }

  async function getContributions(repo: string) {
    if (UserInfo) {
      const contributions = await octokit.request(
        `GET /repos/${UserInfo.login}/${repo}/pulls`,
        {
          owner: UserInfo.login,
          repo: repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      console.log("Contribution; ", contributions.data);
      return setContributions(contributions.data);
    }
  }


  const cleanup = () => {
    // title
    // created_at
    // state
    // merged_at
    // url
    // user.login
    // body
  };

  return (
    <>
      <Head>
        <title>GH Harambee</title>
        <meta
          name="description"
          content="Record your open source contributions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎟️</text></svg>"
        />
      </Head>
      {!session ? (
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <Layout>
          {/* <Box
            className={`${inter.className}`}
            h={"100vh"}
            px={"10%"}
            py={"5%"}
          >
            {PullRequests.filter((item) => item.user.login === "sonylomo").map(
              (
                {
                  title,
                  created_at,
                  state,
                  merge_at,
                  html_url,
                  user,
                  description,
                },
                i
              ) => {
                return (
                  <Contribution
                    key={i}
                    title={title}
                    user_login={user}
                    created_at={created_at}
                    state={state}
                    merge_at={merge_at}
                    url={html_url}
                    description={description}
                  />
                );
              }
            )}
          </Box> */}
          <Box
            className={`${inter.className}`}
            h={"100vh"}
            px={"10%"}
            py={"5%"}
            // key={i}
          >
            {Contributions ? (
              Contributions.map(
                (
                  {
                    title,
                    created_at,
                    state,
                    merge_at,
                    url,
                    user_login,
                    description,
                  },
                  i
                ) => {
                  return (
                    <Contribution
                      key={i}
                      title={title}
                      user_login={user_login}
                      created_at={created_at}
                      state={state}
                      merge_at={merge_at}
                      url={url}
                      description={description}
                    />
                  );
                }
              )
            ) : (
              <p>not yet</p>
            )}
          </Box>
        </Layout>
      )}
      ‰‰
    </>
  );
}
