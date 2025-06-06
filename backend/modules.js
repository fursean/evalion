const express = require("express");
const router = express.Router();

const modules = [
  {
    id: 1,
    title: "Hva er et økosystem?",
    prompt: "Forklar hva et økosystem er og hvorfor det er viktig.",
    estimatedTime: 15,
    topic: "Økologi",
    competenceGoals: ["Naturfag - Økosystem", "Biologisk mangfold"]
  },
  {
    id: 2,
    title: "Fotosyntese",
    prompt: "Beskriv hva som skjer under fotosyntesen.",
    estimatedTime: 10,
    topic: "Kjemi",
    competenceGoals: ["Naturfag - Kjemiske reaksjoner"]
  }
];

router.get("/", (req, res) => {
  res.json(modules);
});

module.exports = router;
