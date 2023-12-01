import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Film, Filmy, Kategorie, Login, Napisy, Odcinek, Serial, Seriale } from './pages';
import { AuthProvider } from "./contexts/AuthProvider";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Seriale />} />
            <Route path='/seriale' element={<Seriale />} />
            <Route path='/serial/dodaj' element={<Serial />} />
            <Route path='/serial/:id' element={<Serial />} />
            <Route path='/odcinek/:id' element={<Odcinek />} />
            <Route path='/odcinek/dodaj/:idSerialu' element={<Odcinek />} />
            <Route path='/filmy' element={<Filmy />} />
            <Route path='/film/dodaj' element={<Film />} />
            <Route path='/film/:id' element={<Film />} />
            <Route path='/napisy/:type/:id' element={<Napisy />} />
            <Route path='/kategorie' element={<Kategorie />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
