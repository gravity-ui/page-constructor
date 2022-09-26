// @ts-nocheck
// TODO fix types in https://st.yandex-team.ru/ORION-1447

import {BlogPostData} from '../../models/blog';

export enum ActionTypes {
    SetErrorLoad = 'setErrorLoad',
    SetErrorShowMore = 'setErrorShowMore',
    SetIsShowMoreVisible = 'setIsShowMoreVisible',
    SetPosts = 'setPosts',
    SetShowMore = 'setShowMore',
    SetIsFetching = 'setIsFetching',
    SetIsShowMoreFetching = 'setIsShowMoreFetching',
    PageChange = 'pageChange',
}

export type State = {
    currentPage: number;
    errorLoad: boolean;
    errorShowMore: boolean;
    isFetching: boolean;
    isShowMoreFetching: boolean;
    isShowMoreVisible: boolean;
    lastLoadedCount: number;
    pinnedPostOnPage?: BlogPostData;
    postCountOnPage: number;
    postsOnPage?: BlogPostData[];
};

type Action =
    | {
          type: ActionTypes.PageChange;
          payload: number;
      }
    | {
          type: ActionTypes.SetIsFetching;
          payload: boolean;
      }
    | {
          type: ActionTypes.SetIsShowMoreFetching;
          payload: boolean;
      }
    | {
          type: ActionTypes.SetPosts;
          payload: {
              posts: BlogPostData[];
              pinnedPost: BlogPostData;
              count: number;
          };
      }
    | {
          type: ActionTypes.SetShowMore;
          payload: {
              posts: BlogPostData[];
              count: number;
              currentPage: number;
              lastLoadedCount: number;
          };
      }
    | {
          type: ActionTypes.SetErrorLoad;
          payload: boolean;
      }
    | {
          type: ActionTypes.SetErrorShowMore;
          payload: boolean;
      }
    | {
          type: ActionTypes.SetIsShowMoreVisible;
          payload: boolean;
      };

export const reducer = (state: State, {type, payload}: Action): State => {
    switch (type) {
        case ActionTypes.SetIsShowMoreVisible:
            return {
                ...state,
                isShowMoreVisible: payload,
            };
        case ActionTypes.SetPosts:
            return {
                ...state,
                lastLoadedCount: payload.count,
                postCountOnPage: payload.count,
                pinnedPostOnPage: payload.pinnedPost,
                postsOnPage: payload.posts,
            };
        case ActionTypes.SetShowMore:
            return {
                ...state,
                lastLoadedCount: payload.lastLoadedCount,
                postCountOnPage: payload.count,
                currentPage: payload.currentPage,
                postsOnPage: payload.posts,
                errorShowMore: false,
                isShowMoreFetching: true,
            };
        case ActionTypes.SetIsFetching:
            return {
                ...state,
                isFetching: payload,
            };
        case ActionTypes.SetIsShowMoreFetching:
            return {
                ...state,
                isShowMoreFetching: payload,
            };
        case ActionTypes.PageChange:
            return {
                ...state,
                currentPage: payload,
                isFetching: true,
            };
        case ActionTypes.SetErrorLoad:
            return {
                ...state,
                errorLoad: payload,
            };
        case ActionTypes.SetErrorShowMore:
            return {
                ...state,
                errorShowMore: payload,
            };
        default:
            return state;
    }
};
