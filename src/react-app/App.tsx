import { useState } from "react";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    localStorage.setItem(
      "sou9na_user",
      JSON.stringify({
        name: email.split("@")[0],
        email: email,
      })
    );

    alert("Connexion réussie !");
    setShowLogin(false);
    setEmail("");
    setPassword("");
  };

  const register = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    localStorage.setItem(
      "sou9na_user",
      JSON.stringify({
        name,
        email,
      })
    );

    alert("Compte créé avec succès !");
    setShowRegister(false);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          🛒 <span>Sou9na</span>
        </div>

        {/* CONNEXION */}
        <button
          className="login-btn"
          type="button"
          onClick={() => setShowLogin(true)}
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

        <button
          className="add-btn"
          type="button"
          onClick={() => setShowLogin(true)}
        >
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
        <h2 className="section-title">
          Catégories
        </h2>

        <div className="categories">

          <button className="category active">
            Tous
          </button>

          <button className="category">
            Téléphones
          </button>

          <button className="category">
            Maison
          </button>

          <button className="category">
            Voitures
          </button>

          <button className="category">
            Mode
          </button>

          <button className="category">
            Électronique
          </button>

          <button className="category">
            Sport
          </button>

        </div>

      </main>


      {/* ========================= */}
      {/* LOGIN */}
      {/* ========================= */}

      {showLogin && (

        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >

          <div
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              type="button"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            <div className="auth-icon">
              👤
            </div>

            <h2>
              Bienvenue 👋
            </h2>

            <p className="auth-subtitle">
              Connectez-vous à votre compte Sou9na
            </p>


            <form onSubmit={login}>

              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="submit-btn"
                type="submit"
              >
                Se connecter
              </button>

            </form>


            <div className="switch-auth">

              <span>
                Pas encore de compte ?
              </span>

              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
              >
                Créer un compte
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ========================= */}
      {/* REGISTER */}
      {/* ========================= */}

      {showRegister && (

        <div
          className="modal-overlay"
          onClick={() => setShowRegister(false)}
        >

          <div
            className="auth-card"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              type="button"
              onClick={() => setShowRegister(false)}
            >
              ×
            </button>

            <div className="auth-icon">
              🛍️
            </div>

            <h2>
              Créer un compte
            </h2>

            <p className="auth-subtitle">
              Rejoignez Sou9na gratuitement
            </p>


            <form onSubmit={register}>

              <input
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                className="submit-btn"
                type="submit"
              >
                Créer mon compte
              </button>

            </form>


            <div className="switch-auth">

              <span>
                Vous avez déjà un compte ?
              </span>

              <button
                type="button"
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
              >
                Se connecter
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
