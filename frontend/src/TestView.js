// TestView.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TestView() {
  const { id } = useParams(); // test-ID fra URL
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hent testen og tilhørende moduler
  useEffect(() => {
    fetch(`http://localhost:3001/api/tests/${id}`)
      .then(res => res.json())
      .then(data => {
        setTest(data.test);
        setQuestions(data.questions);
      });
  }, [id]);

  if (!test) return <p>Laster...</p>;

  const current = questions[currentIndex];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{test.title}</h1>
      <p>⏱ {test.time_limit} min</p>
      <hr />
      <h3>Spørsmål {currentIndex + 1} av {questions.length}</h3>
      <p><strong>{current.title}</strong></p>
      <p><em>{current.prompt}</em></p>

      {/* Her kan du senere legge inn svarfelt */}
      
      {currentIndex < questions.length - 1 && (
        <button onClick={() => setCurrentIndex(i => i + 1)}>Neste</button>
      )}
    </div>
  );
}

export default TestView;
