const Header = () => (
  <div className="app__header">
    <h1 className="app__title">VS Code Snippets Generator</h1>
    <p className="app__subtitle">
      {"Enhanced by "}
      
      <a
        className="app__link"
        href="https://www.linkedin.com/in/frievalt/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Andy Frievalt
      </a>{" "}
      Originally by{" "}
      <a
        className="app__link"
        href="https://pawelgrzybek.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pawel Grzybek
      </a>{" "}
      |{" "}
      <a
        className="app__link"
        href="https://www.buymeacoffee.com/pawelgrzybek"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy him a coffee
      </a>{" "}
      | Source code on{" "}
      <a
        className="app__link"
        href="https://github.com/pawelgrzybek/snippet-generator"
      >
        GitHub
      </a>
    </p>
  </div>
);

export default Header;
