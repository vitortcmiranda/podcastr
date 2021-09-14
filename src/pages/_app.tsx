import '../styles/global.scss';

import { Header } from "../components/Header";
import Player from "../components/Player";
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContext.Provider value={'Vitor'}>
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
