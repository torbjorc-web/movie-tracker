import { useEffect, useState } from 'react'
import './App.css'

const seasons = {
  halloween: {
    label: 'Halloween',
    eyebrow: 'The nights are getting longer',
    note: 'A little darkness looks good on you.',
    symbol: '31',
  },
  christmas: {
    label: 'Christmas',
    eyebrow: 'The most wonderful double feature',
    note: 'Get cozy. The credits can wait.',
    symbol: '25',
  },
  valentines: {
    label: "Valentine's Day",
    eyebrow: 'For the hopeless romantics',
    note: 'Love is in the air. So is the popcorn.',
    symbol: '14',
  },
  spring: {
    label: 'Spring',
    eyebrow: 'A fresh season of stories',
    note: 'New beginnings, unexpected turns.',
    symbol: '01',
  },
  summer: {
    label: 'Summer',
    eyebrow: 'Long days, late-night movies',
    note: 'Bring the big-screen feeling home.',
    symbol: '08',
  },
  autumn: {
    label: 'Autumn',
    eyebrow: 'A season for staying in',
    note: 'Golden-hour films and one more cup of tea.',
    symbol: '11',
  },
}

const regions = [
  { code: 'US', label: 'United States', locationKey: 'US' },
  { code: 'NO', label: 'Norway', locationKey: 'Norway' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'CA', label: 'Canada' },
  { code: 'AU', label: 'Australia' },
  { code: 'SE', label: 'Sweden' },
  { code: 'DK', label: 'Denmark' },
  { code: 'FI', label: 'Finland' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'ES', label: 'Spain' },
  { code: 'IT', label: 'Italy' },
  { code: 'NZ', label: 'New Zealand' },
]

const regionLabels = Object.fromEntries(regions.map((region) => [region.code, region.label]))
const regionLocationKeys = Object.fromEntries(
  regions.filter((region) => region.locationKey).map((region) => [region.code, region.locationKey]),
)

