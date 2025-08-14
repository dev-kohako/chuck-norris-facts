import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_RANDOM_CHUCK_NORRIS_FACT } from "../../queries/getChuckNorrisFact";

export const useRandomFact = () => {
  const [getFact, { loading, data, error }] = useLazyQuery(
    GET_RANDOM_CHUCK_NORRIS_FACT,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    getFact();
  }, [getFact]);

  const handleClick = () => {
    getFact();
  };

  return { handleClick, loading, data, error };
};
