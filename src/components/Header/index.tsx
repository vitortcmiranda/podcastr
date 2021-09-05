import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR'
import Image from 'next/image'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    return (
        <header className={styles.headerContainer}>
            <Image src="/logo.svg" alt="Podcastr" className=""  width={163} height={40} />
            <p className="">O melhor para você ouvir, sempre</p>
            <span className="">{currentDate}</span>
        </header>
    );
}