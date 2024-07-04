import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid"
import BlogCardHorizontal from "./BlogCardHorizontal"
import SmallSetPagination from "components/pagination/SmallSetPagination"


function BlogList ({posts, get_blog_list_page, count}) {
    return (
        <div className="overflow-hidden px-8 bg-white">
        <ul role="list" className="divide-y space-y-8 gap-8  divide-gray-100">
        {posts && posts.length > 0 ? (
            posts.map((post, index) => (
                <BlogCardHorizontal key={index} data={post} index={index} />
            ))
            ) : (
            <p>No posts available</p>
            )}
        </ul>
        <SmallSetPagination list_page={get_blog_list_page} list={posts} count={count} />
      </div>
        
    )
}

export default BlogList