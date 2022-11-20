function rando() {

    const ourInfo = {
        "1": {
            name: "Christo Grabowski",
            github: "https://github.com/ChristoGrab",
            linked: null
        },
        "2": {
            name: "Ali Ezzeddine",
            github: "https://github.com/alkezz",
            linked: "https://www.linkedin.com/in/ali-ezzeddine-17b2b6248/"
        },
        "3": {
            name: "Jon Park",
            github: "https://github.com/jonpark13",
            linked: "https://www.linkedin.com/in/jon-park-9b23b6142/"
        },
        "4": {
            name: "Philip Troung",
            github: "https://github.com/Ptruongg",
            linked: "https://www.linkedin.com/in/truongphilip408/"
        },
    }

    function shuffle(array) {
<<<<<<< HEAD
        let currentIndex = array.length, randomIndex;
=======
        let currentIndex = array.length,  randomIndex;
>>>>>>> f91e88936e5f7ae57cd95682807a2f398b82abe5

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

<<<<<<< HEAD
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
=======
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
>>>>>>> f91e88936e5f7ae57cd95682807a2f398b82abe5
        }

        return array;
    }

    return (
        <>
            {shuffle(Object.keys(ourInfo)).map(e => (
                <>
                    <div>{ourInfo[e].name}</div>
                    <div>
                        <a href={ourInfo[e].github} target="_blank" >
                            <i className="ourIco fa-brands fa-github"></i>
                        </a>
                        <a href={ourInfo[e].linked} target="_blank" >
                            <i className="ourIco fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                </>
            ))}
        </>
    )
}
export default rando;