const movies = [
  {
    title: 'Halloween',
    year: 1978,
    genre: 'Horror',
    subgenre: 'Slasher',
    seasons: ['halloween'],
    locations: { US: ['Peacock', 'Amazon Prime Video'], Norway: ['Viaplay', 'Apple TV'] },
  },
  {
    title: 'The Conjuring',
    year: 2013,
    genre: 'Horror',
    subgenre: 'Paranormal',
    seasons: ['halloween'],
    locations: { US: ['Max', 'Netflix'], Norway: ['Max', 'Netflix'] },
  },
  {
    title: 'Hereditary',
    year: 2018,
    genre: 'Horror',
    subgenre: 'Psychological',
    seasons: ['halloween', 'autumn'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['SF Anytime', 'Apple TV'] },
  },
  {
    title: 'A Nightmare on Elm Street',
    year: 1984,
    genre: 'Horror',
    subgenre: 'Supernatural',
    seasons: ['halloween'],
    locations: { US: ['Max'], Norway: ['Max'] },
  },
  {
    title: 'The Exorcist',
    year: 1973,
    genre: 'Horror',
    subgenre: 'Supernatural',
    seasons: ['halloween'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Google TV', 'Apple TV'] },
  },
  {
    title: 'Scream',
    year: 1996,
    genre: 'Horror',
    subgenre: 'Slasher',
    seasons: ['halloween'],
    locations: { US: ['Paramount+', 'Amazon Prime Video'], Norway: ['SkyShowtime', 'Apple TV'] },
  },
  {
    title: 'The Shining',
    year: 1980,
    genre: 'Horror',
    subgenre: 'Psychological',
    seasons: ['halloween', 'autumn'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Max', 'Apple TV'] },
  },
  {
    title: 'The Babadook',
    year: 2014,
    genre: 'Horror',
    subgenre: 'Psychological',
    seasons: ['halloween', 'autumn'],
    locations: { US: ['Shudder', 'Amazon Prime Video'], Norway: ['SF Anytime', 'Apple TV'] },
  },
  {
    title: 'The Ring',
    year: 2002,
    genre: 'Horror',
    subgenre: 'Supernatural',
    seasons: ['halloween'],
    locations: { US: ['Paramount+', 'Amazon Prime Video'], Norway: ['Viaplay', 'Apple TV'] },
  },
  {
    title: 'Coraline',
    year: 2009,
    genre: 'Fantasy',
    subgenre: 'Stop-motion fantasy',
    seasons: ['halloween', 'autumn'],
    locations: { US: ['Amazon Prime Video'], Norway: ['Apple TV'] },
  },
  {
    title: 'The Nightmare Before Christmas',
    year: 1993,
    genre: 'Fantasy',
    subgenre: 'Stop-motion musical',
    seasons: ['halloween', 'christmas'],
  },
  {
    title: 'Edward Scissorhands',
    year: 1990,
    genre: 'Fantasy',
    subgenre: 'Gothic romance',
    seasons: ['halloween', 'autumn'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'Home Alone',
    year: 1990,
    genre: 'Comedy',
    subgenre: 'Holiday',
    seasons: ['christmas'],
  },
  {
    title: 'Elf',
    year: 2003,
    genre: 'Comedy',
    subgenre: 'Holiday',
    seasons: ['christmas'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['SkyShowtime', 'Apple TV'] },
  },
  {
    title: 'The Santa Clause',
    year: 1994,
    genre: 'Comedy',
    subgenre: 'Holiday',
    seasons: ['christmas'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: "It's a Wonderful Life",
    year: 1946,
    genre: 'Drama',
    subgenre: 'Holiday classic',
    seasons: ['christmas'],
    locations: { US: ['Amazon Prime Video'], Norway: ['Apple TV'] },
  },
  {
    title: 'The Polar Express',
    year: 2004,
    genre: 'Fantasy',
    subgenre: 'Holiday adventure',
    seasons: ['christmas'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Max', 'Apple TV'] },
  },
  {
    title: 'Carol',
    year: 2015,
    genre: 'Romance',
    subgenre: 'Period romance',
    seasons: ['christmas', 'valentines'],
    locations: { US: ['Paramount+', 'Amazon Prime Video'], Norway: ['SF Anytime', 'Apple TV'] },
  },
  {
    title: 'The Holiday',
    year: 2006,
    genre: 'Romance',
    subgenre: 'Romantic comedy',
    seasons: ['christmas', 'valentines'],
  },
  {
    title: 'When Harry Met Sally...',
    year: 1989,
    genre: 'Romance',
    subgenre: 'Romantic comedy',
    seasons: ['valentines', 'autumn'],
    locations: { US: ['Amazon Prime Video'], Norway: ['Apple TV'] },
  },
  {
    title: 'Before Sunrise',
    year: 1995,
    genre: 'Romance',
    subgenre: 'Romantic drama',
    seasons: ['valentines', 'summer'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Viaplay', 'Apple TV'] },
  },
  {
    title: 'The Princess Bride',
    year: 1987,
    genre: 'Fantasy',
    subgenre: 'Romantic adventure',
    seasons: ['valentines', 'spring'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'Little Women',
    year: 2019,
    genre: 'Drama',
    subgenre: 'Period drama',
    seasons: ['spring', 'christmas'],
  },
  {
    title: 'Pride & Prejudice',
    year: 2005,
    genre: 'Romance',
    subgenre: 'Period romance',
    seasons: ['spring', 'autumn'],
    locations: { US: ['Peacock', 'Amazon Prime Video'], Norway: ['Viaplay', 'Apple TV'] },
  },
  {
    title: 'The Secret Garden',
    year: 1993,
    genre: 'Drama',
    subgenre: 'Coming-of-age',
    seasons: ['spring'],
    locations: { US: ['Amazon Prime Video'], Norway: ['Apple TV'] },
  },
  {
    title: 'Fantastic Mr. Fox',
    year: 2009,
    genre: 'Comedy',
    subgenre: 'Stop-motion comedy',
    seasons: ['spring', 'autumn'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'The Parent Trap',
    year: 1998,
    genre: 'Comedy',
    subgenre: 'Family',
    seasons: ['spring', 'summer'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'Jaws',
    year: 1975,
    genre: 'Thriller',
    subgenre: 'Survival',
    seasons: ['summer'],
  },
  {
    title: 'The Talented Mr. Ripley',
    year: 1999,
    genre: 'Thriller',
    subgenre: 'Psychological',
    seasons: ['summer'],
    locations: { US: ['Paramount+', 'Amazon Prime Video'], Norway: ['SkyShowtime', 'Apple TV'] },
  },
  {
    title: 'Call Me by Your Name',
    year: 2017,
    genre: 'Romance',
    subgenre: 'Coming-of-age',
    seasons: ['summer'],
    locations: { US: ['Netflix', 'Amazon Prime Video'], Norway: ['Netflix', 'Apple TV'] },
  },
  {
    title: 'Mamma Mia!',
    year: 2008,
    genre: 'Musical',
    subgenre: 'Romance',
    seasons: ['summer'],
    locations: { US: ['Netflix', 'Amazon Prime Video'], Norway: ['Netflix', 'Apple TV'] },
  },
  {
    title: 'The Parent Trap',
    year: 1961,
    genre: 'Comedy',
    subgenre: 'Family',
    seasons: ['summer'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'Stand by Me',
    year: 1986,
    genre: 'Drama',
    subgenre: 'Coming-of-age',
    seasons: ['summer'],
    locations: { US: ['Netflix', 'Amazon Prime Video'], Norway: ['Viaplay', 'Apple TV'] },
  },
  {
    title: 'Midsommar',
    year: 2019,
    genre: 'Horror',
    subgenre: 'Folk horror',
    seasons: ['summer'],
  },
  {
    title: 'The Wicker Man',
    year: 1973,
    genre: 'Horror',
    subgenre: 'Folk horror',
    seasons: ['summer'],
    locations: { US: ['Shudder', 'Amazon Prime Video'], Norway: ['SF Anytime', 'Apple TV'] },
  },
  {
    title: 'Knives Out',
    year: 2019,
    genre: 'Mystery',
    subgenre: 'Whodunit',
    seasons: ['autumn'],
  },
  {
    title: 'Fantastic Beasts and Where to Find Them',
    year: 2016,
    genre: 'Fantasy',
    subgenre: 'Wizarding adventure',
    seasons: ['autumn'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Max', 'Apple TV'] },
  },
  {
    title: 'Dead Poets Society',
    year: 1989,
    genre: 'Drama',
    subgenre: 'Coming-of-age',
    seasons: ['autumn'],
    locations: { US: ['Disney+', 'Amazon Prime Video'], Norway: ['Disney+', 'Apple TV'] },
  },
  {
    title: 'Good Will Hunting',
    year: 1997,
    genre: 'Drama',
    subgenre: 'Coming-of-age',
    seasons: ['autumn'],
    locations: { US: ['Max', 'Amazon Prime Video'], Norway: ['Max', 'Apple TV'] },
  },
]

function getSeasonForDate(date) {
  const month = date.getMonth()
  const day = date.getDate()

  if ((month === 8 && day >= 15) || month === 9) return 'halloween'
  if ((month === 10 && day >= 20) || month === 11 || (month === 0 && day <= 5)) return 'christmas'
  if (month === 1 && day <= 14) return 'valentines'
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  return 'autumn'
}

const customMoviesStorageKey = 'seasonal-reels-custom-movies'
const sourceTypeLabels = {
  sub: 'Subscription',
  rent: 'Rent',
  buy: 'Buy',
  free: 'Free',
  tve: 'TV app',
}

function loadCustomMovies() {
  try {
    const storedMovies = JSON.parse(window.localStorage.getItem(customMoviesStorageKey) ?? '[]')
    return Array.isArray(storedMovies) ? storedMovies : []
  } catch {
    return []
  }
}

function App() {
  const [today] = useState(() => new Date())
  const [seasonChoice, setSeasonChoice] = useState('auto')
  const [genre, setGenre] = useState('All genres')
  const [country, setCountry] = useState('US')
  const [customMovies, setCustomMovies] = useState(loadCustomMovies)
  const [isAddingMovie, setIsAddingMovie] = useState(false)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [catalogResults, setCatalogResults] = useState([])
  const [catalogError, setCatalogError] = useState('')
  const [isSearchingCatalog, setIsSearchingCatalog] = useState(false)
  const [hasSearchedCatalog, setHasSearchedCatalog] = useState(false)
  const [titleSources, setTitleSources] = useState({})
  const [sourceErrors, setSourceErrors] = useState({})
  const [loadingSources, setLoadingSources] = useState('')
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    genre: '',
    subgenre: '',
    season: 'all',
  })
  const seasonKey = seasonChoice === 'auto' ? getSeasonForDate(today) : seasonChoice
  const season = seasons[seasonKey]
  const allMovies = [...movies, ...customMovies]
  const genres = ['All genres', ...new Set(allMovies.flatMap((movie) => [movie.genre, movie.subgenre]).filter(Boolean))]
  const visibleMovies = allMovies.filter((movie) => (
    movie.seasons.includes(seasonKey) && (genre === 'All genres' || movie.genre === genre || movie.subgenre === genre)
  ))

  useEffect(() => {
    window.localStorage.setItem(customMoviesStorageKey, JSON.stringify(customMovies))
  }, [customMovies])

  function updateNewMovie(event) {
    setNewMovie((currentMovie) => ({ ...currentMovie, [event.target.name]: event.target.value }))
  }

  function addMovie(event) {
    event.preventDefault()
    const addedMovie = {
      ...newMovie,
      id: crypto.randomUUID(),
      year: Number(newMovie.year),
      seasons: newMovie.season === 'all' ? Object.keys(seasons) : [newMovie.season],
      custom: true,
    }
    setCustomMovies((currentMovies) => [...currentMovies, addedMovie])
    setGenre('All genres')
    setNewMovie({ title: '', year: '', genre: '', subgenre: '', season: 'all' })
    setIsAddingMovie(false)
  }

  async function searchCatalog(event) {
    event.preventDefault()
    const query = catalogQuery.trim()
    if (query.length < 2) {
      setCatalogError('Enter at least two characters to search.')
      setCatalogResults([])
      return
    }

    setIsSearchingCatalog(true)
    setCatalogError('')
    setCatalogResults([])
    setHasSearchedCatalog(false)
    try {
      const response = await fetch(`/api/watchmode/search?q=${encodeURIComponent(query)}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'Movie search failed. Try again.')
      setCatalogResults(result.title_results ?? [])
      setHasSearchedCatalog(true)
    } catch (error) {
      setCatalogError(error.message)
    } finally {
      setIsSearchingCatalog(false)
    }
  }

  async function showWhereToWatch(movie) {
    const requestKey = `${country}:${movie.id}`
    if (titleSources[requestKey] || loadingSources === requestKey) return

    setLoadingSources(requestKey)
    setSourceErrors((currentErrors) => ({ ...currentErrors, [requestKey]: '' }))
    try {
      const response = await fetch(`/api/watchmode/title/${movie.id}/sources?region=${country}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'Streaming availability could not be loaded.')
      setTitleSources((currentSources) => ({ ...currentSources, [requestKey]: result }))
    } catch (error) {
      setSourceErrors((currentErrors) => ({ ...currentErrors, [requestKey]: error.message }))
    } finally {
      setLoadingSources('')
    }
  }

  return (
    <main className={`app-shell theme-${seasonKey}`}>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Seasonal Reels home">
          <span className="wordmark-icon" aria-hidden="true">S</span>
          <span>SEASONAL REELS</span>
        </a>
        <label className="location-control">
          <span>Streaming in</span>
          <select value={country} onChange={(event) => setCountry(event.target.value)} aria-label="Streaming location">
            {regions.map((region) => (
              <option value={region.code} key={region.code}>{region.label}</option>
            ))}
          </select>
        </label>
      </header>

      <section className="season-hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{season.eyebrow}</p>
          <h1 id="hero-title">A good time<br />for a <em>{season.label.toLowerCase()}</em> movie.</h1>
          <p className="hero-note">{season.note}</p>
          <label className="season-control">
            <span>In the mood for</span>
            <select value={seasonChoice} onChange={(event) => setSeasonChoice(event.target.value)}>
              <option value="auto">Whatever season it is</option>
              {Object.entries(seasons).map(([key, value]) => (
                <option value={key} key={key}>{value.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-orbit art-orbit-one" />
          <span className="art-orbit art-orbit-two" />
          <span className="art-sun">{season.symbol}</span>
          <span className="art-caption">A SEASONAL<br />DOUBLE FEATURE</span>
        </div>
        <span className="hero-index" aria-hidden="true">VOL. {String(today.getMonth() + 1).padStart(2, '0')} / {today.getFullYear()}</span>
      </section>

      <section className="movie-section" aria-labelledby="movie-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE SEASONAL EDIT</p>
            <h2 id="movie-heading">On the watchlist<span>.</span></h2>
          </div>
          <div className="section-actions">
            <p className="movie-count">{String(visibleMovies.length).padStart(2, '0')} FILMS</p>
            <button
              className="add-movie-trigger"
              type="button"
              aria-expanded={isAddingMovie}
              onClick={() => setIsAddingMovie((isOpen) => !isOpen)}
            >
              <span aria-hidden="true">{isAddingMovie ? '−' : '+'}</span>
              {isAddingMovie ? 'Close' : 'Add a movie'}
            </button>
          </div>
        </div>

        <section className="catalog-search" aria-labelledby="catalog-heading">
          <div className="catalog-search-heading">
            <div>
              <p className="section-kicker">THE FULL CATALOG</p>
              <h3 id="catalog-heading">Find a movie<span>.</span></h3>
            </div>
            <span className="catalog-region">Availability for {regionLabels[country]}</span>
          </div>
          <form className="catalog-search-form" onSubmit={searchCatalog}>
            <input
              aria-label="Search movie catalog"
              value={catalogQuery}
              onChange={(event) => setCatalogQuery(event.target.value)}
              placeholder="Search any movie"
              maxLength={100}
            />
            <button className="save-movie-button" type="submit" disabled={isSearchingCatalog}>
              {isSearchingCatalog ? 'Searching...' : 'Search catalog'}
            </button>
          </form>
          {catalogError && <p className="catalog-message is-error" role="alert">{catalogError}</p>}
          {!catalogError && isSearchingCatalog && <p className="catalog-message" role="status">Searching the movie catalog...</p>}
          {!catalogError && !isSearchingCatalog && hasSearchedCatalog && catalogResults.length === 0 && (
            <p className="catalog-message" role="status">No matching movies found.</p>
          )}
          {catalogResults.length > 0 && (
            <div className="catalog-results">
              {catalogResults.slice(0, 8).map((movie) => {
                const requestKey = `${country}:${movie.id}`
                const sources = titleSources[requestKey]

                return (
                  <article className="catalog-result" key={movie.id}>
                    <div className="catalog-result-heading">
                      <div>
                        <h4>{movie.name ?? movie.title}</h4>
                        <p>{movie.year ?? 'Release year unavailable'}</p>
                      </div>
                      <button
                        className="catalog-sources-button"
                        type="button"
                        onClick={() => showWhereToWatch(movie)}
                        disabled={loadingSources === requestKey}
                      >
                        {loadingSources === requestKey ? 'Checking...' : `Where to watch in ${regionLabels[country]}`}
                      </button>
                    </div>
                    {sourceErrors[requestKey] && <p className="catalog-message is-error" role="alert">{sourceErrors[requestKey]}</p>}
                    {sources && (sources.length > 0 ? (
                      <div className="catalog-source-list">
                        {sources.map((source, index) => (
                          <a
                            className="catalog-source"
                            href={source.web_url ?? undefined}
                            key={`${source.source_id}-${source.type}-${index}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>{source.name}</span>
                            <span className="source-type">{sourceTypeLabels[source.type] ?? source.type}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="catalog-message">No provider listings found for this region.</p>
                    ))}
                  </article>
                )
              })}
            </div>
          )}
          <p className="provider-attribution">Streaming availability by <a href="https://www.watchmode.com/" target="_blank" rel="noreferrer">Watchmode</a>.</p>
        </section>

        {isAddingMovie && (
          <form className="add-movie-form" onSubmit={addMovie}>
            <label>
              <span>Movie title</span>
              <input name="title" value={newMovie.title} onChange={updateNewMovie} required maxLength={100} />
            </label>
            <label>
              <span>Year</span>
              <input name="year" type="number" min="1888" max={today.getFullYear()} value={newMovie.year} onChange={updateNewMovie} required />
            </label>
            <label>
              <span>Genre</span>
              <input name="genre" value={newMovie.genre} onChange={updateNewMovie} required maxLength={40} />
            </label>
            <label>
              <span>Subgenre</span>
              <input name="subgenre" value={newMovie.subgenre} onChange={updateNewMovie} required maxLength={40} />
            </label>
            <label>
              <span>Season</span>
              <select name="season" value={newMovie.season} onChange={updateNewMovie}>
                <option value="all">All seasons</option>
                {Object.entries(seasons).map(([key, value]) => (
                  <option value={key} key={key}>{value.label}</option>
                ))}
              </select>
            </label>
            <button className="save-movie-button" type="submit">Add to watchlist</button>
          </form>
        )}

        <div className="filter-row">
          <div className="genre-filters" aria-label="Filter by genre">
            {genres.map((item) => (
              <button
                className={`genre-filter${genre === item ? ' is-active' : ''}`}
                type="button"
                key={item}
                aria-pressed={genre === item}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span className="season-indicator"><span className="season-dot" />{season.label} selection</span>
        </div>

        {visibleMovies.length > 0 ? (
          <div className="movie-grid">
            {visibleMovies.map((movie, index) => (
                <article className={`movie-card poster-${index % 4}`} key={movie.id ?? movie.title}>
                <div className="poster-art" aria-hidden="true">
                  <span className="poster-number">SIDE A / {String(index + 1).padStart(2, '0')}</span>
                  <span className="poster-initial">{movie.title.charAt(0)}</span>
                  <span className="poster-rule" />
                  <span className="poster-season">{season.label}</span>
                </div>
                <div className="movie-details">
                  <div className="movie-title-row">
                    <h3>{movie.title}</h3>
                    <span className="movie-year">{movie.year}</span>
                  </div>
                  <div className="movie-genres">
                    <span>{movie.genre}</span>
                    <span>{movie.subgenre}</span>
                  </div>
                  <div className="availability">
                    <span className="availability-label">WHERE TO WATCH</span>
                    <p>{movie.locations?.[regionLocationKeys[country]]?.join(' · ') ?? 'Availability varies by region'}</p>
                  </div>
                  {movie.custom && (
                    <button
                      className="remove-movie-button"
                      type="button"
                      onClick={() => setCustomMovies((currentMovies) => currentMovies.filter((item) => item.id !== movie.id))}
                    >
                      Remove from watchlist
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No {genre.toLowerCase()} picks for {season.label.toLowerCase()} yet. Try another genre.</p>
        )}
      </section>

      <footer className="site-footer">
        <span>SEASONAL REELS</span>
        <span>Good films, right on time.</span>
        <span>{today.getFullYear()}</span>
      </footer>
    </main>
  )
}

export default App
