import React, {useEffect, useCallback, useReducer, useMemo, useContext} from 'react';
import {Icon} from '@yandex-cloud/uikit';

import {BlogFeedContext} from '../../contexts/BlogFeedContext';
import {RouterContext} from '../../contexts/RouterContext';

import {DEFAULT_PAGE, DEFAULT_BLOG_ROWS_PER_PAGE} from '../constants';

import {BlogMetrikaGoalIds} from '../../constants';

import {getFeedQueryParams, scrollBlogOnPageChange} from '../../utils/blog';

import {FeedHeader} from '../../components/FeedHeader/FeedHeader';
import {PostsError} from '../../components/PostsError/PostsError';
import {Posts} from '../../components/Posts/Posts';

import metrika from '../../counters/metrika.js';
import {MetrikaCounter} from '../../counters/utils';

import {HandleChangeQueryParams} from '../../models/blog';

import {ActionTypes, reducer} from './reducer';

type BlogFeedProps = {
    image: string;
};

const containerId = 'blog-cards';

export const BlogFeed: React.FC<BlogFeedProps> = ({image}) => {
    const {posts, totalCount, tags, services, pinnedPost, getBlogPosts, setQuery} =
        useContext(BlogFeedContext);
    const router = useContext(RouterContext);

    const [
        {
            errorLoad,
            errorShowMore,
            isFetching,
            isShowMoreFetching,
            isShowMoreVisible,
            lastLoadedCount,
            postCountOnPage,
            postsOnPage,
            pinnedPostOnPage,
            currentPage,
            queryParams,
        },
        dispatch,
    ] = useReducer(reducer, {
        errorLoad: false,
        errorShowMore: false,
        isFetching: false,
        isShowMoreFetching: false,
        isShowMoreVisible: true,
        lastLoadedCount: posts?.length || 0,
        postCountOnPage: totalCount || 0,
        postsOnPage: posts,
        pinnedPostOnPage: pinnedPost,
        currentPage: router?.query?.page ? Number(router.query.page) : DEFAULT_PAGE,
        queryParams: router.query || {},
    });

    const perPageInQuery = queryParams?.perPage
        ? Number(queryParams.perPage)
        : DEFAULT_BLOG_ROWS_PER_PAGE;

    const handlePageChange = async (value: number) => {
        dispatch({type: ActionTypes.QueryParamsChange, payload: {page: value}});
        dispatch({type: ActionTypes.PageChange, payload: value});
    };

    const handleChangeQueryParams: HandleChangeQueryParams = (value) => {
        dispatch({type: ActionTypes.QueryParamsChange, payload: value});
    };

    const fetchData = useCallback(
        async (pageNumber?: number) => {
            if (queryParams && getBlogPosts) {
                const query = getFeedQueryParams(queryParams, pageNumber);
                const data = await getBlogPosts(query);

                return data;
            } else {
                throw new Error('cant get request');
            }
        },
        [getBlogPosts, queryParams],
    );

    const setIsFetching = (value: boolean) => {
        dispatch({type: ActionTypes.SetIsFetching, payload: value});
    };

    const fetchAndReplaceData = useCallback(async () => {
        try {
            dispatch({type: ActionTypes.SetErrorLoad, payload: false});
            const fetchedData = await fetchData();

            if (fetchedData) {
                dispatch({
                    type: ActionTypes.SetPosts,
                    payload: {
                        posts: fetchedData.posts,
                        pinnedPost: fetchedData.pinnedPost,
                        count: fetchedData.count,
                    },
                });
            }
        } catch (err) {
            dispatch({type: ActionTypes.SetErrorLoad, payload: true});
        }

        scrollBlogOnPageChange(containerId);
        setIsFetching(false);
    }, [fetchData]);

    const handleShowMore = async () => {
        dispatch({type: ActionTypes.SetIsShowMoreFetching, payload: true});

        metrika.reachGoal(MetrikaCounter.CrossSite, BlogMetrikaGoalIds.showMore);
        try {
            const fetchedData = await fetchData(currentPage + 1);

            handleChangeQueryParams({
                page: currentPage + 1,
            });

            if (fetchedData) {
                dispatch({
                    type: ActionTypes.SetShowMore,
                    payload: {
                        posts: (postsOnPage ?? []).concat(fetchedData.posts),
                        count: fetchedData.count,
                        currentPage: currentPage + 1,
                        lastLoadedCount: fetchedData.posts.length,
                    },
                });
            }
        } catch (err) {
            dispatch({type: ActionTypes.SetErrorShowMore, payload: true});
        }

        dispatch({type: ActionTypes.SetIsShowMoreFetching, payload: false});
    };

    useEffect(() => {
        if (isFetching) {
            fetchAndReplaceData();
        }
    }, [fetchAndReplaceData, isFetching]);

    useEffect(() => {
        const loadedPostsCount = currentPage * perPageInQuery;
        dispatch({
            type: ActionTypes.SetIsShowMoreVisible,
            payload: loadedPostsCount < postCountOnPage,
        });
    }, [currentPage, lastLoadedCount, perPageInQuery, postCountOnPage]);

    const serviceItems = useMemo(
        () =>
            services?.map((service) => ({
                title: service.name,
                value: `${service.id}`,
            })),
        [services],
    );

    const tagItems = useMemo(
        () =>
            tags?.map((tag) => ({
                title: tag.name,
                value: tag.slug,
                icon: tag.icon && <Icon data={tag.icon} />,
            })),
        [tags],
    );

    return (
        <div>
            <FeedHeader
                verticalOffset="s"
                tags={tagItems}
                services={serviceItems}
                setIsFetching={setIsFetching}
                handleChangeQuery={handleChangeQueryParams}
                queryParams={queryParams}
                setQuery={setQuery}
                background={{
                    fullWidth: true,
                    url: image,
                }}
            />
            {errorLoad ? (
                <PostsError onButtonClick={fetchAndReplaceData} />
            ) : (
                <Posts
                    containerId={containerId}
                    currentPage={currentPage}
                    isShowMoreVisible={isShowMoreVisible}
                    errorShowMore={errorShowMore}
                    postCountOnPage={postCountOnPage}
                    perPageInQuery={perPageInQuery}
                    handleShowMore={handleShowMore}
                    handlePageChange={handlePageChange}
                    postsOnPage={postsOnPage}
                    pinnedPostOnPage={pinnedPostOnPage}
                    isFetching={isFetching}
                    isShowMoreFetching={isShowMoreFetching}
                />
            )}
        </div>
    );
};
