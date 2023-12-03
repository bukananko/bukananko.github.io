import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <Navbar />
      <main className="px-5 xl:px-80 relative bg-[url('/lightbg.svg')] dark:bg-[url('/darkbg.svg')] bg-cover bg-center md:bg-contain">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
