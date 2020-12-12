import React, { useState, useEffect } from "react";
import { getMyStories } from "../../utils/storyCalls";
import StoriesOverview from "../../components/StoriesOverview";

const PublicStories = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState({
    statusCode: 200,
    title: "OK",
  });

  useEffect(() => {
    getMyStories()
      .then((stories) => setStories(stories))
      .catch((e) =>
        setError({ statusCode: 400, title: e.message })
      );
  }, []);

  return <StoriesOverview stories={stories} error={error} />;
};
export default PublicStories;
