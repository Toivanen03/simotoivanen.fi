import { useQuery } from '@apollo/client'
import { BLOGS } from '../../schema/queries'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Spinner from '../middleware/spinner'
import ErrorDiv from '../middleware/errorDiv'

const Blogs = () => {
    const [newest, setNewest] = useState(true)
    const [search, setSearch] = useState('')

    const location = useLocation()

    const { data, loading, error, refetch } = useQuery(BLOGS, {
        onError: (error) => {
            console.error(error)
        },
    })

    useEffect(() => {
        refetch()
    }, [location])

    if (loading) return <Spinner text={"Ladataan blogeja..."} />
    if (error) return <ErrorDiv error={error ? error : "Virhe ladattaessa blogeja."} refetch={refetch} />

    const filteredBlogs = () => {
        const sorted = newest ? data.blogs.slice().reverse() : data.blogs
        return sorted.filter(blog =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
                (blog.subtitle && blog.subtitle.toLowerCase().includes(search.toLowerCase())) ||
                    blog.content.toLowerCase().includes(search.toLowerCase())
        )
    }

    return (
        <div className='blogsBg'>
            <div className='container mt-5'>
                <div className='row mb-5 glow'>
                    <div className='col-4'>
                        <h1 className='text-center fw-bold'>Blogit</h1>
                    </div>
                </div>
                <div className='row mb-5 glow d-flex justify-content-center'>
                    <div className='col-8'>
                        <div className="row mb-4 blogsFilter text-center">
                            <div className="col-md-9 mb-3 mb-md-0">
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Hae blogeista..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => setNewest(!newest)}
                                >
                                {newest ? 'Vanhin ensin' : 'Uusin ensin'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {filteredBlogs().map(blog => (
                    <div className='row mb-4' key={blog.id}>
                        <div className='col-2 d-none d-md-block'></div>
                            <div className='col-12 col-md-8'>
                                <div className='card shadow-sm h-100 glow'>
                                    <div className='card-body blogsCard'>
                                            <h3 className='card-title'>{blog.title}</h3>
                                        {blog.subtitle && (
                                        <h5 className='card-subtitle mb-2 text-muted'>{blog.subtitle}</h5>
                                        )}
                                        <p>
                                        {blog.content.length > 200 
                                            ? `${blog.content.slice(0, 200)}...` 
                                            : blog.content}
                                        </p>
                                        <div className='row'>
                                            <div className='col-8 d-flex align-items-end'>
                                                <small className='text-muted'>
                                                    Julkaistu: {new Date(Number(blog.createdAt)).toLocaleDateString('fi-FI')}
                                                </small>
                                            </div>
                                            <div className='col-3 d-flex justify-content-end'>
                                                <Link to={`/blog/${blog.id}`}>
                                                    <button type='button' className='btn btn-primary'>Lue</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className='col-2 d-none d-md-block'></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs
