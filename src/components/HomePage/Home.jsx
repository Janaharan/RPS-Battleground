import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="wrapper">
      <header>
        <h1>Rock, Paper, Scissors: The Classic Showdown</h1>
      </header>

      <section>
        <div className="textContainer">
        <h2>The timeless game of chance and strategy.</h2>
        <h3> Choose your weapon wisely!</h3>
        </div>
        <div className="imageContainer">
          <img src="src\assets\rock.png" alt="" srcset="" />
          <img src="src\assets\paper.png" alt="" srcset="" />
          <img src="src\assets\scissor.png" alt="" srcset="" />
        </div>
      </section>
      <hr></hr>

      <div className='hero'>
          <h1>Rules</h1>
          <p><b>Rock</b> smashes scissors, <b>scissors</b> cuts paper, <b>paper</b> covers rock. It's that simple!</p>
          <Link to={'/game'}><button>Let's Battle!</button></Link>
          
      </div>

      
    </div>
  )
}

export default Home