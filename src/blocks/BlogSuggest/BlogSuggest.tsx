import React, {useContext} from 'react';
// TODO import sdk from 'sdk';

// import {Lang} from '@yandex-data-ui/cloud-schemas/build/models/common';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SliderBlock} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from 'components/BlogWrapper/BlogWrapper';
// import {BlogPageContext} from 'contexts/BlogPageContext';
// import {UserContext} from 'contexts/UserContext';
import {TranslationContext} from 'contexts/TranslationContext';
// import {PostCard} from 'components/PostCard/PostCard';
// import {BlogPostData} from 'models/blog';
// import {BlogMetrikaGoalIds} from '../constants';

// const metrikaGoals = [
//     {
//         name: BlogMetrikaGoalIds.suggest,
//         isCrossSite: true,
//     },
// ];

type SuggestedPost = {
    title?: string;
    description?: string;
    image?: string;
    text?: string;
};

type SuggestBlockProps = {
    items?: SuggestedPost[];
    post: {
        blogPostId: number;
        likes: number;
        hasUserLike: boolean;
    };
    paddingTop: PaddingSize;
    paddingBottom: PaddingSize;
};

export type SuggestBlockFullProps = SuggestBlockProps & ClassNameProps;

export const BlogSuggestBlock: React.FC<SuggestBlockFullProps> = ({
    paddingTop = 'l',
    paddingBottom = 'l',
}) => {
    // TODO refactor in https://st.yandex-team.ru/ORION-1443
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    // const [suggestedPosts, setSuggestedPosts] = useState<BlogPostData[]>([]);
    // const pageContext = useContext(BlogPageContext);
    const {i18n} = useContext(TranslationContext);
    // const userContext = useContext(UserContext);

    // const blogPostId = pageContext.post?.id;

    // useEffect(() => {
    //     async function fetchSuggestedPosts() {
    //         if (blogPostId) {
    //             setError(false);
    //             setLoading(true);

    //             try {
    //                 const posts = await sdk.blog.getSuggestedPosts({
    //                     postId: blogPostId,
    //                     lang: Lang.Ru,
    //                     uid: userContext?.uid,
    //                 });
    //                 setSuggestedPosts(posts as unknown as BlogPostData[]);
    //             } catch (e) {
    //                 setError(true);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //     }

    //     fetchSuggestedPosts();
    // }, [blogPostId, userContext?.uid]);

    // if (loading || error || suggestedPosts.length === 0) {
    //     return null;
    // }

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <SliderBlock
                slidesToShow={{xl: 3, lg: 2, sm: 1}}
                title={{text: i18n('blog', 'title_suggest')}}
            >
                {['todo', 'continue', 'after', 'create', 'mock'].map((item) => (
                    <div key={item}>{item}</div>
                ))}
                {/* {suggestedPosts.map((post) => (
                    <PostCard key={post.id} metrikaGoals={metrikaGoals} post={post} />
                ))} */}
            </SliderBlock>
        </BlogWrapper>
    );
};
