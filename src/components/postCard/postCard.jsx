import styles from './postCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            {post.img && <div className={styles.imgContainer}>
                <Image src={post.img} alt='' fill className={styles.img} />
            </div>}
            <span className={styles.date}>27.03.2024</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.desc}>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quidem iusto cupiditate eveniet ut fuga aliquid eaque sed a eius itaque, atque temporibus expedita tenetur fugiat voluptatibus et? Voluptate, delectus! */}
                {post.body}
            </p>
            <Link className={styles.link} href={`/blog/${post.slug}`}>Read More &gt;&gt;</Link>
        </div>
    </div>
  )
}

export default PostCard