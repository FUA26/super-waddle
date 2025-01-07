import Mdx from '@/components/mdx/mdx-components';
import { allPosts } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { getMDXComponent } from 'next-contentlayer2/hooks';

interface PostPageProps {
  params: {
    slug: string;
  };
}
export default async function PostPage({ params }: PostPageProps) {
  // console.log(params)
  const param = await params
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${param.slug}`);

  if (!post?.body.code) {
    return <div>No post here!</div>;
  }

  return (
    <article className='py-8 mx-auto max-w-xl'>
      <div className='mb-8 text-center'>
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Mdx code={post.body.code} />
      {/* <div
        className='text-sm [&>*]:mb-3 [&>*:last-child]:mb-0'
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      /> */}
    </article>
  );
}
