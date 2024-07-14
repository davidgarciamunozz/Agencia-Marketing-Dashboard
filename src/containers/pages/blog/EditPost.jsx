import BlogList from "components/blog/BlogList";
import Layout from "hocs/layout/Layout";
import { useEffect, useRef, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { get_author_blog_list, get_author_blog_list_page, get_blog } from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";
import { PaperClipIcon} from '@heroicons/react/20/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import DOMPurify from 'dompurify'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


function EditPost ({
    post,
    get_blog,
    isAuthenticated,
    get_categories,
    categories
}) {

    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const params = useParams()
    const slug = params.slug

    useEffect(()=>{
        window.scrollTo(0,0)
        get_blog(slug)
        categories ? <></> : get_categories()
    },[slug])

    //Crear una funcion para que al hacer click en uno de los botones de update, se imprima en consola un mensaje
    const [updateTitle, setUpdateTitle] = useState(false)
    const [updateSlug, setUpdateSlug]=useState(false)
    const [updateDescription, setUpdateDescription]=useState(false)
    const [UpdateContent, setUpdateContent]=useState(false)
    const [updateCategory, setUpdateCategory]=useState(false)
    const [updateThumbnail, setUpdateThumbnail]=useState(false)
    const [updateTime, setUpdateTime]=useState('')

    const [formData, setFormData] = useState({
        title:'',
        new_slug:'',
        description:'',
        content:'',
        category:'',
        time_read:''
    })

    const {
        title,
        new_slug,
        description,
        content,
        category,
        time_read
    } = formData

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                new_slug: post.slug,
                description: post.description,
                content: post.content,
                time_read: post.time_read
            });
        }
    }, [post]);

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const [loading, setLoading] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef(null);
    const [previewImage, setPreviewImage] = useState();
    const [thumbnail, setThumbnail] = useState(null);
    

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    useEffect(() => {
        if (contentRef.current && post && post.content) {
            if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        }
    }, [post]);

    const navigate = useNavigate()

    const fileSelectedHandler = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setPreviewImage(reader.result)
    };
        setThumbnail(file)
    }

    const resetStates = () => {
        setUpdateTitle(false)
        setUpdateSlug(false)
        setUpdateDescription(false)
        setUpdateContent(false)
        setUpdateCategory(false)
        setUpdateThumbnail(false)
        setUpdateTime(false)
    };


    const onSubmit = (e) => {
        e.preventDefault()
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('new_slug', new_slug)
        formData.append('description', description)
        formData.append('content', content)
        formData.append('category', category)
        formData.append('time_read', time_read)
        if (thumbnail){
            formData.append('thumbnail', thumbnail, thumbnail.name)
        } else {
            formData.append('thumbnail', '')
        }

        const fetchData = async () => {
        setLoading(true)
        
            try{
                
                const res = await axios.put (`${process.env.REACT_APP_API_URL}/api/blog/edit`, formData, config)
                if(res.status === 200){
                    if(new_slug!==''){
                        navigate(`/blog/${new_slug}`)
                    } else {
                        get_blog(slug)
                    }
                    setFormData({
                        title:'',
                        new_slug:'',
                        description:'',
                        content:'',
                        time_read:''
                    })
                    get_blog(slug)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                        setPreviewImage(null)
                    }
                } else {
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                    }

                }

            } catch (err) {
                setLoading(false)
                resetStates()
                if (thumbnail){
                    setThumbnail(null)
                }
                alert('error')
            }
        }
    fetchData()
    }

    const onSubmitDraft = (e) => {
        e.preventDefault()
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('slug', slug)


        const fetchData = async () => {
        setLoading(true)
        
            try{
                
                const res = await axios.put (`${process.env.REACT_APP_API_URL}/api/blog/draft`, formData, config)
                
                if(res.status === 200){
                    setOpen(false)
                    if(new_slug!==''){
                        navigate(`/blog/${new_slug}`)
                    } else {
                        get_blog(slug)
                    }
                    setFormData({
                        title:'',
                        new_slug:'',
                        description:'',
                        content:''
                    })
                    get_blog(slug)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                        setPreviewImage(null)
                    }
                } else {
                    setOpen(false)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                    }

                }

            } catch (err) {
                setOpen(false)
                setLoading(false)
                resetStates()
                if (thumbnail){
                    setThumbnail(null)
                }
                alert('error')
            }
        }
    fetchData()
    }

    const onSubmitPublish = (e) => {
        e.preventDefault()
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('slug', slug)

        
        const fetchData = async () => {
        setLoading(true)
        
            try{
                
                const res = await axios.put (`${process.env.REACT_APP_API_URL}/api/blog/publish`, formData, config)
                
                if(res.status === 200){
                    setOpen(false)
                    if(new_slug!==''){
                        navigate(`/blog/${new_slug}`)
                    } else {
                        get_blog(slug)
                    }
                    setFormData({
                        title:'',
                        new_slug:'',
                        description:'',
                        content:''
                    })
                    get_blog(slug)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                        setPreviewImage(null)
                    }
                } else {
                    setOpen(false)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                    }

                }

            } catch (err) {
                setOpen(false)
                setLoading(false)
                resetStates()
                if (thumbnail){
                    setThumbnail(null)
                }
                alert('error')
            }
        }
    fetchData()
    }

    const onSubmitDelete = (e) => {
        e.preventDefault()
        
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const formData = new FormData()
        formData.append('slug', slug)

        
        const fetchData = async () => {
        setLoading(true)
        
            try{
                
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/blog/delete/${slug}`, formData, config)
                
                if(res.status === 200){
                   navigate(-1)
                } else {
                    setOpenDelete(false)
                    setLoading(false)
                    resetStates()
                    if (thumbnail){
                        setThumbnail(null)
                    }

                }

            } catch (err) {
                setOpenDelete(false)
                setLoading(false)
                resetStates()
                if (thumbnail){
                    setThumbnail(null)
                }
                alert('error')
            }
        }
    fetchData()
    }

    if (isAuthenticated===false){
        return <Navigate to="/" />
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
            post && isAuthenticated ? 
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
                        onClick={e=>setOpenDelete(true)}
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                        Delete post
                    </button>
                    <a
                        href={`${process.env.REACT_APP_URL}/blog/${post.slug}`}
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        View post
                    </a>
                    <button
                        onClick={e=>setOpen(true)}
                        className="relative mx-1 inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {
                            post.get_status === 'published'?
                            <> Draft </> :  <> Publish </>
                        }
                    </button>
                    </div>
                </div>
            </div>
            

            
            <div className="mt-5 border-t border-gray-200 px-5">
            <dl className="divide-y divide-gray-200">


            {/* Cambiar el titulo del post */}    
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 flex justify-center items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {
                        updateTitle ?
                        <>
                        <form onSubmit={e =>onSubmit(e)} className="flex w-full items-center">
                        <span className="flex-grow">
                                <input 
                                value={formData.title}
                                onChange={e => onChange(e)}
                                name="title" 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md" 
                                required
                                />
                        </span>

                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="submit"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Save
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <div
                                type="submit"
                                onClick={()=>setUpdateTitle(false)}
                                className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Cancel
                                </div>
                        </div>

                        </form>
                        </>
                        :
                        <>
                        <span className="flex-grow">{post.title}</span>
                        <span className="ml-4 flex-shrink-0">
                            <div
                            onClick={()=>setUpdateTitle(true)}
                            className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                            >
                            Update
                            </div>
                        </span>
                        </>
                    }
                </dd>
            </div>

            {/* Cambiar el slug del post */}            
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Slug</dt>
                <dd className="mt-1 flex justify-center items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {
                        updateSlug ?
                        <>
                        <form onSubmit={e=>onSubmit(e)} className="flex w-full items-center">
                        <span className="flex-grow">
                                <input 
                                value={formData.new_slug} 
                                onChange={e => onChange(e)}
                                name="new_slug" 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md" 
                                required
                                />
                        </span>

                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="submit"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Save
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <div
                                type="submit"
                                onClick={()=>setUpdateSlug(false)}
                                className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Cancel
                                </div>
                        </div>

                        </form>
                        </>
                        :
                        <>
                        <span className="flex-grow">{post.slug}</span>
                        <span className="ml-4 flex-shrink-0">
                            <div
                            onClick={()=>setUpdateSlug(true)}
                            className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                            >
                            Update
                            </div>
                        </span>
                        </>
                    }
                </dd>
            </div>

             {/* Cambiar la imagen del post */}
             <div className="py-4 sm:flex-col sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
                <dd className="mt-1 flex justify-center items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {
                        updateThumbnail ?
                        <>
                        <form onSubmit={e =>onSubmit(e)} className="flex w-full items-center">
                        <span className="flex-grow">
                                <input 
                                type="file" 
                                name="thumbnail"
                                onChange={e=>fileSelectedHandler(e)}
                                className="py-2 px-3 w-3/4 border border-gray-300 rounded-md" 
                                required
                                />
                                {
                                    previewImage && 
                                    <img src={previewImage} alt="thumbnail" className="w-96 h-56 object-cover my-4 rounded-sm" />
                                }
                        </span>

                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="submit"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Save
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <div
                                type="submit"
                                onClick={()=>{
                                    setUpdateThumbnail(false);
                                    setPreviewImage(null)
                                }}
                                    
                                className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Cancel
                                </div>
                        </div>

                        </form>
                        </>
                        :
                        <>
                        <span className="flex-grow">
                        
                                <input className="py-2 px-3 w-3/4 text-gray-500 border border-gray-300 rounded-md"
                                value={post.thumbnail}
                                readOnly
                                disabled
                                />
                              
                                
                        </span>
                        <span className="ml-4 flex-shrink-0">
                            <div
                            onClick={()=>setUpdateThumbnail(true)}
                            className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                            >
                            Update
                            </div>
                        </span>
                        </>
                    }
                </dd>
            </div>

            {/* Cambiar la descripcion del post */}
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {
                      updateDescription ?
                      <>
                      <form onSubmit={e=>onSubmit(e)} className="flex w-full items-center">
                      <span className="flex-grow">
                              <textarea 
                              rows={3}
                              value={formData.description} 
                              onChange={e => onChange(e)}
                              name="description" 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md" 
                              required
                              />
                      </span>

                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                              <button
                              type="submit"
                              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Save
                              </button>
                              <span className="text-gray-300" aria-hidden="true">
                              |
                              </span>
                              <div
                              type="submit"
                              onClick={()=>setUpdateDescription(false)}
                              className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Cancel
                              </div>
                      </div>

                      </form>
                      </>
                      :
                      <>
                      <span className="flex-grow">{post.description}</span>
                      <span className="ml-4 flex-shrink-0">
                          <div
                          onClick={()=>setUpdateDescription(true)}
                          className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                          >
                          Update
                          </div>
                      </span>
                      </>
                }
                </dd>
            </div>

            {/* Cambiar el contenido del post */}    
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Content</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {
                      UpdateContent ?
                      <>
                      <form onSubmit={e=>onSubmit(e)} className="flex w-full items-center">
                      <span className="flex-grow">
                              <CKEditor
                                editor={ClassicEditor}
                                data={formData.content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormData({...formData, content:data})
                                }}
                              />  
                      </span>

                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                              <button
                              type="submit"
                              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Save
                              </button>
                              <span className="text-gray-300" aria-hidden="true">
                              |
                              </span>
                              <div
                              type="submit"
                              onClick={()=>setUpdateContent(false)}
                              className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Cancel
                              </div>
                      </div>

                      </form>
                      </>
                      :
                      <>
                      
                      <div className="flex flex-col flex-grow">
                            {
                                post.content ? 
                                <>
                                <div ref={contentRef} className={`overflow-y-auto ${showFullContent ? 'max-h-none' : 'max-h-56'}`}>
                                    <span className="text-justify prose-base text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                                </div>
                                {showButton && (
                                    <button className=" text-left mt-2 text-blue-500" onClick={toggleContent}>
                                        {showFullContent ? 'Show less' : 'Show more'}
                                    </button>
                                 )}
                                </>
                                :
                                <p className="animate-pulse py-2 bg-gray-100 "></p>
                            }


                        </div>
                
                      <span className="ml-4 flex-shrink-0">
                          <div
                          onClick={()=>setUpdateContent(true)}
                          className="cursor-pointer ml-6 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                          >
                          Update
                          </div>
                      </span>
                      </>
                }
                </dd>
            </div>

            {/* Cambiar la categoria del post */}
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {
                      updateCategory ?
                      <>
                      <form onSubmit={e=>onSubmit(e)} className="flex w-full items-center">
                      <span className="flex-grow">
                      {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map(category=>{
                                            if(category.sub_categories.length === 0){
                                                return(
                                                    <div key={category.id} className='flex items-center h-5'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id.toString()}
                                                        name='category'
                                                        type='radio'
                                                        required
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-3 text-sm  text-gray-900 ">
                                                        {category.name}
                                                    </label>
                                                    </div>
                                                )
                                            }else{

                                                let result = []
                                                result.push(
                                                    <div key={category.id} className='flex items-center h-5 mt-2'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id.toString()}
                                                        name='category'
                                                        type='radio'
                                                        required
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-3 text-sm  text-gray-900 font-semibold ">
                                                        {category.name}
                                                    </label>
                                                    </div>
                                                )

                                                category.sub_categories.map(sub_category=>{
                                                    result.push(
                                                        <div key={sub_category.id} className='flex items-center h-5 ml-2 mt-1'>
                                                        <input
                                                            onChange={e => onChange(e)}
                                                            value={sub_category.id.toString()}
                                                            name='category'
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 text-sm text-gray-900 ">
                                                            {sub_category.name}
                                                        </label>
                                                        </div>
                                                    )
                                                })
                                                return result
                                            }

                                        })
                                    }
                      </span>

                      <div className="ml-4 flex flex-shrink-0 space-x-4">
                              <button
                              type="submit"
                              className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Save
                              </button>
                              <span className="text-gray-300" aria-hidden="true">
                              |
                              </span>
                              <div
                              type="submit"
                              onClick={()=>setUpdateCategory(false)}
                              className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                              >
                              Cancel
                              </div>
                      </div>

                      </form>
                      </>
                      :
                      <>
                      <span className="flex-grow">
                        {
                            post.category ? 
                            post.category.name
                            :
                            <p className="animate-pulse py-2 bg-gray-100"></p>
                        }
                        </span>
                      <span className="ml-4 flex-shrink-0">
                          <div
                          onClick={()=>setUpdateCategory(true)}
                          className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                          >
                          Update
                          </div>
                      </span>
                      </>
                }
                </dd>
            </div>

            {/* Cambiar el tiempo de lectura del post */}  
             <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">Time read</dt>
                <dd className="mt-1 flex justify-center items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {
                        updateTime ?
                        <>
                        <form onSubmit={e =>onSubmit(e)} className="flex w-full items-center">
                        <span className="flex-grow">
                                <input 
                                value={formData.time_read}
                                onChange={e => onChange(e)}
                                name="time_read" 
                                type="number" 
                                className="w-full border border-gray-300 rounded-md" 
                                required
                                />
                        </span>

                        <div className="ml-4 flex flex-shrink-0 space-x-4">
                                <button
                                type="submit"
                                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Save
                                </button>
                                <span className="text-gray-300" aria-hidden="true">
                                |
                                </span>
                                <div
                                type="submit"
                                onClick={()=>setUpdateTime(false)}
                                className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                                >
                                Cancel
                                </div>
                        </div>

                        </form>
                        </>
                        :
                        <>
                        <span className="flex-grow">{`${post.time_read} min`}</span>
                        <span className="ml-4 flex-shrink-0">
                            <div
                            onClick={()=>setUpdateTime(true)}
                            className="cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 "
                            >
                            Update
                            </div>
                        </span>
                        </>
                    }
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

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                {
                                 post.title && post.description && post.slug&& post.content ?
                                 <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                 :
                                 <XMarkIcon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                                }
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                {
                                    post.get_status === 'published' ?
                                    <>
                                    <span>Draft this post?</span>
                                    </>
                                    :
                                    <>
                                    <span>Publish this post?</span>
                                    </>
                                }
                                </Dialog.Title>
                                <div className="mt-2">
                                {
                                    post.title && post.description && post.slug&& post.content ?
                                    <></>
                                    :
                                    <p className="text-sm text-gray-500">
                                        To publish this post you must add: Title, Description, Slug and Content
                                    </p>
                                    
                                }
                                </div>
                            </div>
                            </div>
                            {
                                 (post.title && post.description && post.slug&& post.content) &&
                                 <>
                                 
                                     {
                                         post.get_status === 'published' ?
                                         <>
                                          <form onSubmit={e=>onSubmitDraft(e)} className="mt-5 sm:mt-6">
                                                 <button
                                                     type="submit"
                                                     className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                     
                                                 >
                                                         <span>Draft</span>
                                                 </button>
                                         </form>
                                         </>
                                        
                                         :
                                         <form onSubmit={e=>onSubmitPublish(e)} className="mt-5 sm:mt-6">
                                                 <button
                                                     type="submit"
                                                     className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                                     
                                                 >
                                                         <span>Publish</span>
                                                 </button>
                                         </form>
                                     }
                                 </>
                            }
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={openDelete} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpenDelete}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                <span>Delete Post</span>
                                </Dialog.Title>
                                <div className="mt-2">
                                
                                    <p className="text-sm text-gray-500">
                                        Are you sure you wish to delete this post?
                                    </p>
                                </div>
                            </div>
                            </div>
                            <form onSubmit={e=>onSubmitDelete(e)} className="mt-5 sm:mt-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"
                                        
                                    >
                                            <span>Delete</span>
                                    </button>
                            </form>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
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
    post:state.blog.post,
    isAuthenticated: state.auth.isAuthenticated,
    categories: state.categories.categories
});

export default connect (mapStateToProps,{
    get_blog,
    get_categories
}) (EditPost)