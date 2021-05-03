
import Link from 'next/link'



export default function Pagination({total, page, perPage}) {

    const lastPage = Math.ceil(total / perPage)

    return (

    <>
        {page > 1 && 
            <Link href={`/events?page=${page - 1}`}>
              <a className='btn-secondary'>Anterior</a>
            </Link>
        }
        {page < lastPage && 
            <Link href={`/events?page=${page + 1}`}>
              <a className='btn-secondary'>Siguiente</a>
            </Link>
        }
    </>
    )
}
