import React, { useState } from 'react';
let SCREENS=[
    {
        id: 1,
        time: "10:00",
        seats:[1,1,1,1,1,1,0,0,1,1,0,0],
    },
    {
        id: 2,
        time: "2:00",
        seats:[1,1,0,1,1,1,0,0,1,1,1,1],
    },
    {
        id: 3,
        time: "6:00",
        seats:[1,0,0,1,1,1,0,0,1,1,0,1],
    },
];

const MOVIES = [
    {
        id:1,
        title: "Captain Miller",
        Image:
        "https://static.moviecrow.com/gallery/20230630/217090-Fz3hIAtaYAEHYWo.jpg",
    },
    {
        id:2,
        title: "Ayalaan",
        Image:
       "https://static.moviecrow.com/gallery/20230424/214872-Ayalaan%20Sivakarthikeyean%20Diwali%202023.jpg",
    },
    {
        id:3,
        title: "Mission 1",
        Image:
        "https://static.moviecrow.com/movies/0-achcham-enbadhu-illayae/212376-212373-Ayi-px214.jpeg",
    },
];


export default function MovieBooking()  {
    const[selectedmovie, setSelectedmovie] = useState(null);
    const[selectedScreen,setSelectedScreen] = useState(null);
    const[selectedSeats,setSelectedSeats] = useState([]);

    const handleSeatSelect=(index,screen)=>{
        if(screen.id!==selectedScreen?.id){
            setSelectedSeats([index])
            setSelectedScreen(screen)
            return
        }
        setSelectedScreen(screen)
        if(selectedSeats.includes(index)){
            setSelectedSeats(selectedSeats.filter((i)=>i !==index));
        }
        else{
            setSelectedSeats((seats)=>[...seats,index])
        }
    }

    const handleBooking=()=>{
        alert(`Seats ${selectedSeats.map((index)=>index+1).join(",")} booked for ${selectedScreen.movie.title}at${selectedScreen.time}`)

    }

    return(
        <div>
            <h1>PRAKASH CINEMAS</h1>
            <h2>choose your Movie</h2>
            <div className="movie-selection">
                {MOVIES.map((movie)=>(
            <div className="movie" key={movie.id} onClick={()=>setSelectedmovie(movie)}>
                <img className="movie-poster" src={movie.Image} alt={MOVIES.title}/>
                <div className="movie-title">{movie.title}</div>
            </div>
                ))}
        </div>
        {
            selectedmovie && (
                <>
                <h2>Choose your screen</h2>
                <div className="screen-selection">
                    {
                        SCREENS.map((screen)=>{
                            return(
                                <div key={screen.id} className={`screen ${screen.id === selectedScreen?.id ?"selected" : ""}
                                ${screen.seats.includes(1)?"available" : ""} `}
                                >
                                <div className="screen-number">Screen{screen.id}</div>
                                <div className="screen-time">{screen.time}</div>
                                <div className="movie-title">{selectedmovie.title}</div>
                                <div className="screen-seats">
                                {
                                    screen.seats.map((seat,index)=>{
                                        return(
                                            <div 
                                            key={index} 
                                            className={`seat ${seat ? "available":"unavailable"}
                                            ${
                                                selectedSeats.includes(index)&&selectedScreen?.id===screen.id?"selected":""
                                            } 
                                            ${selectedSeats.includes(index)? "booked":""}
                                            `}
                                            onClick={()=>{
                                                if(seat){
                                                    handleSeatSelect(index,{
                                                        ...screen,
                                                        movie:selectedmovie
                                                    })
                                                }
                                            }}
                                            > 
                                            <div className="seat-number">{index+1}</div>

                                        </div>
                                        ); 
                                    })}
                                </div>
                                </div>
                            )
                        })
                    }
                </div>
                </>
            )}
            <div className="booking-summary">
                <div className="selected-screen">
                    {
                        selectedScreen &&(
                       <div>
                             <h3> SelectedScreen: {selectedScreen.id}</h3>
                             <p>Time:{selectedScreen.time}</p>
                             <p>Movie{selectedScreen.movie.title}</p>
                        </div>
                        )
                    }
                </div>
                <div className="selected-seat">
                    {
                        selectedScreen && selectedSeats?.length > 0 &&(
                            <div>
                                <h3>Selected Seats:<>{selectedSeats.map(index => index+1).join(", ")}</></h3>
                                </div>
                        )
                    }
                </div>
            </div>
            <button className="payment-button"onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length ===0}>
                Book now
            </button>
        </div>
    )
}