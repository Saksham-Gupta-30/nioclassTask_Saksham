import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MathJaxContext } from "better-react-mathjax"

import Home from "./pages/Home.jsx"
import Test from "./pages/Test.jsx"
import Result from "./pages/Result.jsx"

const App = () => {
  const config = {
    "fast-preview": {
      disabled: true
    },
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    messageStyle: "none"
  };

  return (
    <MathJaxContext
      version={2}
      config={config}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </MathJaxContext>
  )
}

export default App