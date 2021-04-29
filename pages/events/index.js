import Link from 'next/link'
import Layout from '@/components/Layout'
import {API_URL}  from '@/config/index'

import EventItem from '@/components/EventItem'

export default function EventsIndexPage({events}) {

    
 
  return (
    <Layout >
      
      <h1>Eventos</h1>
      {events.length === 0 && <h3>No hay eventos</h3>}

      {events.map(evt => <EventItem key={evt.id} evt={evt}/>)}
    </Layout>
  )
}


export async function getStaticProps(){
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await res.json()
  


  return {
    props:  {events}
  
  }
}
