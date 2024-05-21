import { useEffect, useState } from "react";

function ToDoList({ userId, setPageTab }) {
    const [movies, setMovies] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");
    const [movieDirector, setMovieDirector] = useState("");

    useEffect(() => {
        // Fetch favorite movies from the backend when the component mounts
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://localhost:3434/user/items/" + userId, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    setMovies(result.data.items);
                } else {
                    alert(result.items);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    function handleSaveBtn() {
        // Save the favorite movies to the backend
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "_id": userId,
            "items": movies
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3434/user/items", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    alert(result.msg);
                } else {
                    alert(result.msg);
                }
            })
            .catch((error) => console.error(error));
    }

    function handleAddBtn() {
        // Add a new movie to the list
        if (movieTitle !== "" && movieDirector !== "") {
            const newMovie = { title: movieTitle, director: movieDirector };
            setMovies([...movies, newMovie]);
            setMovieTitle("");
            setMovieDirector("");
        }
    }

    function handleDeleteMovie(index) {
        // Delete a movie from the list
        const updatedMovies = [...movies];
        updatedMovies.splice(index, 1);
        setMovies(updatedMovies);
    }

    return (
        <div className="movie-list">
            <button onClick={() => setPageTab("welcome")}>Log Out</button>
            <br />
            <button onClick={handleSaveBtn}>Save</button>
            <br />
            <label>Title:</label>
            <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
            <br />
            <label>Director:</label>
            <input type="text" value={movieDirector} onChange={(e) => setMovieDirector(e.target.value)} />
            <br />
            <button onClick={handleAddBtn}>Add Movie</button>
            <ul>
                {movies.map((movie, index) => (
                    <li key={index}>
                        <div>Title: {movie.title}</div>
                        <div>Director: {movie.director}</div>
                        <button onClick={() => handleDeleteMovie(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;








