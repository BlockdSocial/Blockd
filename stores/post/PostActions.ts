import {
  IS_CREATING_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  IS_DELETING_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  IS_LIKING_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  IS_SEARCHING_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  IS_FETCHING_TRENDING_POSTS,
  FETCH_TRENDING_POSTS_SUCCESS,
  FETCH_TRENDING_POSTS_FAILURE,
  IS_FETCHING_FILTERED_POSTS,
  FETCH_FILTERED_POSTS_SUCCESS,
  FETCH_FILTERED_POSTS_FAILURE,
  IS_FETCHING_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  IS_FETCHING_POST_IMAGE,
  FETCH_POST_IMAGE_SUCCESS,
  FETCH_POST_IMAGE_FAILURE,
  IS_FETCHING_POST_INFO,
  FETCH_POST_INFO_SUCCESS,
  FETCH_POST_INFO_FAILURE,
  IS_FETCHING_USER_POSTS,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  IS_DISLIKING_POST,
  DISLIKE_POST_SUCCESS,
  DISLIKE_POST_FAILURE,
  IS_FETCHING_IS_LIKED,
  FETCH_IS_LIKED_SUCCESS,
  FETCH_IS_LIKED_FAILURE,
  IS_FETCHING_IS_DISLIKED,
  FETCH_IS_DISLIKED_SUCCESS,
  FETCH_IS_DISLIKED_FAILURE,
  IS_ADDING_POST_VIEW,
  ADD_POST_VIEW_SUCCESS,
  ADD_POST_VIEW_ERROR,
  IS_UPDATING_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  IS_SUGGESTING,
  SUGGEST_SUCCESS,
  SUGGEST_FAILURE,
  IS_SHARING_POST,
  SHARE_POST_SUCCESS,
  SHARE_POST_FAILURE,
  IS_FETCHING_SHARED_POST,
  FETCH_POST_SHARED_SUCCESS,
  FETCH_POST_SHARED_FAILURE,
  IS_CREATING_SUGGESTION,
  CREATE_SUGGESTION_SUCCESS,
  CREATE_SUGGESTION_FAILURE,
  IS_FETCHING_SUGGESTIONS,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  IS_FETCHING_HASH_POSTS,
  FETCH_HASH_POSTS_SUCCESS,
  FETCH_HASH_POSTS_FAILURE
} from './PostActionTypes';

// Api
import { postApi } from '../../api';

export function createPost(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CREATING_POST });
    try {
      await postApi.createPost(fields);
      dispatch({ type: CREATE_POST_SUCCESS });
    } catch (error: any) {
      console.log('Post error: ', error);
      dispatch({
        type: CREATE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function deletePost(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DELETING_POST });
    try {
      await postApi.deletePost(fields);
      dispatch({ type: DELETE_POST_SUCCESS });
    } catch (error: any) {
      console.log('Delete Post error: ', error);
      dispatch({
        type: DELETE_POST_FAILURE,
        error: error.message
      });
      return ({ errors: error?.message });
    }
  }
}

