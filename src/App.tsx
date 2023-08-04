import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

function App() {
  return (
    <main className="flex flex-col px-5 xl:px-80 justify-center relative">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;
