const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  const data = {
    "name": "Luis",
    "project": "RestApi Hello World"
  }
  res.json(data);
})


module.exports = router;