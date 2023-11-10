import {useState} from "react";
import axios from "axios";
import Card from "@/components/card";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTEyNWUxY2ZkM2FjYzM0M2UwMjc2NjcyZDM5ODk0YiIsInN1YiI6IjYwOTgyYzRiMDkyOWY2MDAzYWRlZDM1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Hx8emELviZA_xteYrcflxshQptM13PcHkqWQDyL8n4k'
    }
};

export default function Home() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    const handleClick = () => {
        axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.data)
            .then(response => {
                setMovies(response.results);
            })
            .catch(err => console.error(err));
    }

  return (
    <>
        <section>
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Bir şeyler yaz.."/>
            <button onClick={handleClick}>Ara</button>
        </section>
        <section>
            <ul className="card-listing">
            {movies.map(movie => (
              <Card key={movie.id} movie={movie} />
            ))}
            </ul>
        </section>
    </>
  )
}
