import { useContext } from 'react'
import AuthContext from '@/context/authContext'
import { parseCookie } from '@/helpers/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'

import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'

export default function DashboardPage({ events }) {
  console.log(events)

  const { user } = useContext(AuthContext)

  const deleteEvent = (id) => {
    console.log(id)
  }

  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req)

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
    },
  }
}
