import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { PokemonDetails } from './PokemonDetails';

export const PokemonList = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setsearchValue] = useState("");
    // const [searchType, setsearchType] = useState("id");
    
    const handlePageChange = (e) => {
        if (e === "next") {
            setCurrentPage(currentPage + 1);
        } else if (currentPage > 1 && e === "prev") {
            setCurrentPage(currentPage - 1);
        }
    }

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100").then((response) =>
            response.json().then((res) => {
                // console.log(res);
                setData(res.results);

            }))
    }, []);

    return (
        <div style={{ margin: '10px' }}>
            <InputGroup className="mb-3 sticky-top">
                <Form.Control
                    placeholder="Search pokemon here..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                        setsearchValue(e.target.value);
                    }}
                />
                <Button variant="success"> Search</Button>
                {/* 
                 ===================WILL COME SOON============================
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu onChange={(e)=>{
                        setsearchType(e.target.value);
                    }}>
                        <Dropdown.Item value="id" href="#/action-2">By ID</Dropdown.Item>
                        <Dropdown.Item value="name" href="#/action-1">By Name</Dropdown.Item>
                        <Dropdown.Item value="type" href="#/action-3">By Type</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
            </InputGroup>

            <div className='wrapper'>
                {/* 
                ===================WILL COME SOON============================
                    {
                    (searchType === "id") ?
                    (data.filter((item) => {
                            return item.name.indexOf(searchValue) >= 0;
                        })
                        .slice(((currentPage - 1) * 20), (currentPage * 20)).map((ele) => (
                            <PokemonDetails pokemon={ele} />
                        ))):
                    (searchType === "name") ?
                    (data.filter((item) => {
                            return item.name.indexOf(searchValue) >= 0;
                        })
                        .slice(((currentPage - 1) * 20), (currentPage * 20)).map((ele) => (
                            <PokemonDetails pokemon={ele} />
                        ))):
                    (searchType === "name") ?
                    (data.filter((item) => {
                            return item.name.indexOf(searchValue) >= 0;
                        })
                        .slice(((currentPage - 1) * 20), (currentPage * 20)).map((ele) => (
                            <PokemonDetails pokemon={ele} />
                        ))):
                    <span>No Data Found</span>
                } */

                data.filter((item) => {
                            return item.name.indexOf(searchValue) >= 0;
                        })
                        .slice(((currentPage - 1) * 20), (currentPage * 20)).map((ele) => (
                            <PokemonDetails pokemon={ele} />
                        ))
                
                }
            </div>
            <br></br>

            <Button variant={currentPage > 1 ? "primary" : "secondary"} size="lg" active onClick={() => handlePageChange("prev")}>
                Previous
            </Button>{' '}

            <Button variant={currentPage < 5 ? "primary" : "secondary"} disabled={currentPage < 5 ? false : true} size="lg" active onClick={() => handlePageChange("next")}>
                Next
            </Button>
        </div>

    )
}
