const express = require("express");
const { Pool } = require("pg");
require("dotenv").config()
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
//const dataVideos = require("./example.json")

app.listen(port, () => console.log(`Listening on port ${port}`));
const cors = require("cors");
app.use(cors());

// let videos = [
//   {
//     id: 523523,
//     title: "Never Gonna Give You Up",
//     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     rating: 23,
//   },
//   {
//     id: 523427,
//     title: "The Coding Train",
//     url: "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     rating: 230,
//   },
//      {
//     id: 82653,
//     title: "Mac & Cheese | Basics with Babish",
//     url: "https://www.youtube.com/watch?v=FUeyrEN14Rk",
//     rating: 2111,
//   },
       
//   {
//     id: 858566,
//     title: "Videos for Cats to Watch - 8 Hour Bird Bonanza",
//     url: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
//     rating: 11,
//   },
//   {
//     id: 453538,
//     title:
//       "The Complete London 2012 Opening Ceremony | London 2012 Olympic Games",
//     url: "https://www.youtube.com/watch?v=4As0e4de-rI",
//     rating: 3211,
//   },

//   {
//     id: 283634,
//     title: "Learn Unity - Beginner's Game Development Course",
//     url: "https://www.youtube.com/watch?v=gB1F9G0JXOo",
//     rating: 211,
//   },

//   {
//     id: 562824,
//     title: "Cracking Enigma in 2021 - Computerphile",
//     url: "https://www.youtube.com/watch?v=RzWB5jL5RX0",
//     rating: 111,
//   },

//   {
//     id: 442452,
//     title: "Coding Adventure: Chess AI",
//     url: "https://www.youtube.com/watch?v=U4ogK0MIzqk",
//     rating: 671,
//   },

//   {
//     id: 536363,
//     title: "Coding Adventure: Ant and Slime Simulations",
//     url: "https://www.youtube.com/watch?v=X-iSQQgOd1A",
//     rating: 76,
//   },

//   {
//     id: 323445,
//     title: "Why the Tour de France is so brutal",
//     url: "https://www.youtube.com/watch?v=ZacOS8NBK6U",
//     rating: 73,
//   },

// ];



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

//videos.push(dataVideos);
// GET "/"
app.get("/videos", (req, res) => {
  
  //res.send(videos).json;
  pool.query('SELECT * FROM videos')
  .then((result) => res.send(result.rows).json)
  .catch((error) => {
    res.status(500).json(error);
  });

});

//POST "/"
app.post('/videos', (req, res) => {
  let {title, url } = req.body;
  let newVideos = {
    id: videos.length,
    title: title,
    url: url
  };

  if(!newVideos.id || !newVideos.url){
    res.status(400).send({
      "result": "fail",
      "message": "Video can not saved"
    });
  }else {
    videos.push(newVideos);
    res.sendStatus(200);
  }
})

//`GET` "/videos/:id"
app.get("/videos/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);
  let findVideo = videos.find((video) => video.id === id);
  if(!findVideo) {
   // res.send("Not Found").status(404)
   res.status(404).send(`no video with the ${id} is found`)
   return
  } 
  //else {
    res.send(findVideo);
//}
})
app.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let toDel = videos.find(opt => opt.id === id);
  let notDel = videos.filter(opt => opt.id !== id);

  if(toDel === undefined) {
    res.send(400).send({
      "result": "failure",
      "message": "Video could not be deleted"
    })
  } else {
    res.send({}).status(200);
  }
  videos = notDel;
})
