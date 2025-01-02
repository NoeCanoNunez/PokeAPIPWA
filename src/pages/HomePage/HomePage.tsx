import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Añadir hook personalizado para detectar tamaño de pantalla
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
      'showdown': {
        front_default: string;
        front_shiny: string;
      }
    }
  };
  types: Array<{
    type: {
      name: string;
    }
  }>;
}

const HomePage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isShiny, setIsShiny] = useState(false);
  const isMobile = useIsMobile();
  const pokemonsPerPage = isMobile ? 8 : 20;
  // const [offset, setOffset] = useState(0);
  const [offset] = useState(0);
  const limit = 2015;
  const [pageInput, setPageInput] = useState(currentPage.toString());

  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon: { url: string }) => {
            const detail = await axios.get(pokemon.url);
            return detail.data;
          })
        );
        setPokemons((prev) => {
          const merged = [...prev, ...pokemonDetails];
          const uniquePokemons = merged.reduce((acc, item) => {
            if (!acc.some((p: Pokemon) => p.id === item.id)) acc.push(item);
            return acc;
          }, [] as Pokemon[]);
          return uniquePokemons;
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [offset]);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => {
        types.add(type.type.name);
      });
    });
    return Array.from(types).sort();
  }, [pokemons]);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 ||
        pokemon.types.some(type => selectedTypes.includes(type.type.name));
      return matchesSearch && matchesType;
    });
  }, [pokemons, searchTerm, selectedTypes]);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-blue-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-700',
      rock: 'bg-gray-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-purple-900',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };

    return colors[type] || 'bg-gray-400';
  };

  const getTypeHexColor = (type: string) => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return colors[type] || '#A8A878';
  };

  const getGradientBackground = (types: Array<{ type: { name: string } }>) => {
    if (types.length === 1) {
      const color = getTypeHexColor(types[0].type.name);
      return `linear-gradient(145deg, ${color}, ${color}80)`;
    }

    const color1 = getTypeHexColor(types[0].type.name);
    const color2 = getTypeHexColor(types[1].type.name);
    return `linear-gradient(145deg, ${color1}, ${color2})`;
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // const handleLoadMore = () => {
  //   setOffset((prevOffset) => prevOffset + limit);
  // };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPageInput(value);
  };

  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newPage = Math.min(
        Math.max(1, parseInt(pageInput) || 1),
        Math.ceil(filteredPokemons.length / pokemonsPerPage)
      );
      setCurrentPage(newPage);
      setPageInput(newPage.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const BackImages = [
    'https://pm1.aminoapps.com/6166/fe7e94e869b9e995ebaa838eb60954bfcff57269_hq.jpg',
    'https://virtualbackgrounds.site/wp-content/uploads/2020/09/pokemon-go-night-landscape-768x432.jpg',
    'https://i.pinimg.com/originals/f3/49/55/f349552c26a36513e1b142f3c51ad93c.jpg',
    'https://img.freepik.com/foto-gratis/arte-digital-paisaje-costero_23-2151575860.jpg?semt=ais_hybrid',
    'https://i.pinimg.com/736x/e0/2c/9c/e02c9cfcebec859b4b3a12b26130ef02.jpg',
    'https://img.freepik.com/foto-gratis/hermosa-vista-agua-estilo-anime_23-2151080251.jpg',
    'https://img.freepik.com/foto-gratis/estilo-arte-digital-rio-paisaje-natural_23-2151825773.jpg',
    'https://img.freepik.com/foto-gratis/estilo-arte-digital-rio-paisaje-natural_23-2151825777.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/398/735/desktop-wallpaper-pokemon-the-movie-2000-and-backgrounds-pokemon-landscape.jpg',
    'https://pm1.aminoapps.com/6166/fe7e94e869b9e995ebaa838eb60954bfcff57269_hq.jpg'
     ]

     const getCurrentBackgroundImage = () => {
      const currentMinute = new Date().getMinutes();
      const imageIndex = currentMinute % BackImages.length;
      return BackImages[imageIndex];
    };

  return (
    <div className="min-h-screen relative">
      {/* Imagen de fondo con la función aplicada */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('${getCurrentBackgroundImage()}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px) brightness(0.7)',
        }}
      />

      {/* Contenido principal */}
      <motion.div
        className='container relative z-10 -mt-32 md:-mt-10 w-[100vw-2rem] mx-auto px-4'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <section className="md:py-12 pb-52 md:pb-12">
          {/* Sección de Pokémon */}
          <section className="bg-gray-50/50 md:pb-10 rounded-xl py-5"> {/* Añadido pb-52 para móvil */}
            {/* Buscador y Filtros en escritorio */}
            <div className="hidden container mx-auto px-4 mb-8 md:block fixed top-2 left-1/2 transform -translate-x-1/2 z-50 p-2"> {/* Ajustado z-index y añadida sombra */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg ">
                {/* Search Input with Pokeball design */}
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    className="w-full p-2 pl-10 rounded-full border-2 border-green-600-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Shiny Toggle with Pokemon style */}
                <button
                  onClick={() => setIsShiny(!isShiny)}
                  className={`px-6 py-2 rounded-full font-bold text-white transform hover:scale-105 transition-all ${isShiny
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-blue-400/50'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-yellow-400/50'
                    } shadow-lg`}
                >
                  {isShiny ? 'Normal' : '✨ Shiny'}
                </button>

                {/* Type filters with Pokemon style */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {allTypes.map(type => (
                    <button
                      key={type}
                      className={`px-4 py-1 rounded-full text-white text-sm font-medium 
                    transform hover:scale-105 transition-all shadow-md
                    ${selectedTypes.includes(type)
                          ? `${getTypeColor(type)} ring-2 ring-white`
                          : 'bg-gray-400 opacity-70 hover:opacity-100'
                        }`}
                      onClick={() => {
                        setSelectedTypes(prev =>
                          prev.includes(type)
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        );
                        setCurrentPage(1);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Versión móvil fija en el bottom */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/50 rounded-t-3xl border-t p-2 z-50 shadow-lg"> {/* Ajustado z-index y añadida sombra */}
              <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Buscar Pokémon..."
                  className="p-1 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <button
                  onClick={() => setIsShiny(!isShiny)}
                  className={`mb-2 px-1 py-1 rounded-full font-bold text-white transform hover:scale-105 transition-all ${isShiny
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-blue-400/50'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-yellow-400/50'
                    } shadow-lg`}
                >
                  {isShiny ? 'Normal' : '✨ Shiny'}
                </button>
                <div className="flex flex-wrap gap-1 justify-center">
                  {allTypes.map(type => (
                    <button
                      key={type}
                      className={`text-white text-xs px-1 py-0 rounded ${selectedTypes.includes(type)
                        ? getTypeColor(type)
                        : 'bg-gray-400'
                        }`}
                      onClick={() => {
                        setSelectedTypes(prev =>
                          prev.includes(type)
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        );
                        setCurrentPage(1);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-2 text-sm">
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
                    value={pageInput}
                    onChange={handlePageInputChange}
                    onKeyDown={handlePageInputSubmit}
                    className="w-16 px-2 py-1 border rounded-md text-center"
                    title="Presiona Enter para ir a la página"
                  />
                  <span>de {Math.ceil(filteredPokemons.length / pokemonsPerPage)}</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPokemons.length / pokemonsPerPage)));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage >= Math.ceil(filteredPokemons.length / pokemonsPerPage)}
                  className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Siguiente
                </button>
              </div>
            </div>

            {/* Lista de Pokémon */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <motion.div
                  className="container mx-auto px-4 mt-32 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false }}
                >
                  {filteredPokemons
                    .slice(
                      (currentPage - 1) * pokemonsPerPage,
                      currentPage * pokemonsPerPage
                    )
                    .map((pokemon) => (
                      <div
                        key={pokemon.id}
                        className="rounded-xl shadow-lg overflow-hidden"
                        style={{
                          background: getGradientBackground(pokemon.types),
                        }}
                      >
                        <div className="w-full h-48 bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <img
                            src={
                              isShiny
                                ? pokemon.sprites.other.showdown.front_shiny
                                  ? pokemon.sprites.other.showdown.front_shiny
                                  : pokemon.sprites.front_shiny
                                : pokemon.sprites.other.showdown.front_default
                                  ? pokemon.sprites.other.showdown.front_default
                                  : pokemon.sprites.front_default
                            }
                            alt={pokemon.name}
                            className="h-40 w-40 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 ">
                          <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-xl font-bold capitalize text-white">
                              {pokemon.name}
                            </h3>
                            <span className="text-sm text-white/90">
                              #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {pokemon.types.map((type) => (
                              <span
                                key={type.type.name}
                                className="px-3 py-1 rounded-full text-white text-sm bg-white/20 backdrop-blur-sm"
                              >
                                {type.type.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </motion.div>

                {/* Controles de paginación compactos */}
                <div className="hidden md:flex justify-center items-center gap-2 text-sm fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 px-4 py-2 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
                      value={pageInput}
                      onChange={handlePageInputChange}
                      onKeyDown={handlePageInputSubmit}
                      className="w-16 px-2 py-1 border rounded-md text-center"
                      title="Presiona Enter para ir a la página"
                    />
                    <span>de {Math.ceil(filteredPokemons.length / pokemonsPerPage)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPokemons.length / pokemonsPerPage)));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage >= Math.ceil(filteredPokemons.length / pokemonsPerPage)}
                    className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    Siguiente
                  </button>
                </div>

                {/* Versión móvil de los controles de paginación */}


                {/* {!loading && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Cargar más
                    </button>
                  </div>
                )} */}
              </>
            )}
          </section>
        </section>
      </motion.div>
    </div>
  );
};

export default HomePage;
