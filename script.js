document.getElementById("fetch-jokes").addEventListener("click", function() {
    let language = document.getElementById("language").value;
    let category = document.getElementById("category").value;
    let numJokes = document.getElementById("num-jokes").value;
    let jokeId = document.getElementById("joke-id").value;
    let url;
  
    if (jokeId) {
      url = `https://cs330-csg7.onrender.com/api/v1/joke/${jokeId}`;
    } else if (numJokes) {
      url = `https://cs330-csg7.onrender.com/api/v1/jokes/${language}/${category}/${numJokes}`;
    } else {
      url = `https://cs330-csg7.onrender.com/api/v1/jokes/${language}/${category}`;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let jokesList = document.getElementById("jokes-list");
        jokesList.innerHTML = "";
        
        if (data.jokes) {
          data.jokes.forEach(joke => {
            let p = document.createElement("p");
            p.textContent = joke;
            jokesList.appendChild(p);
          });
        } else {
          let p = document.createElement("p");
          p.textContent = data.error || "Error fetching jokes .";
          jokesList.appendChild(p);
        }
      })
      .catch(error => {
        let p = document.createElement("p");
        p.textContent = "Error fetching jokes.";
        document.getElementById("jokes-list").appendChild(p);
      });
  });
