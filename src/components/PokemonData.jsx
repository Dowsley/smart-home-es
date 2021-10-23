import { useState } from 'react'

const PokemonData = () => {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonData, setPokemonData] = useState({})
  const [notFound, setNotFound] = useState(true)

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  const renderPokemonAbilities = () => {
    if (!pokemonData.abilities) {
      return <></>
    }

    const abilities = pokemonData.abilities
      .map(({ ability }) => ability.name)
      .sort((a, b) => {
        return a.localeCompare(b)
      })

    return abilities.map((name) => {
      return (
        <li key={name}>
          {capitalize(name)}
        </li>
      )
    })
  }

  const loadPokemonData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((body) => {
            setNotFound(false)
            setPokemonData(body)
          })
        }
        else {
          setNotFound(true)
          setPokemonData({})
        }
      }).catch((error) => {
        setNotFound(true)
        setPokemonData({})
      })
  }

  return (
    <>
      <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="p-8 flex space-x-4 px-4 py-16 justify-around">
          <div className="bg-white flex items-center rounded-full shadow-xl">
            <input value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Pesquise" />
            <div className="p-2">
              <button
                onClick={loadPokemonData}
                className="material-icons bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
              >
                search
              </button>
            </div>
          </div>
        </div>

        {!notFound && <div className="flex space-x-4 px-4 justify-around">
          <div className="bg-gradient-to-t from-black via-pink-900 to-pink-700 w-28 md:w-96 md:rounded-3xl rounded-full shadow-md relative flex flex-col items-center justify-between md:items-start py-5 md:p-5 transition-all duration-150">
            <img 
              className="rounded-full w-20 h-20 shadow-sm absolute -top-8 transform md:scale-110 duration-700"
              src={pokemonData?.sprites?.front_default}
              alt=""
            />

            <div className="transform -rotate-90 md:rotate-0 align-middle text-2xl font-semibold text-gray-200 text-center m-auto md:m-0 md:mt-8">
              {capitalize(pokemonData.name)}
            </div>
            <ul className="text-lg text-gray-300 font-light hidden md:block">
              {renderPokemonAbilities()}
            </ul>
          </div>
        </div>}
        {notFound &&<div className="flex space-x-4 px-4 justify-around">
          <div class="rounded-full flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p class="text-xs">Busque por um nome de Pokemon válido! Ex: Pikachu</p>
          </div>
        </div>}
      </div>
    </>
  )
}

export default PokemonData
