import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

import { GET_CHUCK_NORRIS_FACT_BY_TEXT } from "../../queries/getChuckNorrisByText";
import { FactDataSearch } from "../../types/types";

const INPUT_ID = "freeTextInput";
const ERROR_ID = "inputError";
const SECTION_ID = "freeTextSectionTitle";

export const useFactByFreeText = () => {
  const [freeText, setFreeText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [searchFacts, { loading, data, error }] = useLazyQuery<FactDataSearch>(
    GET_CHUCK_NORRIS_FACT_BY_TEXT,
    {
      // Unlike the random endpoints, a text search is deterministic for a given
      // term — repeating one is served from the cache instead of the network.
      fetchPolicy: "cache-first",
      onCompleted: () => setHasSubmitted(true),
    }
  );

  // The React Compiler memoizes both handlers, so their identities stay stable
  // across renders without `useCallback` wrappers.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(false);

    const trimmedText = freeText.trim();
    if (trimmedText === "") {
      setInputError(true);
      return;
    }

    setInputError(false);
    searchFacts({ variables: { query: trimmedText } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreeText(e.target.value);
    if (inputError && e.target.value.trim() !== "") {
      setInputError(false);
    }
  };

  return {
    freeText,
    inputError,
    hasSubmitted,
    loading,
    data,
    error,
    inputId: INPUT_ID,
    errorId: ERROR_ID,
    sectionId: SECTION_ID,
    handleInputChange,
    handleSubmit,
  };
};
