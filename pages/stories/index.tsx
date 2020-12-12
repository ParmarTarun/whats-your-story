import React from "react";
import { GetServerSideProps } from "next";
import { ErrorProps } from "next/error";
import * as url from "../../utils/urls";
import { Story } from "../../utils/customTypes";
import StoriesOverview from "../../components/StoriesOverview";

const PublicStories = ({
  stories,
  error,
}: {
  stories: Array<Story>;
  error: ErrorProps;
}) => <StoriesOverview stories={stories} error={error} />;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(url.stories);
  let json = { data: {} };
  if (res.status < 400) json = await res.json();
  return {
    props: {
      error: { statusCode: res.status, title: res.statusText },
      stories: json.data,
    },
  };
};

export default PublicStories;
