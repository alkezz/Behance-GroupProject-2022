function rando() {
  
    const ourInfo = {
        "1": {
            name: "christo grabowski",
            github: "https://github.com/ChristoGrab",
            linked: null
        },
        "2": {
            name: "ali ezzedine",
            github: "https://github.com/aselk1",
            linked: null
        },
        "3": {
            name: "jon park",
            github: "https://github.com/jonpark13",
            linked: "https://www.linkedin.com/in/jon-park-9b23b6142/"
        },
        "4": {
            name: "philip troung",
            github: "https://github.com/Ptruongg",
            linked: null
        },
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    return (
        <>
            {shuffle(Object.keys(ourInfo)).map(e =>(
                <>
                <div>{ourInfo[e].name}</div>
                <div>
                <a href={ourInfo[e].github} target="_blank" >
                <i className="ourIco fa-brands fa-github"></i>
                </a>
                <a href={null} target="_blank" >
                <i className="ourIco fa-brands fa-linkedin"></i>
                </a>
                </div>
                </>
            ))}
        </>
    )
}
export default rando;
