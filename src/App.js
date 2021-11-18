import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la app
  const [search, setSearch] = useState('');
  // state de las imagenes de busqueda
  const [images, setImages] = useState([]);
  // paginadores
  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if(search === '') return;

      const imagesPerPage = 30;
      const key = '19528131-b9bd06cc292df7ac8e0f8383a';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImages(resultado.hits);

      // calcular el total de paginas
      const calculateTotalPages = Math.ceil(resultado.totalHits / imagesPerPage)
      setPages(calculateTotalPages);
      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarApi();
  },[search, actualPage])

  // definir la pagina anterior
  const previousPage = () => {
    const newActualPage = actualPage -1;
    if(newActualPage === 0) return;
    setActualPage(newActualPage);
  }

  // definir la pagina siguiente
  const nextPage = () => {
    const newActualPage = actualPage +1;
    if(newActualPage > pages) return;
    setActualPage(newActualPage);
  }
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Pixabay Images</p>

        <Formulario
          setSearch={setSearch}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          images={images}
        />

        { ( actualPage === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previousPage}
          >&laquo; Previous</button>
        )}

        { ( actualPage === pages) ? null : (
          <button
          type="button"
          className="btn btn-info"
          onClick={nextPage}
        >Next &raquo;</button>
      
        )}
      </div>
    </div>
  );
}

export default App;
