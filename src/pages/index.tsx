import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Stack,
  StackDivider,
  StepTitle,
  Text,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Contribution from "../components/card";
import { useEffect, useState } from "react";
const { Octokit } = require("@octokit/core");
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const API_KEY = process.env.REACT_APP_API_KEY;

const octokit = new Octokit({
  auth: API_KEY,
});

export default function Home() {
  useEffect(() => {
    getGithubUsers();
  }, []);

  const { data: session } = useSession();

  const [PullRequests, setPullRequests] = useState<any[]>([]);

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
    console.log("Didid it; ", pulls.data);

    // const repos = await octokit.request('GET /users/sonylomo/repos', {
    //   username: 'sonylomo',
    //   sort:'updated',
    //   headers: {
    //     'X-GitHub-Api-Version': '2022-11-28'
    //   }
    // })
    // console.log("repos; ", repos.data);
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
        <Box className={`${inter.className}`} h={"100vh"} px={"10%"} py={"5%"}>
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
        </Box>
      )}
    </>
  );
}
