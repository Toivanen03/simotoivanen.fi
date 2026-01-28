import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { GET_BLOG } from '../../schema/queries'
import { FaWhatsapp, FaLinkedin, FaFacebook } from 'react-icons/fa'
import useWindowWidth from '../middleware/useWindowWidth'
import Spinner from '../middleware/spinner'
import ErrorDiv from '../middleware/errorDiv'

const ShareButtons = ({ id, title, iconSize }) => {
  const blogUrl = `https://simotoivanen.fi/blog/${id}`
  const encodedUrl = encodeURIComponent(blogUrl)
  const encodedTitle = encodeURIComponent(title)

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const linkedinShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
  const whatsAppShare = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`

  const fb = (<FaFacebook color='#0866FF' size={iconSize}/>)
  const lin = (<FaLinkedin color='#0A66C2' size={iconSize} />)
  const wa = (<FaWhatsapp color='#25D366' size={iconSize} />)

  return (
    <>
      <a
        href={facebookShare}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        aria-label="Jaa Facebookissa"
      >
        {fb}
      </a>

      <a
        href={linkedinShare}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        aria-label="Jaa LinkedInissä"
      >
        {lin}
      </a>

      <a
        href={whatsAppShare}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        aria-label="Jaa WhatsAppissa"
      >
        {wa}
      </a>
    </>
  )
}

const Blog = () => {
  const width = useWindowWidth()
  const iconSize = width < 768 ? '1.2em' : width < 992 ? '1.8em' : '3em'

  const { id } = useParams()
  const { data, loading, error, refetch } = useQuery(GET_BLOG, {
    variables: { id }
  })

  if (loading) return <Spinner text={"Ladataan..."} />
  if (error) return <ErrorDiv error={error} refetch={refetch} />

  const blog = data?.getBlog

  const handleContent = (content) => {
    let processed = content.replace(
      /(https?:\/\/[^\s]+)/g,
      url => {
        const cleanUrl = url.replace(/[.,;!?]+$/, '')
        const punctuation = url.slice(cleanUrl.length)
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${punctuation}`
      }
    )

    processed = processed.replace(/\n/g, '<br>')

    return <p className='card-text' dangerouslySetInnerHTML={{ __html: processed }} />
  }

  return (
    <div className='blogsBg'>
      <div className='container mt-4 text-center blog glow'>
        <h1>{blog?.title && blog.title}</h1>

        {blog?.subtitle && <h3 className='text-muted mt-4'>{blog.subtitle}</h3>}<br />
        <div className='d-flex justify-content-center'>
          {blog?.content && handleContent(blog.content)}
        </div><br />
        <small className='text-muted'>
          {blog?.createdAt && <span>Julkaistu: {new Date(Number(blog.createdAt)).toLocaleDateString('fi-FI')}</span>}
        </small>
        <div className="col justify-content-center gap-4 mt-4" style={{ marginLeft: '-20px' }}>
          <span style={{marginRight: '20px', fontWeight: 'bold'}}>Jaa:</span>
          { blog && <ShareButtons id={id} title={blog.title} iconSize={iconSize} />}
        </div>
      </div>
    </div>
  )
}

export default Blog