import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const PokemonDetails = ({ pokemon }) => {
    const [id, setId] = useState();
    const [pokedetails, setPokedetails] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setId(pokemon.url.split('/')[pokemon.url.split('/').length - 2]);
        fetch(pokemon.url).then((response) =>
            response.json().then((res) => {
                // console.log(res);
                // setData(res.results);
                setPokedetails(res)

            }))
    }, [pokemon]);

    return (
        <>
            <div
                className="card border border-primary "
                style={{ width: "13rem", margin: "5px" }}
            >
                <img
                    style={{ height: "8rem", margin: '5px' }}
                    className="img-fluid border rounded-circle"
                    src={"https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/" + id + ".svg"}
                    alt="Responsive image"
                />
                <div className="card-body" style={{ paddingBottom: "2px" }}>
                    <h5 className="card-title text-center">{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">ID : {pokedetails.id}</li>
                    {/* {console.log(pokedetails)} */}
                    <li className="list-group-item text-center">Type : {pokedetails && pokedetails.types && pokedetails.types.length > 0 ? (pokedetails.types[0].type.name).charAt(0).toUpperCase() + (pokedetails.types[0].type.name).slice(1) : <></>}</li>
                    <li className="list-group-item text-center">
                        <Button variant="primary" size="md" className='w-100' active onClick={() => setIsModalVisible(true)}>
                            View Details
                        </Button>
                    </li>

                </ul>
            </div>
            <Modal show={isModalVisible}>
                <Modal.Header>{pokemon.name.toUpperCase()}</Modal.Header>
                <Modal.Body style={{ display: 'flex' }}>
                    <div
                        className="card border border-primary "
                        style={{ width: "13rem" }}
                    >
                        <img
                            style={{ height: "8rem" }}
                            className="img-fluid border rounded-circle"
                            src={"https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/" + id + ".svg"}
                            alt="Responsive image"
                        />
                    </div>
                    <div className="card m-1" style={{ width: '18rem' }}>
                        <div className="card-body font-italic">
                            <h5 className="card-text ">
                                {(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)} is a {pokedetails && pokedetails.types && pokedetails.types.length > 0 ? pokedetails.types[0].type.name: <></> } type pokemon
                                with id {id}.
                            </h5>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer><Button variant="primary" size="md" active onClick={() => setIsModalVisible(false)}>
                    close
                </Button></Modal.Footer>
            </Modal>
        </>
    )
}
