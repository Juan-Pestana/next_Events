import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout'
import {API_URL}  from '@/config/index'
import EventItem from '@/components/EventItem'

const PER_PAGE= 2

export default function EventsIndexPage({events, page, total}) {

    
 
  return (
    <Layout >
      
      <h1>Eventos</h1>
      {events.length === 0 && <h3>No hay eventos</h3>}

      {events.map(evt => <EventItem key={evt.id} evt={evt}/>)}

      <Pagination page={page} total={total} perPage={PER_PAGE}/>
      
    </Layout>
  )
}


export async function getServerSideProps({query: {page = 1}}) {


  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

 //traerse el número total de eventos en strapi (count)
  const eventCountRes = await fetch(`${API_URL}/events/count`)
  const total = await eventCountRes.json()


//traerse los eventos correspondientes para esa página
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()


  


  return {
    props:  {events, page: +page, total}
  
  }
}
