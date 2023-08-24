// Action types
import {
  IS_UPDATING_PROFILE_PICTURE,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,
  IS_UPDATING_PROFILE_BANNER,
  UPDATE_PROFILE_BANNER_SUCCESS,
  UPDATE_PROFILE_BANNER_FAILURE,
  IS_FETCHING_FOLLOWERS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  IS_FETCHING_FOLLOWINGS,
  FETCH_FOLLOWINGS_SUCCESS,
  FETCH_FOLLOWINGS_FAILURE,
  IS_UPDATING_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  IS_FETCHING_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  IS_SEARCHING_POPULAR_USERS,
  SEARCH_POPULAR_USERS_SUCCESS,
  SEARCH_POPULAR_USERS_FAILURE,
  IS_FOLLOWING_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  IS_FETCHING_REWARDS,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_FAILURE,
  IS_SETTING_FRAME,
  SET_FRAME_SUCCESS,
  SET_FRAME_FAILURE,
  IS_FETCHING_FOLLOWED,
  FETCH_FOLLOWED_SUCCESS,
  FETCH_FOLLOWED_FAILURE,
  IS_RESETING_BELL,
  RESET_BELL_SUCCESS,
  RESET_BELL_FAILURE,
  IS_RESETING_MESSAGES,
  RESET_MESSAGES_SUCCESS,
  RESET_MESSAGES_FAILURE,
  IS_SEARCHING_FILTERED_USERS,
  SEARCH_FILTERED_USERS_SUCCESS,
  SEARCH_FILTERED_USERS_FAILURE,
  IS_CHECKING_EMAIL,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  IS_SEARCHING_TAG_USERS,
  SEARCH_TAG_USERS_SUCCESS,
  SEARCH_TAG_USERS_FAILURE,
  IS_SEARCHING_TAG_PARTICIPANTS,
  SEARCH_TAG_PARTICIPANTS_SUCCESS,
  SEARCH_TAG_PARTICIPANTS_FAILURE,
  IS_SEARCHING_HASH_TAGS,
  SEARCH_HASH_TAGS_SUCCESS,
  SEARCH_HASH_TAGS_FAILURE
} from './UserActionTypes';

