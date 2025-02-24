import React from 'react'

const PokemonCards = ({ pokemonData }) => {
    return (
        <li className='pokemon-card'>
           <figure>
            <img
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
            className='pokemon-image'
            >
            </img>
            </figure> 
            <h1 className='pokemon-name'>{pokemonData.name}</h1>
            <div className='pokemon-info pokemon-highlight'>
                <p>
                    {
                        pokemonData.types.map((curType) => curType.type.name).join(", ")
                    }
                </p>
            </div>
            <div className='grid-three-cols'>
                <p className='pokemon-info'>
                    <span>
                        Height:
                    </span>{pokemonData.height}
                </p>
                <p className='pokemon-info'>
                    <span>
                        Weight:
                    </span>{pokemonData.weight}
                </p>
                <p className='pokemon-info'>
                    <span>
                        speed:
                    </span>{pokemonData.stats[5].base_stat}
                </p>
            </div>

            <div className='grid-three-cols'>
                <div className='pokemon-info'>
                <span>
                        Experience:
                    </span>
                    <p>
                        {pokemonData.base_experience}
                    </p>
                   
                </div>
                <div className='pokemon-info'>
                <span>
                        attack:
                    </span>
                    <p>
                        {pokemonData.stats[1].base_stat}
                    </p>
                    
                </div>
                <div className='pokemon-info'>
                <span>
                        Abilities:
                    </span>
                    <p>
                        {pokemonData.abilities.map((abs) => abs.ability.name).slice(0, 1).join(", ")}
                    </p>
                   
                </div>
            </div>
        </li>
    )
}

export default PokemonCards


// To Fetch nested data 
// {pokemonData.moves
//     .map(
//         (kcb) =>
//             `${kcb.move.name}: ${[...new Set(
//                 kcb.version_group_details.map((vgd) => vgd.move_learn_method.name)
//             )].join(", ")}`
//     )
//     .join(" | ")}