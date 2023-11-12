import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentResults, Homepage, LandingPage, Login, Movie, MovieDetails, Plans, Preferences, Profile, Register, Series, SeriesDetails, NotFound } from './pages';
import DefaultLayout from './layouts/DefaultLayout';
import AuthProvider from './contexts/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/logowanie' element={<Login />} />
          <Route path='/rejestracja' element={<Register />} />
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/homepage' element={<Homepage />} />
            <Route path='/seriale' element={<ContentResults variant='seriale' />} />
            <Route path='/filmy' element={<ContentResults variant='filmy' />} />
            <Route path='/wyszukaj/:phrase' element={<ContentResults variant='wyszukiwanie' />} />
            <Route path='/serial-info/:id' element={<SeriesDetails />} />
            <Route path='/film-info/:id' element={<MovieDetails />} />
            <Route path='/serial/:id' element={<Series />} />
            <Route path='/film/:id' element={<Movie />} />
            <Route path='/profil' element={<Profile />} />
            <Route path='/plany' element={<Plans />} />
            <Route path='/preferencje' element={<Preferences />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
