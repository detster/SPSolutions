const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const fetch = require("node-fetch");
const comics = require('../comics.json');

router.get('/', (req, res) => {
  try {
    res.json(comics);
  } catch (err) {
    res.status(500).json({ error: "Ocurrio un error inesperado." + err });
  }
});

router.post('/', (req, res) => {
  try {
    const { nombre, graducacionCGC, tiraje, reinpresiones } = req.body;
    if (nombre && graducacionCGC && tiraje && reinpresiones) {
      const id = comics.length + 1;
      const newComic = { id, ...req.body }
      comics.push(newComic);
      console.log(comics);
      res.json(comics);
    } else {
      res.status(400).json({ error: "Peticion incorrecta." });
    }
  } catch (err) {
    res.status(500).json({ error: "Ocurrio un error inesperado." + err });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, graducacionCGC, tiraje, reinpresiones } = req.body;
    var bool = false;
    if (nombre && graducacionCGC && tiraje && reinpresiones) {
      _.each(comics, (comic, index) => {
        if (comic.id == id) {
          comic.nombre = nombre;
          comic.graducacionCGC = graducacionCGC;
          comic.tiraje = tiraje;
          comic.reinpresiones = reinpresiones;
          bool = true;
        }
      });
      if (bool) {
        res.json(comics);
      } else {
        res.status(404).json({ error: "Elemento no encontrado." });
      }
    } else {
      res.status(400).json({ error: "Peticion incorrecta." });
    }
  } catch (err) {
    res.status(500).json({ error: "Ocurrio un error inesperado." + err });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    _.each(comics, (comic, index) => {
      if (comic.id == id) {
        comics.splice(index, 1);
        bool = true;
      }
    });
    if (bool) {
      res.json(comics);
    } else {
      res.status(404).json({ error: "Elemento no encontrado." });
    }
  } catch (err) {
    res.status(500).json({ error: "Ocurrio un error inesperado." + err });
  }
});

router.get("/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Ocurrio un error inesperado." + err });
  }
});

module.exports = router;