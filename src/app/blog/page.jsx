import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

// with api
// const getData = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store", next:{revalidate:3600}});

//     if (!res.ok) {
//         throw new Error("Something went wrong");
//     }

//     return res.json();
// };

export const metadata = {
    title: "Blog",
  };

const BlogPage = async () => {
    // with api
    // const posts = await getData();

    // without api
    const posts = await getPosts();

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
            {/* <div className={styles.post}>
                <PostCard />
            </div>
            <div className={styles.post}>
                <PostCard />
            </div>
            <div className={styles.post}>
                <PostCard />
            </div> */}
        </div>
    );
};

export default BlogPage;
