import axios from "axios";
import BlogList from "components/blog/BlogList";
import Layout from "hocs/layout/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { get_author_blog_list, get_author_blog_list_page } from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";

function Blog ({
    get_author_blog_list,
    get_author_blog_list_page,
    posts,
    count,
    next,
    previous,
    get_categories,
    categories
}) {

    useEffect(()=>{
        get_author_blog_list()
        get_categories()

    },[])

    return (
        <Layout>
            <Helmet>
                <title>Admin Blog</title>
                <meta name="description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
                <meta name="keywords" content="marketing, branding, web design, creative agency" />
                <meta name="author" content="Boomslag" />
                <meta name="publisher" content="Boomslag" /> 
                <meta name="robots" content="all" />
                <link rel="canonical" href="https://boomslag.com" />

                {/* Social Media Tags */}
                <meta property="og:title" content="Boomslag | Marketing Agency" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://boomslag.com" />
                <meta property="og:image" content="https://boomslag.com/images/boomslag-logo.png" />
                <meta property="og:description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
                <meta property="og:site_name" content="Boomslag" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@boomslag" />
                <meta name="twitter:title" content="Boomslag | Marketing Agency" />
                <meta name="twitter:description" content="Boomslag is a creative agency that specializes in branding, web design, and marketing." />
                <meta name="twitter:image" content="https://boomslag.com/images/boomslag-logo.png" />
         </Helmet>
            
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">Blog postings</h3>
                    <p className="mt-2 text-base text-gray-500">
                       Create or edit blog posts.
                    </p>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                    <button
                        onClick={()=>{
                            const config = {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': `JWT ${localStorage.getItem('access')}`
                                }
                            };

                            const body = JSON.stringify({

                            });

                            const fetchData = async () => {
                                try {
                                    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/create` ,body,config)

                                    if(res.status === 200){
                                        get_author_blog_list()
                                    }
                                } catch(err){
                                    alert('Error creating new post')
                                }
                            }
                            fetchData()
                        }}
                        className="relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Create new post
                    </button>
                    </div>
                </div>
            </div>

         <BlogList posts={posts&&posts} get_author_blog_list_page={get_author_blog_list_page} count={count&&count} />
        </Layout>
    )
}

const mapStateToProps = state => ({
    posts: state.blog.author_blog_list,
    categories: state.categories.categories,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
});

export default connect (mapStateToProps,{
    get_author_blog_list,
    get_author_blog_list_page,
    get_categories
}) (Blog);