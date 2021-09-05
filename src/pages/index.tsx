import { GetStaticProps } from "next"
import { api } from "../services/api"
import { format, parseISO} from 'date-fns'
import ptBr from 'date-fns/locale/pt'
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"

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
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export  const  getStaticProps: GetStaticProps = async () => {
  const { data } = await  api.get('episodes',{
    params: {
      _limit: 12,
      _sort: 'published_at',
      _oder: 'desc'
    }
  })

  const episodes = data.map( ep => {
    return {
      id: ep.id,
      title: ep.title,
      thumbnail: ep.thumbnail,
      members: ep.members,
      publishedAt: format(parseISO(ep.published_at),'d  MMM yy', { locale: ptBr}),
      duration: Number(ep.file.duration),
      durationAsString: convertDurationToTimeString(Number(ep.file.duration)),
      description: ep.description,
      url: ep.file.url,
    }
  })
  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8,
  }
}