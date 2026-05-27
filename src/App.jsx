import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// 1. ƏSAS SƏHİFƏ KOMPONENTİ
// function MainPage({ movies, searchQuery, setSearchQuery, fetchMovies, favorites, addToFavorites, listName, setListName, saveFavoriteList }) {
//   const navigate = useNavigate();
//   const handleSearch = () => {
//   if (searchQuery.trim().length < 3) {
//     alert("Zəhmət olmasa ən azı 3 simvoldan ibarət axtarış sözü yazın (Məs: 1994, Iron Man 3)");
//     return;
//   }
//   // API-a sorğu göndərən kodların...
// };
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       fetchMovies(searchQuery);
//     }
//   };

//   return (
//     <div className="main-container">
//       <header className="header-banner">
//         <h1>Movie</h1>
//       </header>

//       <form className="search-section" onSubmit={handleSearchSubmit}>
//         <input 
//           type="text" 
//           placeholder="Search" 
//           className="search-input" 
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button type="submit" className="purple-btn">Search</button>
//       </form>

//       <div className="content-grid">
//         {/* SOL TƏRƏF */}
//         <div className="movies-container">
//           {movies.length > 0 ? (
//             movies.map((movie) => (
//               <div key={movie.imdbID} className="movie-card">
//                 {/* <img 
//                   src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} 
//                   alt={movie.Title} 
//                   className="movie-poster" 
//                 /> */}
//                 {/* <img 
//   // Əgər Poster obyektində link varsa və "N/A" deyilsə onu göstər, yoxdursa standart gözəl bir şəkil qoy
//   src={(movie.Poster && movie.Poster !== "N/A") ? movie.Poster : "https://via.placeholder.com/300x450.png?text=No+Poster+Available"} 
//   alt={movie.Title || "Movie Poster"} 
//   className="movie-poster" 
//   // QƏTİ SIĞORTA: Əgər link varsa amma hər hansı səbəbdən (məs. internet, bloklanma) yüklənə bilməsə, bu funksiya işə düşəcək və qırılma işarəsi yerinə placeholder qoyacaq
//   onError={(e) => {
//     e.target.onerror = null; 
//     e.target.src = "https://via.placeholder.com/300x450.png?text=No+Poster+Available";
//   }}
// /> */}
//           <div className="poster-wrapper">
//   {movie.Poster && movie.Poster !== "N/A" ? (
//     <img 
//       src={movie.Poster} 
//       alt={movie.Title} 
//       className="movie-poster" 
//       onError={(e) => {
//         // Əgər link qırıq çıxarsa, şəkli gizlət ki, altdakı CSS fona keçsin
//         e.target.style.display = 'none';
//         e.target.nextSibling.style.display = 'flex';
//       }}
//     />
//   ) : null}
  
//   {/* Şəkil olmayanda və ya qırılanda görünəcək mükəmməl CSS Placeholder */}
//   <div className="custom-placeholder" style={{ display: (movie.Poster && movie.Poster !== "N/A") ? 'none' : 'flex' }}>
//     <span>🎬 No Poster</span>
//   </div>
// </div>
//                 <div className="movie-info">
//                   <h2>{movie.Title}</h2>
//                   <p>Year: {movie.Year}</p>
//                   <button className="purple-btn" onClick={() => addToFavorites(movie)}>
//                     + Favorite
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">Film tapılmadı. Yenidən axtarın.</p>
//           )}
//         </div>

//         {/* SAĞ TƏRƏF */}
//         <div className="favorites-panel">
//           <div className="fav-added-list">
//             {favorites.map((fav, index) => (
//               <p key={index} className="fav-item-name">• {fav.Title}</p>
//             ))}
//           </div>

//           <div className="fav-box">
//             <input 
//               type="text" 
//               placeholder="Favorites list name" 
//               className="fav-input" 
//               value={listName}
//               onChange={(e) => setListName(e.target.value)}
//             />
            
