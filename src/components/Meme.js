import React, { useEffect, useState } from 'react' 


export default function Meme() {

  const [allMemes, setAllMemes] = useState([])

  const [meme, setMeme] = useState({
    firstText: "",
    secondText: "",
    randomImage: "https://i.imgflip.com/43a45p.png"
  })

  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  }, [])

  
function logb(){
  const randomNumber = Math.floor(Math.random() * allMemes.length) 
  const url = allMemes[randomNumber].url
  setMeme(prevMeme => ({
    ...prevMeme,
    randomImage: url
    }) 
  )
}

function handleChange(event){
  const {name, value} = event.target
  setMeme(prevText => ({
    ...prevText, 
    [name]:value
  }))
}

  return (
    <div className='memeForm'> 
        <div className='form'> 
        <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name='firstText'
                    value={meme.firstText}
                    onChange={handleChange}
                />
        <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name='secondText'
                    value={meme.secondText}
                    onChange={handleChange}
                />
         <button onClick={logb} className='formButton'>Get a new meme image</button>
          
        </div>
        <div className='container'> 
          <div className='meme'> 
            <img src={meme.randomImage} alt="Meme" className="meme--image"/>
            <h2 className="memeText top">{meme.firstText}</h2>
            <h2 className="memeText bottom">{meme.secondText}</h2>
          </div>
        </div>
    </div>
  )
}
