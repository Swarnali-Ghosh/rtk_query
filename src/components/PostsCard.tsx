const PostsCard = ({ post }: any) => {

    return (
        <>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <p>{post?.id}</p>
        </>
    )
}

export default PostsCard;