//             {/* <button 
//               className="grey-btn" 
//               disabled={favorites.length === 0}
//               onClick={saveFavoriteList}
//               style={{ opacity: favorites.length === 0 ? 0.5 : 1, cursor: favorites.length === 0 ? 'not-allowed' : 'pointer' }}
//             >
//               Add To Favorite List
//             </button> */}
//             <button 
//   // İSTƏYİN: Əgər heç bir film yoxdursa VƏ YA input boşdursa düymə boz (grey-btn) olur. 
//   // İki şərt də ödənmisə bənövşəyi (purple-btn) olur.
//   className={favorites.length === 0 || !listName.trim() ? "grey-btn" : "purple-btn full-width"} 
  
//   // Düyməni aktiv/passiv etmək üçün şərtimiz (istəsən tamamilə keçirsiz edə bilərsən)
//   disabled={favorites.length === 0 || !listName.trim()}
  
//   onClick={saveFavoriteList}
//   style={{ 
//     marginBottom: '12px',
//     cursor: (favorites.length === 0 || !listName.trim()) ? 'not-allowed' : 'pointer' 
//   }}
// >
//   Add To Favorite List
// </button>
            
//             <button 
//               className="purple-btn full-width"
//               onClick={() => navigate('/list')}
//             >
//               Look At Favorite List
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
function MainPage({ movies, searchQuery, setSearchQuery, fetchMovies, favorites, addToFavorites, listName, setListName, saveFavoriteList }) {
  const navigate = useNavigate();

  // Birləşdirilmiş və təhlükəsiz axtarış funksiyası
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Səhifənin yenilənməsini dayandırırıq
    
    const trimmedQuery = searchQuery.trim();

    // 1. ŞƏRT: Əgər input tamamilə boşdursa, axtarışı dayandırırıq
    if (trimmedQuery === "") {
      alert("Zəhmət olmasa axtarış sözü yazın!");
      return;
    }

    // 2. ŞƏRT: Əgər yazılan söz 3 simvoldan azdırsa, istifadəçiyə xəbərdarlıq edirik
    if (trimmedQuery.length < 3) {
      alert("Zəhmət olmasa ən azı 3 simvoldan ibarət axtarış sözü yazın (Məs: 1994, Iron Man 3)");
      return;
    }

    // Hər iki şərtdən uğurla keçərsə, API sorğusunu başladırıq
    fetchMovies(trimmedQuery);
  };

  return (
    <div className="main-container">
      <header className="header-banner">
        <h1>Movie</h1>
      </header>

      {/* AXTARIŞ FORMU */}
      <form className="search-section" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search" 
          className="search-input" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="purple-btn">Search</button>
      </form>

      <div className="content-grid">
        {/* SOL TƏRƏF - FİLMLƏRİN SİYAHISI */}
        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                
                {/* Poster və xüsusi CSS Placeholder sahəsi */}
                <div className="poster-wrapper">
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <img 
                      src={movie.Poster} 
                      alt={movie.Title} 
                      className="movie-poster" 
                      onError={(e) => {
                        // Əgər link qırıq çıxarsa, şəkli gizlədirik ki, altdakı CSS dizayn görünsün
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Şəkil olmayanda və ya qırılanda görünəcək CSS Placeholder */}
                  <div 
                    className="custom-placeholder" 
                    style={{ display: (movie.Poster && movie.Poster !== "N/A") ? 'none' : 'flex' }}
                  >
                    <span>🎬 No Poster</span>
                  </div>
                </div>

                {/* Film məlumatları və Əlavə et düyməsi */}
                <div className="movie-info">
                  <h2>{movie.Title}</h2>
                  <p>Year: {movie.Year}</p>
                  <button className="purple-btn" onClick={() => addToFavorites(movie)}>
                    + Favorite
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p className="no-results">Film tapılmadı. Yenidən axtarın.</p>
          )}
        </div>

        {/* SAĞ TƏRƏF - SEVİMLİLƏR PANELİ */}
        <div className="favorites-panel">
          <div className="fav-added-list">
            {favorites.map((fav, index) => (
              <p key={index} className="fav-item-name">• {fav.Title}</p>
            ))}
          </div>

          <div className="fav-box">
            <input 
              type="text" 
              placeholder="Favorites list name" 
              className="fav-input" 
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            
            {/* Siyahı yaratmaq düyməsi (Yalnız film və ad olanda bənövşəyi olur) */}
            <button 
              className={favorites.length === 0 || !listName.trim() ? "grey-btn" : "purple-btn full-width"} 
              disabled={favorites.length === 0 || !listName.trim()}
              onClick={saveFavoriteList}
              style={{ 
                marginBottom: '12px',
                cursor: (favorites.length === 0 || !listName.trim()) ? 'not-allowed' : 'pointer' 
              }}
            >
              Add To Favorite List
            </button>
            
            {/* Yaradılmış siyahılara baxmaq üçün keçid düyməsi */}
            <button 
              className="purple-btn full-width"
              onClick={() => navigate('/list')}
            >
              Look At Favorite List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ListPage({ savedLists, deleteMovieFromSavedList, deleteWholeList }) {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="standalone-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <button className="close-page-btn" onClick={() => navigate('/')}>×</button>
        
        <h1 style={{ textAlign: 'center', color: '#7b007b', marginBottom: '10px' }}>Bütün Sevimli Siyahılarım</h1>

        {savedLists && savedLists.length > 0 ? (
          // İSTƏYİN: Nə qədər siyahı əlavə etmisənə hamısını dövr (map) edib ekrana çıxarırıq
          savedLists.map((list) => (
            <div key={list.id} className="standalone-content-box" style={{ marginBottom: '20px', position: 'relative' }}>
              
              {/* Siyahını tamamilə silmək üçün kiçik x düyməsi */}
              <button 
                onClick={() => deleteWholeList(list.id)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px' }}
                title="Siyahını sil"
              >
                Siyahını Sil 🗑️
              </button>

              <h2 className="standalone-list-title">{list.name}</h2>
              
              <div className="standalone-movies-list">
                {list.movies.length > 0 ? (
                  list.movies.map((movie) => (
                    <div key={movie.imdbID} className="standalone-movie-row">
                      <span className="standalone-movie-title">{movie.Title}</span>
                      <div className="standalone-row-actions">
                        <a 
                          href={`https://www.imdb.com/title/${movie.imdbID}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="imdb-link-btn"
                        >
                          IMDB
                        </a>
                        <button 
                          className="delete-item-btn"
                          onClick={() => deleteMovieFromSavedList(list.id, movie.imdbID)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{textAlign: 'center', padding: '10px', color: '#999'}}>Bu siyahıda film qalmadı.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="standalone-content-box">
            <p style={{textAlign: 'center', padding: '40px', color: '#777', fontSize: '18px'}}>
              Hələ heç bir sevimli film siyahısı yaradılmayıb.
            </p>
          </div>
        )}

        <div className="standalone-footer">
          <button className="movies-redirect-btn" onClick={() => navigate('/')}>Movies</button>
        </div>

      </div>
    </div>
  );
}
// 2. AYRICA SİYAHI SƏHİFƏSİ KOMPONENTİ
// function ListPage({ savedList, deleteMovieFromSavedList }) {
//   const navigate = useNavigate();

//   return (
//     <div className="page-wrapper">
//       <div className="standalone-list-container">
        
//         <button className="close-page-btn" onClick={() => navigate('/')}>×</button>
        
//         <div className="standalone-content-box">
//           <h2 className="standalone-list-title">{savedList ? savedList.name : "Siyahı Boşdur"}</h2>
          
//           <div className="standalone-movies-list">
//             {savedList && savedList.movies.length > 0 ? (
//               savedList.movies.map((movie) => (
//                 <div key={movie.imdbID} className="standalone-movie-row">
//                   <span className="standalone-movie-title">{movie.Title}</span>
//                   <div className="standalone-row-actions">
//                     <a 
//                       href={`https://www.imdb.com/title/${movie.imdbID}`} 
//                       target="_blank" 
//                       rel="noreferrer" 
//                       className="imdb-link-btn"
//                     >
//                       IMDB
//                     </a>
//                     <button 
//                       className="delete-item-btn"
//                       onClick={() => deleteMovieFromSavedList(movie.imdbID)}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p style={{textAlign: 'center', padding: '20px', color: '#777'}}>Siyahıda heç bir film yoxdur.</p>
//             )}
//           </div>
//         </div>

//         <div className="standalone-footer">
//           <button className="movies-redirect-btn" onClick={() => navigate('/')}>Movies</button>
//         </div>

//       </div>
//     </div>
//   );
// }

// 3. ƏSAS APP KOMPONENTİ
// export default function App() {
//   const [movies, setMovies] = useState([]);
  
//   // 1. İlk başda axtarış inputu boş görünsün deyə buranı boş string edirik
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [favorites, setFavorites] = useState([]);
//   const [listName, setListName] = useState('');
//   const [savedList, setSavedList] = useState(null);

//   // const fetchMovies = async (title) => {
//   //   const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=e42e9906`);
//   //   const data = await res.json();
//   //   if (data.Search) setMovies(data.Search.slice(0, 10));
//   // };
//   const fetchMovies = async (title) => {
//   try {
//     const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=e42e9906`);
//     const data = await res.json();
    
//     if (data.Response === "True" && data.Search) {
//       // Film tapılarsa, ilk 10 filmi ekrana çıxarırıq
//       setMovies(data.Search.slice(0, 10));
//     } else {
//       // QƏTİ HƏLL: Əgər film tapılmazsa, massivi boşaldırıq ki, köhnə filmlər ekrandan silinsin
//       setMovies([]);
//     }
//   } catch (error) {
//     console.error("Məlumat gətirilərkən xəta baş verdi:", error);
//     setMovies([]); // Xəta baş verərsə də köhnə filmləri təmizləyirik
//   }
// };
// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [favorites, setFavorites] = useState([]);
//   const [listName, setListName] = useState('');
//   const [savedList, setSavedList] = useState(null);

//   // Bu funksiya normal axtarış qutusu üçün qalır (Sözlə axtarış)
//   const fetchMovies = async (title) => {
//     try {
//       const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=e42e9906`);
//       const data = await res.json();
//       if (data.Response === "True" && data.Search) {
//         setMovies(data.Search.slice(0, 10));
//       } else {
//         setMovies([]);
//       }
//     } catch (error) {
//       setMovies([]);
//     }
//   };

//   // YENİ: Səhifə ilk dəfə açılanda tam fərqli 6-7 populyar filmin ID-si ilə məlumatları gətiririk
//   useEffect(() => {
//     const defaultMovieIDs = [
//       'tt0111161', // The Shawshank Redemption
//       'tt0468569', // The Dark Knight
//       'tt1375666', // Inception
//       'tt0137523', // Fight Club
//       'tt0109830', // Forrest Gump
//       'tt0120737', // Lord of the Rings
//       'tt0076759', // Star Wars: A New Hope
//       'tt0944947'  // Game of Thrones
//     ];

//     const loadInitialMovies = async () => {
//       try {
//         // Hər bir ID üçün eyni anda fərqli sorğular atırıq
//         const requests = defaultMovieIDs.map(id => 
//           fetch(`https://www.omdbapi.com/?i=${id}&apikey=e42e9906`).then(res => res.json())
//         );
        
//         const results = await Promise.all(requests);
//         // Gələn fərqli filmləri tək bir massivə yığıb state-ə yazırıq
//         const validMovies = results.filter(movie => movie.Response !== "False");
//         setMovies(validMovies);
//       } catch (error) {
//         console.error("Filmlər yüklənə bilmədi:", error);
//       }
//     };

//     loadInitialMovies();
//   }, []);

//   // ... digər funksiyalar (addToFavorites, saveFavoriteList və s. dəyişmir)

//   // 2. Səhifə ilk dəfə yüklənəndə tamamilə random populyar mövzulardan birini seçirik
//   useEffect(() => {
//     const randomKeywords = ['Marvel', 'Avengers', 'Star Wars', 'Harry Potter', 'Lord of the Rings', 'Spider-Man', 'Matrix', 'Inception', 'Avatar', 'Interstellar'];
//     const randomWord = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    
//     fetchMovies(randomWord);
//   }, []);

//   const addToFavorites = (movie) => {
//     if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
//       setFavorites([...favorites, movie]);
//     }
//   };

//   // const saveFavoriteList = () => {
//   //   if (!listName.trim()) return alert("Siyahı adı yazın!");
//   //   setSavedList({ name: listName, movies: favorites });
//   //   alert(`"${listName}" siyahısı yaradıldı!`);
//   // };
//   const saveFavoriteList = () => {
//   if (!listName.trim()) {
//     alert("Zəhmət olmasa siyahı adı yazın!");
//     return;
//   }
  
//   // Siyahını yadda saxlayırıq
//   setSavedList({ name: listName, movies: favorites });
//   alert(`"${listName}" siyahısı yaradıldı!`);

//   // İSTƏYİN: Siyahı yaradılandan sonra sağ tərəfi tamamilə sıfırlayırıq
//   setFavorites([]);  // Seçilmiş filmlər silinir
//   setListName('');   // Inputun içi təmizlənir
// };

//   const deleteMovieFromSavedList = (imdbID) => {
//     setSavedList({ ...savedList, movies: savedList.movies.filter(m => m.imdbID !== imdbID) });
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<MainPage movies={movies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} fetchMovies={fetchMovies} favorites={favorites} addToFavorites={addToFavorites} listName={listName} setListName={setListName} saveFavoriteList={saveFavoriteList} />} />
//       <Route path="/list" element={<ListPage savedList={savedList} deleteMovieFromSavedList={deleteMovieFromSavedList} />} />
//     </Routes>
//   );
// }
export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [favorites, setFavorites] = useState([]);
  const [listName, setListName] = useState('');
  
  // 1. DƏYİŞİKLİK: savedList artıq tək bir siyahı yox, BOŞ MASSİVDİR []
  const [savedLists, setSavedLists] = useState([]); 

  const fetchMovies = async (title) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=e42e9906`);
      const data = await res.json();
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search.slice(0, 10));
      } else {
        setMovies([]);
      }
    } catch (error) {
      setMovies([]);
    }
  };

  useEffect(() => {
    const defaultMovieIDs = ['tt0111161', 'tt0468569', 'tt1375666', 'tt0137523', 'tt0109830', 'tt0120737', 'tt0076759', 'tt0944947'];
    const loadInitialMovies = async () => {
      try {
        const requests = defaultMovieIDs.map(id => fetch(`https://www.omdbapi.com/?i=${id}&apikey=e42e9906`).then(res => res.json()));
        const results = await Promise.all(requests);
        const validMovies = results.filter(movie => movie.Response !== "False");
        setMovies(validMovies);
      } catch (error) {}
    };
    loadInitialMovies();
  }, []);

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  // 2. DƏYİŞİKLİK: Köhnə siyahıları qoruyaraq yenisini massivə əlavə edirik (...savedLists)
  const saveFavoriteList = () => {
    if (!listName.trim()) {
      alert("Zəhmət olmasa siyahı adı yazın!");
      return;
    }
    
    // Hər siyahıya unikal ID veririk ki, siləndə qarışmasın
    const newList = {
      id: Date.now(),
      name: listName,
      movies: favorites
    };

    setSavedLists([...savedLists, newList]); // Massivə əlavə olundu!
    alert(`"${listName}" siyahısı yaradıldı!`);

    setFavorites([]);  
    setListName('');   
  };

  // 3. DƏYİŞİKLİK: Müvafiq siyahıdan konkret filmi silmək məntiqi
  const deleteMovieFromSavedList = (listId, imdbID) => {
    setSavedLists(savedLists.map(list => {
      if (list.id === listId) {
        return { ...list, movies: list.movies.filter(m => m.imdbID !== imdbID) };
      }
      return list;
    }));
  };

  // 4. DƏYİŞİKLİK: Bütün siyahını tamamilə silmək istəsən deyə əlavə funksiya (Zəruri deyil amma faydalıdır)
  const deleteWholeList = (listId) => {
    setSavedLists(savedLists.filter(list => list.id !== listId));
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage movies={movies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} fetchMovies={fetchMovies} favorites={favorites} addToFavorites={addToFavorites} listName={listName} setListName={setListName} saveFavoriteList={saveFavoriteList} />} />
      <Route path="/list" element={<ListPage savedLists={savedLists} deleteMovieFromSavedList={deleteMovieFromSavedList} deleteWholeList={deleteWholeList} />} />
    </Routes>
  );
}