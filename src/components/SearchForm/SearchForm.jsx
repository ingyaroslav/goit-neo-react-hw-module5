import css from './SearchForm.module.css'

const SearchForm = ({ onSearchHandler, value }) => {
   return(
       <form onSubmit={onSearchHandler} className={css.SearchBarform}>
            <input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
              name='searchInput'
              className={css.SearchBarInput}
              defaultValue={value}         
            />
            <button type="submit" className={css.SearchBarBtn}>Search</button>
        </form>)
}

export default SearchForm