import React, {MouseEvent} from 'react';
import block from 'bem-cn-lite';

import CardLayout from '@yandex-data-ui/page-constructor/build/esm/blocks/CardLayout/CardLayout';
import {Button} from '@yandex-cloud/uikit';

import {BlogPostData} from '../../models/blog';

import {i18, BlogKeyset} from '../../i18n';

import {Paginator} from '../Paginator/Paginator';
import {PostCard} from '../PostCard/PostCard';
import {PostsEmpty} from '../PostsEmpty/PostsEmpty';

import './Posts.scss';

const b = block('Posts');

type PostCardProps = {
    containerId: string;
    currentPage: number;
    isShowMoreVisible: boolean;
    errorShowMore: boolean;
    postCountOnPage: number;
    perPageInQuery: number;
    isFetching: boolean;
    isShowMoreFetching: boolean;
    handleShowMore: (
        value?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => Promise<void> | void;
    handlePageChange: (value: number) => Promise<void> | void;
    postsOnPage?: BlogPostData[];
    pinnedPostOnPage?: BlogPostData;
};

export const Posts: React.FC<PostCardProps> = ({
    containerId,
    pinnedPostOnPage,
    currentPage,
    postsOnPage,
    isShowMoreVisible,
    errorShowMore,
    postCountOnPage,
    perPageInQuery,
    isFetching,
    isShowMoreFetching,
    handleShowMore,
    handlePageChange,
}) => (
    <div className={b()}>
        <div id={containerId} className={b('cards-container')}>
            {pinnedPostOnPage && currentPage === 1 && (
                <div className={b('pinned-container')}>
                    <PostCard post={pinnedPostOnPage} size="m" fullWidth showTag isModernIcon />
                </div>
            )}
            {postsOnPage?.length ? (
                <CardLayout
                    title={''}
                    colSizes={{
                        all: 12,
                        lg: 4,
                        md: 6,
                    }}
                >
                    {postsOnPage?.map((post) => (
                        <PostCard key={post.id} post={post} showTag isModernIcon={true} />
                    ))}
                </CardLayout>
            ) : (
                <PostsEmpty />
            )}
        </div>

        <div className={b('pagination')}>
            {Boolean(isShowMoreVisible && postsOnPage?.length) && (
                <Button
                    view="outlined"
                    size="xl"
                    className={b('more-button')}
                    onClick={handleShowMore}
                    loading={isShowMoreFetching}
                >
                    {i18(BlogKeyset.ActionLoadMore)}
                </Button>
            )}
            {errorShowMore && (
                <div className={b('error-show-more')}>
                    <div>{i18(BlogKeyset.ErrorTitle)}</div>
                    <div>{i18(BlogKeyset.PostLoadError)}</div>
                </div>
            )}
            {Boolean(currentPage && postCountOnPage) && (
                <div className={b('paginator')}>
                    <Paginator
                        onPageChange={handlePageChange}
                        page={currentPage}
                        totalItems={postCountOnPage}
                        itemsPerPage={perPageInQuery}
                        loading={isFetching}
                        maxPages={Infinity}
                    />
                </div>
            )}
        </div>
    </div>
);
