import { GetStaticProps } from "next"
import { api } from "../services/api"
import { format, parseISO} from 'date-fns'
import ptBr from 'date-fns/locale/pt'
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString"
import Image from 'next/image'
import Link from 'next/link'

import styles from './home.module.scss'
import { useContext } from "react"
import { PlayerContext } from "../contexts/PlayerContext"

type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    publishedAt: string;
    description: string;
}
type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]

}
export default function Home({latestEpisodes, allEpisodes}: HomeProps) {
  const { playList } = useContext(PlayerContext);

  const episodeList = [...latestEpisodes, ...allEpisodes];
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos </h2>
        <ul>
          {latestEpisodes.map((ep, index) => {
            return (
              <li key={ep.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={ep.thumbnail} 
                  alt={ep.title} 
                  objectFit="cover"
                /> 
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${ep.id}`}>
                  <a>{ep.title}</a>
                  </Link>
                  <p>{ep.members}</p>
                  <span>{ep.publishedAt}</span>
                  <span>{ep.durationAsString}</span>

                </div>
                <button type='button' onClick={() => { playList(episodeList, index + latestEpisodes.length) }}>
                  <img src="/play-green.svg" alt="Tocar episódio" width={20} height={20}/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map( ep => {
                return (
                  <tr key={ep.id}>
                    <td style={{ width: 72 }}>
                      <Image 
                        width={120} 
                        height={120}
                        src={ep.thumbnail}
                        alt={ep.title}
                        objectFit="cover"
                        />
                    </td>
                    <td>
                      <Link href={`/episodes/${ep.id}`}>
                          <a href="">{ep.title}</a>
                      </Link>
                    </td>
                    <td>{ep.members}</td>
                    <td style={{ width: 100 }}>{ep.publishedAt}</td>
                    <td>{ep.durationAsString}</td>
                    <td>
                      <button type="button"> 
                        <img src="/play-green.svg" alt="Tocar episódio" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
      </section>
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
      url: ep.file.url,
    }
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);
  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  }
}