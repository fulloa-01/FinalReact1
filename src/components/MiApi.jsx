import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const baseUrl = "https://ghibliapi.herokuapp.com/films"

const Datos = () => {
    const [datos, setDatos] = useState([]);
    const [filtroTitulo, setFiltroTitulo] = useState("");

 
    /**
     * Cuando el usuario escribe en el campo de entrada, el valor del campo de entrada se establece en
     * la variable de estado 'filtro' mediante la función setFiltro.
     */
    const capturaInputTitulo = (e) => {
        setFiltroTitulo(e.target.value)
    }

    
    /* Un Hook que se llama después de cada renderizado. Se puede utilizar para realizar efectos
    secundarios, por ejemplo, la obtención de datos. */
    useEffect(() => {
        const fetchDatos = async () => {
            let urlFiltro = baseUrl;

            // La búsqueda es Case Sensitive debido a la API que estoy utilizando.

            if (filtroTitulo !== "") {
                urlFiltro = baseUrl + "?title=" + filtroTitulo
            }
           
            const resp = await fetch(urlFiltro);
            const respDatos = await resp.json();

            /* Sorting the data by title. */
            const ordeDesc = respDatos.sort( (a, b) => {
                if (a.title > b.title) {
                  return 1;
                }
                if (a.title < b.title) {
                  return -1;
                }
                return 0;
              })
            setDatos(ordeDesc);
        }

        fetchDatos();
    }, [filtroTitulo])

    
    return (
        <> 
            <div className='container-fluid'>

                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <p className="navbar-brand">Studio Ghibli - Movies Info</p>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Buscar película" name="Buscador" value={filtroTitulo} onChange={capturaInputTitulo} />
                        </form>
                    </div>
                </nav>
            </div>


            <div className='grid container mt-4'>

                {datos.map((dato) => (

                    <div key={dato.id} style={{ width: '18rem' }}>
                        <Card border="info" >
                            <Card.Img variant="top" src={dato.movie_banner} />
                            <Card.Body>
                                <Card.Title>{dato.title} - {dato.release_date}</Card.Title>
                                <Card.Text>{dato.description}</Card.Text>
                            </Card.Body>
                        </Card>


                    </div>

                ))}

            </div>
        </>
    )
}

export default Datos;

