import Link from 'next/link';

const Header = () => {
  return (
    <section>
      <header className='flex flex-row items-center justify-center'>
        <h1>
            <span>Marta e Alessio sposi</span>
        </h1>
        <nav className='main-nav text-right basis-3/4'>
          <ul>
            <li>
              <Link
              href="/"
              title="home">
              Home
              </Link>
            </li>
            <li>
              <Link
                href="/informazioni"
                title="informazioni"
              >
                Informazioni
              </Link>
            </li>
            <li>
              <Link
                href="/conferma-partecipazione"
                title="conferma la tua partecipazione"
              >
                Conferma la tua partecipazione
              </Link>
          </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;