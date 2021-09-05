import { GetStaticProps } from "next"
import { type } from "os"

type Episode = {
    id: string;
    title: string;
    members: string;
}
type HomeProps = {
  episodes: Episode[]
}
export default function Home(props: HomeProps) {
  return (
    <h1>Index</h1>
  )
}

export  const  getStaticProps: GetStaticProps = async () => {
  const response = await  fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8,
  }
}