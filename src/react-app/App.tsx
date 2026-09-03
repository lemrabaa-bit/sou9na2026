import { useState } from "react";
import "./App.css";

type Mode = "login" | "register";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      if (!name || !email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      localStorage.setItem(
        "sou9na_user",
        JSON.stringify({ name, email })
      );

      alert("Compte créé avec succès !");
    } else {
      if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      localStorage.setItem(
        "sou9na_user",
        JSON.stringify({ name: email.split("@")[0], email })
      );

      alert("Connexion réussie !");
    }

    setShowAuth(false);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          🛒 <span>Sou9na</span>
        </div>

        <button
          className="login-btn"
          onClick={() => {
            setMode("login");
            setShowAuth(true);
          }}
        >
          Connexion
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <p>Bienvenue sur</p>

        <h1>Sou9na</h1>

        <h2>Achetez. Vendez. Trouvez.</h2>

        <div className="hero-description">
          La plateforme tunisienne pour acheter
          <br />
          et vendre facilement.
        </div>

        <button className="add-btn">
          ＋ Ajouter une annonce
        </button>
      </section>

      {/* SEARCH */}
      <main className="content">
        <div className="search">
          🔎
          <input
            type="text"
            placeholder="Que cherchez-vous ?"
          />
        </div>

        {/* CATEGORIES */}
        <h2 className="section-title">Catégories</h2>

        <div className="categories">
          <button className="category active">Tous</button>
          <button className="category">Téléphones</button>
          <button className="category">Maison</button>
          <button className="category">Voitures</button>
          <button className="category">Mode</button>
        </div>
      </main>

      {/* AUTH MODAL */}
      {showAuth && (
        <div
          className="modal-overlay"
          onClick={() => setShowAuth(false)}
        >
          <div
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowAuth(false)}
            >
              ×
            </button>

            <h2>
              {mode === "login"
                ? "Bienvenue 👋"
                : "Créer un compte"}
            </h2>

            <p className="auth-subtitle">
              {mode === "login"
                ? "Connectez-vous à votre compte Sou9na"
                : "Rejoignez Sou9na gratuitement"}
            </p>

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="submit-btn" type="submit">
                {mode === "login"
                  ? "Se connecter"
                  : "Créer mon compte"}
              </button>
            </form>

            <div className="switch-auth">
              {mode === "login" ? (
                <>
                  Pas encore de compte ?
                  <button
                    onClick={() => setMode("register")}
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?
                  <button
                    onClick={() => setMode("login")}
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
