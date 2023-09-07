import { useEffect, useState  } from 'react';
import { Nutrition } from './Nutrition';
import { LoaderPage } from './LoaderPage';
import './App'
import video from './orange.mp4';


function App() {

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  
  const MY_ID = "dc43f5c9";
  const MY_KEY = "41004f36187693a52846881269bea7f0";
  const MY_URL = "https://api.edamam.com/api/nutrition-details"

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly');
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
      if (wordSubmitted !== '') {
        let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
        fetchData(ingr);
      }
  }, [wordSubmitted])
  
  return (

<div className="App">
<div className="container">
<video autoPlay muted loop>
 <source src={video} type="video/mp4" />
</video>
</div>

      {stateLoader && <LoaderPage />}

      <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch}>
        <input
          placeholder="Search..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        }
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }) =>
              <Nutrition
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}


export default App;
