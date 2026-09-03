 import { useEffect, useState } from "react";
import "./App.css";

type User = {
  name: string;
  email: string;
  password: string;
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState<User | null>(null);

  // تحميل الحساب عند فتح الموقع
  useEffect(() => {
    const savedUser = localStorage.getItem("sou9na_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("sou9na_user");
      }
    }
  }, []);

  // إنشاء حساب
  const register = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    const newUser: User = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem("sou9na_user", JSON.stringify(newUser));

    setUser(newUser);

    setShowRegister(false);

    setName("");
    setEmail("");
    setPassword("");

    alert("Compte créé avec succès !");
  };

  // Connexion
  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const savedUser = localStorage.getItem("sou9na_user");

    if (!savedUser) {
      alert("Aucun compte trouvé. Veuillez créer un compte.");
      return;
    }

    try {
      const registeredUser: User = JSON.parse(savedUser);

      if (
        registeredUser.email !== email.trim().toLowerCase() ||
        registeredUser.password !== password
      ) {
        alert("Email ou mot de passe incorrect.");
        return;
      }

      setUser(registeredUser);

      setShowLogin(false);

      setEmail("");
      setPassword("");

      alert(`Bienvenue ${registeredUser.name} 👋`);
    } catch {
      alert("Erreur. Veuillez créer un nouveau compte.");
      localStorage.removeItem("sou9na_user");
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("sou9na_user");
    setUser(null);

    alert("Vous êtes déconnecté.");
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          🛒 <span>Sou9na</span>
        </div>

        {user ? (
          <div className="user-area">

            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              className="login-btn"
              type="button"
              onClick={logout}
            >
              Déconnexion
            </button>

          </div>
        ) : (
          <button
            className="login-btn"
            type="button"
            onClick={() => setShowLogin(true)}
          >
            Connexion
          </button>
        )}

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
          onClick={() => {
            if (user) {
              alert("La création d'annonce sera disponible bientôt 🚀");
            } else {
              setShowLogin(true);
            }
          }}
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


      {/* LOGIN */}
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
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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


      {/* REGISTER */}
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
                onChange={(e) => setName(e.target.value)}
              />

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
