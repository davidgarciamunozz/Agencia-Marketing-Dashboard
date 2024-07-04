import BlogList from "components/blog/BlogList";
import Layout from "hocs/layout/Layout";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { get_author_blog_list, get_author_blog_list_page, get_blog } from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";
import { PaperClipIcon } from '@heroicons/react/20/solid'

function EditPost ({
    get_blog,
    post
}) {

    const params = useParams()
    const slug = params.slug

    useEffect(()=>{
        window.scrollTo(0,0)
        get_blog(slug)
        get_categories()

    },[])

    //Crear una funcion para que al hacer click en uno de los botones de update, se imprima en consola un mensaje
    const [updateTitle, setUpdateTitle] = useState(false)
     
    if (updateTitle) {
        console.log('Update title button clicked')
    }

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
         {
            post ? 
            <>
          
            

            {/* Edit post interface */}
            <div className=" bg-white px-4 py-5 sm:px-6">
                <div className="-ml-5 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">Edit:</h3>
                    <p className="mt-2 text-base text-gray-500">
                       {post.title}
                    </p>
                    </div>
                    
                    <div className="ml-4 mt-4 flex-shrink-0">
                    <button
                        type="button"
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                        Delete post
                    </button>
                    <button
                        type="button"
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        View post
                    </button>
                    <button
                        type="button"
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Publish
                    </button>
                    </div>
                </div>
            </div>
      <div className="mt-5 border-t border-gray-200 px-5">
            <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {
                        updateTitle ?
                        <>
                        <input type="text" className="border border-gray-300 rounded-md" />
                        </>
                        :
                        <>
                        <span className="flex-grow">{post.title}</span>
                        <span className="ml-4 flex-shrink-0">
                            <button
                            type="button"
                            onClick={()=>setUpdateTitle(true)}
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Update
                            </button>
                        </span>
                        </>
                    }
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">Backend Developer</span>
                <span className="ml-4 flex-shrink-0">
                    <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Update
                    </button>
                </span>
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">margotfoster@example.com</span>
                <span className="ml-4 flex-shrink-0">
                    <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Update
                    </button>
                </span>
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">$120,000</span>
                <span className="ml-4 flex-shrink-0">
                    <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Update
                    </button>
                </span>
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                    nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </span>
                <span className="ml-4 flex-shrink-0">
                    <button
                    type="button"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Update
                    </button>
                </span>
                </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                        <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                        |
                        </span>
                        <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        Remove
                        </button>
                    </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                    </div>
                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                        <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                        |
                        </span>
                        <button
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        Remove
                        </button>
                    </div>
                    </li>
                </ul>
                </dd>
            </div>
            </dl>
      </div>
            </>
            :
            <>
            loading
            </>
         }
            

         
        </Layout>
    )
}

const mapStateToProps = state => ({
    post:state.blog.post
});

export default connect (mapStateToProps,{
    get_blog
}) (EditPost);