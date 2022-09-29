import React, {useMemo} from 'react';
import block from 'bem-cn-lite';

import {Author, AuthorType} from '@yandex-data-ui/page-constructor';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {useBlogPageContext} from '../../hooks/contexts/useBlogPageContext';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';
// TODO import ResizedImage from '../../components/ResizedImage/ResizedImage';

import './BlogAuthor.scss';

const b = block('BlogAuthorBlock');

export type AuthorBlockFullProps = ClassNameProps & {
    paddingTop: PaddingSize;
    paddingBottom: PaddingSize;
    authorId: number;
    image: string;
};

// TODO: should we use an Author component from the page-constructor https://st.yandex-team.ru/CLOUDFRONT-8880#6267038c1864952e2194b016
export const BlogAuthorBlock: React.FC<AuthorBlockFullProps> = (props) => {
    const {image, paddingTop, paddingBottom, authorId} = props;

    const {post} = useBlogPageContext();

    const author = post?.authors?.find(({id}: {id: number}) => id === authorId);

    const authorItem = useMemo(() => {
        const imageUrl = author?.avatar ?? image;
        // TODO const authorAvatar = imageUrl && <ResizedImage url={imageUrl} />;
        const authorAvatar = <img src={imageUrl} alt="author" />;

        return {
            firstName: author?.firstName || '',
            secondName: author?.secondName || '',
            description: author?.fullDescription || '',
            avatar: authorAvatar,
        };
    }, [author?.avatar, author?.firstName, author?.fullDescription, author?.secondName, image]);

    if (!authorItem?.firstName || !authorItem?.secondName) {
        return null;
    }

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('content')}>
            <div className={b('author-layout')} data-qa="blog-author-layout">
                <Author
                    type={AuthorType.Column}
                    author={authorItem}
                    authorContainerClassName={b('author-container')}
                />
            </div>
        </BlogWrapper>
    );
};
