import React, { useEffect } from "react";
import SuggestionSearch from "./SuggestionSearch";
import SuggestionBox from "./SuggestionBox";
import SuggestionBody from "./SuggestionBody";
import PostTest from "../Feed/Post";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchSuggestions } from "../../stores/post/PostActions";
import { isEmpty } from "lodash";
import { toast } from "react-hot-toast";

function SuggestionPage() {
  const dispatch = useAppDispatch();
  const { suggestions, error } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    getSuggestions();
  }, []);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  const getSuggestions = async () => {
    await dispatch(fetchSuggestions());
  };

  return (
    <div className="min-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 pb-14 pt-4">
      <SuggestionBox refetchFiltered={getSuggestions} />
      {/* <SuggestionSearch /> */}
      {/* <div className="p-4">
        {suggestions &&
          suggestions?.map((post: any, index: number) => (
            // @ts-ignore
            // <PostTest
            //   key={`${index}-post`}
            //   // @ts-ignore
            //   mainPost={post}
            //   refetch={() => {}}
            // />
            <SuggestionBody 
              key={index}
              post={post}
            />
          ))}
      </div> */}
      {/* {Array.from({ length: 5 }, (_, i) => (
        <PostTest key={i} />
      ))} */}
    </div>
  );
}

export default SuggestionPage;
