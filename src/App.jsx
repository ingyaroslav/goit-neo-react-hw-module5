//#region Common import
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import './App.css'
//#endregion Common import

//#region Pages
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
//#endregion Pages

//#region Components
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))
//#endregion Components

//#region Application
function App() { 
 return (
    <>
     <Navigation />
     <Suspense fallback={<p>Loading...</p>}>
      <Routes>        
        <Route path="/" element={<HomePage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='movies/:movieId' element={<MovieDetailsPage />}>
          <Route path='cast' element={<MovieCast />} />
          <Route path='reviews' element={<MovieReviews />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
       </Routes>
       </Suspense>
    </>
  )
}
//#endregion Application

export default App