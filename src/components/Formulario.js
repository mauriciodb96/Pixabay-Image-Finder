import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({setSearch}) => {
    const [term, setTerm] = useState('');
    const [error, setError] = useState(false);

    const searchImage = e => {
        e.preventDefault();

        // validar
        if(term.trim() === ''){
            setError(true);
            return;
        } 
        setError(false);
        // enivar el termino de busqueda al compoennte principal
        setSearch(term);
    }
    return(
        <form
            onSubmit={searchImage}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg" 
                        placeholder="Example; futbol, coffee, sunset"
                        onChange={e => setTerm(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>

            {error ? <Error mensaje="Please type what you are looking for" /> : null}
        </form>
    )

}
export default Formulario;