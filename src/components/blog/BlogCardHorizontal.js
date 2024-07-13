
import { Link } from "react-router-dom"
import moment from "moment"

function BlogCardHorizontal ({data,index}) {
    
    return (
        <li >
              <Link to={`/blog/${data.slug}`} className="block relative hover:shadow-2xl rounded-lg transition duration-300 ease-in-out">
                <div className="flex items-center my-8">
                  <div className="lg:flex min-w-0 lg:flex-1 items-center box-border">
                    <figure className="lg:flex-shrink-0">
                      {
                        data.thumbnail ? 
                        <img id={index} className="h-56 object-cover w-full lg:w-72 rounded-lg" src={data.thumbnail}alt="" />
                        :
                        <div className="animate-pulse h-56 object-cover w-full lg:w-72 rounded-lg bg-gray-100"></div>

                      }
                    </figure>
                    <div className="min-w-0 flex-1 px-8 mt-4 mb-8 lg:mb-0 lg:mt-0 ">
                      {
                        data.title ?
                        <p id={`title`+data.id} className="text-2xl lg:absolute lg:top-4 pb-2 font-bold text-gray-900 hover:text-orange-600 transition duration-300 ease-in-out">{data.title.length > 131 ? data.title.slice(0,130):data.title }</p>
                        :
                        <p className="animate-pulse lg:w-96 h-5 lg:absolute lg:top-10 py-2 mb-2  bg-gray-100"></p>
                      }
                     {/* contenido del post  */}

                     <div className="lg:absolute lg:top-20"> 
                      {
                        data.status === 'published'?
                        <>
                        <span className=" rounded-full p-1 px-2 bg-green-200 text-green-700  mx-1 font-medium text-sm ">Published</span> <span className="text-gray-300">&middot;</span> 
                        </>
                        :
                        <>
                        <span className=" rounded-full p-1 px-2 bg-rose-200 text-rose-700  mx-1 font-medium text-sm ">Draft</span> <span className="text-gray-300">&middot;</span> 
                        </>
                      }
                      {
                        data.category &&
                        <>
                        <span className="hover:text-orange-600 transition duration-300 ease-in-out font-medium text-gray-500 text-sm "> <Link to={`/category/${data.category.slug}`}>{data.category.name}</Link></span> &middot;
                        </>
                      }
                        <span className="  font-medium text-gray-500 text-sm mx-2">{moment(data.published).format('LL')}</span> &middot;
                        <span className="  font-medium text-gray-500 text-sm mx-2">{`${data.time_read} min read`}</span>
                        {
                          data.description ?
                          <p className="text-base mt-4 text-gray-600 leading-6 ">{data.description}</p>
                          :
                          <>
                          <p className="animate-pulse py-2 bg-gray-100 mt-8"></p>
                          <p className="animate-pulse py-2 bg-gray-100 mt-1"></p>
                          <p className="animate-pulse py-2 bg-gray-100 mt-1"></p>
                          </>
                        }
                        
                     </div>
                    </div>
                  </div>
                 
                </div>
              </Link>
            </li>
    )
}

export default BlogCardHorizontal