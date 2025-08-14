import { useCallback, useState } from "react";
import { FactDataSearch } from "../../types/types";
import { useLazyQuery } from "@apollo/client";
import { GET_CHUCK_NORRIS_FACT_BY_TEXT } from "../../queries/getChuckNorrisByText";

export const useFactByFreeText = () => {
  const [freeText, setFreeText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [searchFacts, { loading, data, error }] = useLazyQuery<FactDataSearch>(
    GET_CHUCK_NORRIS_FACT_BY_TEXT,
    {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setHasSubmitted(true);
      },
    }
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setHasSubmitted(false);

      const trimmedText = freeText.trim();
      if (trimmedText === "") {
        setInputError(true);
        return;
      }

      setInputError(false);
      searchFacts({ variables: { query: trimmedText } });
    },
    [freeText, searchFacts]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFreeText(e.target.value);
      if (inputError && e.target.value.trim() !== "") {
        setInputError(false);
      }
    },
    [inputError]
  );

  const inputId = "freeTextInput";
  const errorId = "inputError";
  const sectionId = "freeTextSectionTitle";

  return {
    freeText,
    inputError,
    hasSubmitted,
    loading,
    data,
    error,
    inputId,
    errorId,
    sectionId,
    handleInputChange,
    handleSubmit,
  };
};
