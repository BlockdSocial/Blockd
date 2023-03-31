import React, { useEffect } from "react";
import SuggestionSearch from "./SuggestionSearch";
import SuggestionBox from "./SuggestionBox";
import SuggestionBody from "./SuggestionBody";
import PostTest from "../Feed/Post";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchSuggestions } from "../../stores/post/PostActions";

function SuggestionPage() {
  const dispatch = useAppDispatch();
  const { suggestions } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    await dispatch(fetchSuggestions());
  };

  return (
    <div className="min-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 pb-14 pt-4">
      <SuggestionBox refetchFiltered={getSuggestions} />
      {/* <SuggestionSearch /> */}
      <div className="p-4">
        {suggestions &&
          suggestions?.map((post: any, index: number) => (
            // @ts-ignore
            <PostTest
              key={`${index}-post`}
              // @ts-ignore
              mainPost={post}
              refetch={() => {}}
            />
          ))}
      </div>
      {/* {Array.from({ length: 5 }, (_, i) => (
        <PostTest key={i} />
      ))} */}
    </div>
  );
}

export default SuggestionPage;
