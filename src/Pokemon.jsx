import React, { useEffect, useState } from 'react'
import "./index.css";
import PokemonCards from './PokemonCards';
import axios from 'axios';

const pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=50"
    const FetchPokemon = async () => {

        try {
            const res = await axios.get(API);
            // console.log(res)

            const detailedPokemonData = res.data.results.map(async (curPokemon) => {

                const pokeRes = await axios.get(curPokemon.url)
                return pokeRes.data;
            });

            const detailedResponses = await Promise.all(detailedPokemonData)
            // console.log(detailedResponses)
            setPokemon(detailedResponses)
            setLoading(false);
        }

        // try {
        //     const res = await fetch(API)
        //     const data = await res.json();

        //     const detailedPokemonData = data.results.map(async (curPokemon) => {

        //         const res = await fetch(curPokemon.url)
        //         const data = await res.json();
        //         return data;
        //     });

        //     const detailedResponses = await Promise.all(detailedPokemonData)
        //     console.log(detailedResponses)
        //     setPokemon(detailedResponses)
        //     setLoading(false);
        // }

        catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }


    }


    useEffect(() => {
        FetchPokemon();
    }, []);

    // Search functionality
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchData = pokemon.filter((curCard) => curCard.name.toLowerCase().includes(search.toLocaleLowerCase()));

    // const searchData = pokemon.filter((curCard) => 
    //     curCard.id.toString().includes(search) // Convert ID to string for partial matching
    // );


    if (loading) {
        return (<div>
            <h2>Loading...</h2>
        </div>
        );
    }

    if (error) {
        return (<div>
            <h2>{error.message}</h2>
        </div>
        );
    }

    return (
        <>
            <section className='container'>
                <header>
                    <h1>
                        Lets Catch Pokémon
                    </h1>
                </header>
                <div className='pokemon-search'>
                    <input
                        type='text'
                        placeholder='search pokemon'
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div>
                    <ul className='grid-three-cols'>{
                        searchData.map((currPokemon) => {
                            return (
                                <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
                            );
                        })
                    }
                    </ul>
                </div>

            </section>
        </>
    )
}

export default pokemon