export function likePost(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_LIKING_POST });
    try {
      await postApi.likePost(fields);
      dispatch({ type: LIKE_POST_SUCCESS });
    } catch (error: any) {
      console.log('Like Post error: ', error);
      dispatch({
        type: LIKE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function dislikePost(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DISLIKING_POST });
    try {
      await postApi.dislikePost(fields);
      dispatch({ type: DISLIKE_POST_SUCCESS });
    } catch (error: any) {
      console.log('Dislike Post error: ', error);
      dispatch({
        type: DISLIKE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function searchPosts(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SEARCHING_POSTS });
    try {
      const result = await postApi.searchPosts(fields);
      dispatch({
        type: SEARCH_POSTS_SUCCESS,
        postsResult: result
      });
      return result;
    } catch (error: any) {
      console.log('Search Posts error: ', error);
      dispatch({
        type: SEARCH_POSTS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchHashTagPosts(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_HASH_POSTS });
    try {
      const result = await postApi.fetchHashTagPosts(fields);
      dispatch({
        type: FETCH_HASH_POSTS_SUCCESS,
        hashPosts: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch hash Posts error: ', error);
      dispatch({
        type: FETCH_HASH_POSTS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchTrendingPosts() {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_TRENDING_POSTS });
    try {
      const result = await postApi.fetchTrendingPosts();
      dispatch({
        type: FETCH_TRENDING_POSTS_SUCCESS,
        trendingPosts: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Trending posts error: ', error);
      dispatch({
        type: FETCH_TRENDING_POSTS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchFilteredPosts(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_FILTERED_POSTS });
    try {
      const result = await postApi.fetchFilteredPosts(fields);
      dispatch({
        type: FETCH_FILTERED_POSTS_SUCCESS,
        filteredPosts: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Filtered posts error: ', error);
      dispatch({
        type: FETCH_FILTERED_POSTS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchPost(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_POST });
    try {
      const result = await postApi.fetchPost(fields);
      dispatch({
        type: FETCH_POST_SUCCESS,
        post: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Post Error: ', error);
      dispatch({
        type: FETCH_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchSharedPost(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_SHARED_POST });
    try {
      const result = await postApi.fetchPost(fields);
      dispatch({
        type: FETCH_POST_SHARED_SUCCESS,
        sharedPost: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Post Error: ', error);
      dispatch({
        type: FETCH_POST_SHARED_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchPostImage(fields: number) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_POST_IMAGE });
    try {
      const result = await postApi.fetchPostImage(fields);
      dispatch({
        type: FETCH_POST_IMAGE_SUCCESS,
        image: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Post Image Error: ', error);
      dispatch({
        type: FETCH_POST_IMAGE_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchPostInfo(fields: number) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_POST_INFO });
    try {
      const result = await postApi.fetchPostInfo(fields);
      dispatch({
        type: FETCH_POST_INFO_SUCCESS,
        postInfo: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Post Info Error: ', error);
      dispatch({
        type: FETCH_POST_INFO_FAILURE,
        // error: error.message
      });
    }
  }
}

export function fetchUserPosts(id: any, fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER_POSTS });
    try {
      const result = await postApi.fetchUserPosts(id, fields);
      dispatch({ 
        type: FETCH_USER_POSTS_SUCCESS, 
        userPosts: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch User Posts error: ', error);
      dispatch({
        type: FETCH_USER_POSTS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchIsLiked(fields: number) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_IS_LIKED });
    try {
      const result = await postApi.fetchIsLiked(fields);
      dispatch({
        type: FETCH_IS_LIKED_SUCCESS,
        isLiked: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch is Liked error: ', error);
      dispatch({
        type: FETCH_IS_LIKED_FAILURE,
        // error: error.message
      });
    }
  }
}

export function fetchIsDisliked(fields: number) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_IS_DISLIKED });
    try {
      const result = await postApi.fetchIsDisliked(fields);
      dispatch({
        type: FETCH_IS_DISLIKED_SUCCESS,
        isDisliked: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch is Disliked error: ', error);
      dispatch({
        type: FETCH_IS_DISLIKED_FAILURE,
        // error: error.message
      });
    }
  }
}

export function addPostView(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_ADDING_POST_VIEW });
    try {
      await postApi.addPostView(fields);
      dispatch({
        type: ADD_POST_VIEW_SUCCESS,
      });
    } catch (error: any) {
      console.log('Add Post View Error: ', error);
      dispatch({
        type: ADD_POST_VIEW_ERROR,
        error: error.message
      });
    }
  }
}

export function editPost(id: any, fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_UPDATING_POST });
    try {
      await postApi.editPost(id, fields);
      dispatch({
        type: UPDATE_POST_SUCCESS
      });
    } catch (error: any) {
      console.log('Update Post Error: ', error);
      dispatch({
        type: UPDATE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function postSuggestion(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SUGGESTING });
    try {
      await postApi.postSuggestion(fields);
      dispatch({
        type: SUGGEST_SUCCESS
      });
    } catch (error: any) {
      console.log('Suggestion Failed: ', error);
      dispatch({
        type: SUGGEST_FAILURE,
        error: error.message
      });
    }
  }
}

export function sharePost(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SHARING_POST });
    try {
      await postApi.sharePost(fields);
      dispatch({
        type: SHARE_POST_SUCCESS
      });
    } catch (error: any) {
      console.log('Share Failed: ', error);
      dispatch({
        type: SHARE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function createSuggestion(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CREATING_SUGGESTION });
    try {
      await postApi.createSuggestion(fields);
      dispatch({
        type: CREATE_SUGGESTION_SUCCESS
      });
    } catch (error: any) {
      console.log('Create Suggestion error: ', error);
      dispatch({
        type: CREATE_SUGGESTION_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchSuggestions() {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_SUGGESTIONS });
    try {
      const result = await postApi.fetchSuggestions();
      dispatch({
        type: FETCH_SUGGESTIONS_SUCCESS,
        suggestions: result
      });
      return result;
    } catch (error: any) {
      console.log('Create Suggestion error: ', error);
      dispatch({
        type: FETCH_SUGGESTIONS_FAILURE,
        error: error.message
      });
    }
  }
}