const initialState = {
  error: '',
  isUpdatingProfilePicture: false,
  isUpdatingProfileBanner: false,
  isFetchingFollowers: false,
  isFetchingFollowings: false,
  isUpdatingUser: false,
  isFetchingUser: false,
  isSearchingPopularUsers: false,
  isSearchingFilteredUsers: false,
  isFollowingUser: false,
  isFetchingRewards: false,
  isSettingFrame: false,
  isFetchingFollowed: false,
  isFollowed: false,
  isResetingBell: false,
  isResetingMessages: false,
  isCheckingEmail: false,
  isSearchingTagUsers: false,
  isSearchingTagParticipants: false,
  isSearchingHashTags: false,
  hashtags: [],
  tagUsers: [],
  tagParticipants: [],
  rewards: [],
  popularUsers: [],
  filteredUsers: [],
  user: {},
  followers: [],
  followings: []
};

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_UPDATING_PROFILE_PICTURE: {
      return {
        ...state,
        isUpdatingProfilePicture: true,
        error: ''
      };
    }
    case UPDATE_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        isUpdatingProfilePicture: false
      };
    }
    case UPDATE_PROFILE_PICTURE_FAILURE: {
      return {
        ...state,
        error: action.error,
        isUpdatingProfilePicture: false
      };
    }
    case IS_UPDATING_PROFILE_BANNER: {
      return {
        ...state,
        isUpdatingProfileBanner: true,
        error: ''
      };
    }
    case UPDATE_PROFILE_BANNER_SUCCESS: {
      return {
        ...state,
        isUpdatingProfileBanner: false
      };
    }
    case UPDATE_PROFILE_BANNER_FAILURE: {
      return {
        ...state,
        isUpdatingProfileBanner: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWERS: {
      return {
        ...state,
        isFetchingFollowers: true,
        error: ''
      };
    }
    case FETCH_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        isFetchingFollowers: false,
        followers: action.followers
      };
    }
    case FETCH_FOLLOWERS_FAILURE: {
      return {
        ...state,
        isFetchingFollowers: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWINGS: {
      return {
        ...state,
        isFetchingFollowings: true,
        error: ''
      };
    }
    case FETCH_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        isFetchingFollowings: false,
        followings: action.followings
      };
    }
    case FETCH_FOLLOWINGS_FAILURE: {
      return {
        ...state,
        isFetchingFollowers: false,
        error: action.error
      };
    }
    case IS_UPDATING_USER: {
      return {
        ...state,
        isUpdatingUser: true,
        error: ''
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUpdatingUser: false
      };
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        isUpdatingUser: false,
        error: action.error
      };
    }
    case IS_FETCHING_USER: {
      return {
        ...state,
        isFetchingUser: true,
        error: ''
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        isFetchingUser: false,
        user: action.user
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        isFetchingUser: false,
        error: action.error
      };
    }
    case IS_SEARCHING_POPULAR_USERS: {
      return {
        ...state,
        isSearchingPopularUsers: true,
        error: ''
      };
    }
    case SEARCH_POPULAR_USERS_SUCCESS: {
      return {
        ...state,
        isSearchingPopularUsers: false,
        popularUsers: action.popularUsers
      };
    }
    case SEARCH_POPULAR_USERS_FAILURE: {
      return {
        ...state,
        isSearchingPopularUsers: false,
        error: action.error
      };
    }
    case IS_SEARCHING_FILTERED_USERS: {
      return {
        ...state,
        isSearchingFilteredUsers: true,
        error: ''
      };
    }
    case SEARCH_FILTERED_USERS_SUCCESS: {
      return {
        ...state,
        isSearchingFilteredUsers: false,
        filteredUsers: action.filteredUsers
      };
    }
    case SEARCH_FILTERED_USERS_FAILURE: {
      return {
        ...state,
        isSearchingFilteredUsers: false,
        error: action.error
      };
    }
    case IS_FOLLOWING_USER: {
      return {
        ...state,
        isFollowingUser: true,
        error: ''
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        isFollowingUser: false
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
        isFollowingUser: false,
        error: action.error
      };
    }
    case IS_FETCHING_REWARDS: {
      return {
        ...state,
        isFetchingRewards: true,
        error: ''
      };
    }
    case FETCH_REWARDS_SUCCESS: {
      return {
        ...state,
        isFetchingRewards: false,
        rewards: action.rewards
      };
    }
    case FETCH_REWARDS_FAILURE: {
      return {
        ...state,
        isFetchingRewards: false,
        error: action.error
      };
    }
    case IS_SETTING_FRAME: {
      return {
        ...state,
        isSettingFrame: true,
        error: ''
      };
    }
    case SET_FRAME_SUCCESS: {
      return {
        ...state,
        isSettingFrame: false
      };
    }
    case SET_FRAME_FAILURE: {
      return {
        ...state,
        isSettingFrame: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWED: {
      return {
        ...state,
        isFetchingFollowed: true,
        error: ''
      };
    }
    case FETCH_FOLLOWED_SUCCESS: {
      return {
        ...state,
        isFetchingFollowed: false,
        isFollowed: action.isFollowed
      };
    }
    case FETCH_FOLLOWED_FAILURE: {
      return {
        ...state,
        isFetchingFollowed: false,
        error: action.error
      };
    }
    case IS_RESETING_BELL: {
      return {
        ...state,
        isResetingBell: true,
        error: ''
      };
    }
    case RESET_BELL_SUCCESS: {
      return {
        ...state,
        isResetingBell: false
      };
    }
    case RESET_BELL_FAILURE: {
      return {
        ...state,
        isResetingBell: false,
        error: action.error
      };
    }
    case IS_RESETING_MESSAGES: {
      return {
        ...state,
        isResetingMessages: true,
        error: ''
      };
    }
    case RESET_MESSAGES_SUCCESS: {
      return {
        ...state,
        isResetingMessages: false
      };
    }
    case RESET_MESSAGES_FAILURE: {
      return {
        ...state,
        isResetingMessages: false,
        error: action.error
      };
    }
    case IS_CHECKING_EMAIL: {
      return {
        ...state,
        isCheckingEmail: true,
        error: ''
      };
    }
    case CHECK_EMAIL_SUCCESS: {
      return {
        ...state,
        isCheckingEmail: false,
      };
    }
    case CHECK_EMAIL_FAILURE: {
      return {
        ...state,
        isCheckingEmail: false,
        error: action.error
      };
    }
    case IS_SEARCHING_TAG_USERS: {
      return {
        ...state,
        isSearchingTagUsers: true
      };
    }
    case SEARCH_TAG_USERS_SUCCESS: {
      return {
        ...state,
        isSearchingTagUsers: false,
        tagUsers: action.tagUsers
      };
    }
    case SEARCH_TAG_USERS_FAILURE: {
      return {
        ...state,
        isSearchingTagUsers: false,
        error: action.error
      };
    }
    case IS_SEARCHING_HASH_TAGS: {
      return {
        ...state,
        isSearchingHashTags: true
      };
    }
    case SEARCH_HASH_TAGS_SUCCESS: {
      return {
        ...state,
        isSearchingHashTags: false,
        hashtags: action.hashtags
      };
    }
    case SEARCH_HASH_TAGS_FAILURE: {
      return {
        ...state,
        isSearchingHashTags: false,
        error: action.error
      };
    }
    case IS_SEARCHING_TAG_PARTICIPANTS: {
      return {
        ...state,
        isSearchingTagParticipants: true
      };
    }
    case SEARCH_TAG_PARTICIPANTS_SUCCESS: {
      return {
        ...state,
        isSearchingTagParticipants: false,
        tagParticipants: action.tagParticipants
      };
    }
    case SEARCH_TAG_PARTICIPANTS_FAILURE: {
      return {
        ...state,
        isSearchingTagParticipants: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
