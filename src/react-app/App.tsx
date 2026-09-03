import { useEffect, useState } from "react";
import "./App.css";

type User = {
  name: string;
  email: string;
  password: string;
};

type Ad = {
  id: number;
  title: string;
  price: string;
  location: string;
  category: string;
  description: string;
  image: string;
  seller: string;
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddAd, setShowAddAd] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Téléphones");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("sou9na_user");
    const savedAds = localStorage.getItem("sou9na_ads");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("sou9na_user");
      }
    }

    if (savedAds) {
      try {
        setAds(JSON.parse(savedAds));
      } catch {
        localStorage.removeItem("sou9na_ads");
      }
    }
  }, []);

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
    }
  };

  const logout = () => {
    localStorage.removeItem("sou9na_user");
    setUser(null);
    alert("Vous êtes déconnecté.");
  };

  const openAddAd = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setShowAddAd(true);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image trop grande. Maximum 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const publishAd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Veuillez vous connecter.");
      return;
    }

    if (!title.trim() || !price || !location.trim() || !description.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newAd: Ad = {
      id: Date.now(),
      title: title.trim(),
      price,
      location: location.trim(),
      category,
      description: description.trim(),
      image,
      seller: user.name,
    };

    const updatedAds = [newAd, ...ads];

    setAds(updatedAds);
    localStorage.setItem("sou9na_ads", JSON.stringify(updatedAds));

    setTitle("");
    setPrice("");
    setLocation("");
    setCategory("Téléphones");
    setDescription("");
    setImage("");

    setShowAddAd(false);

    alert("Annonce publiée avec succès ! 🎉");
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

        <div className="hero-content">

          <p className="welcome">
            Bienvenue sur
          </p>

          <h1>Sou9na</h1>

          <h2>
            Achetez. Vendez. Trouvez.
          </h2>

          <p>
            La plateforme tunisienne pour acheter
            <br />
            et vendre facilement.
          </p>

          <button
            className="sell-button"
            type="button"
            onClick={openAddAd}
          >
            ＋ Ajouter une annonce
          </button>

        </div>

      </section>


      {/* SEARCH */}
      <section className="search-section">

        <div className="search-box">
          🔎

          <input
            type="text"
            placeholder="Que cherchez-vous ?"
          />

        </div>

      </section>


      {/* CATEGORIES */}
      <section className="categories">

        <div className="section-title">
          <h2>Catégories</h2>
        </div>

        <div className="category-list">

          {[
            "Tous",
            "Téléphones",
            "Maison",
            "Voitures",
            "Mode",
            "Électronique",
            "Sport",
          ].map((item) => (
            <button
              key={item}
              className={`category ${
                item === "Tous" ? "active" : ""
              }`}
              type="button"
            >
              {item}
            </button>
          ))}

        </div>

      </section>


      {/* PRODUCTS */}
      <section className="products">

        <div className="section-title">
          <h2>Dernières annonces</h2>

          <span>
            {ads.length} annonce{ads.length !== 1 ? "s" : ""}
          </span>
        </div>

        {ads.length === 0 ? (

          <div className="empty">

            <span>🛍️</span>

            <h3>
              Aucune annonce pour le moment
            </h3>

            <p>
              Soyez le premier à publier une annonce !
            </p>

          </div>

        ) : (

          <div className="product-grid">

            {ads.map((ad) => (

              <div
                className="product-card"
                key={ad.id}
              >

                <div className="product-image">

                  {ad.image ? (
                    <img
                      src={ad.image}
                      alt={ad.title}
                    />
                  ) : (
                    <span>📦</span>
                  )}

                </div>

                <div className="product-info">

                  <div className="product-category">
                    {ad.category}
                  </div>

                  <h3>
                    {ad.title}
                  </h3>

                  <strong>
                    {ad.price} DT
                  </strong>

                  <div className="location">
                    📍 {ad.location}
                  </div>

                  <div className="location">
                    👤 {ad.seller}
                  </div>

                  <button
                    className="details"
                    type="button"
                    onClick={() =>
                      alert(
                        `${ad.title}\n\n${ad.description}\n\nPrix : ${ad.price} DT\nLieu : ${ad.location}`
                      )
                    }
                  >
                    Voir l'annonce
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


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


      {/* ADD AD */}
      {showAddAd && (

        <div
          className="modal-overlay"
          onClick={() => setShowAddAd(false)}
        >

          <div
            className="auth-card add-ad-card"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              type="button"
              onClick={() => setShowAddAd(false)}
            >
              ×
            </button>

            <div className="auth-icon">
              📦
            </div>

            <h2>
              Ajouter une annonce
            </h2>

            <p className="auth-subtitle">
              Publiez votre article sur Sou9na
            </p>

            <form onSubmit={publishAd}>

              <input
                type="text"
                placeholder="Titre de l'annonce"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="number"
                min="0"
                placeholder="Prix en DT"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="text"
                placeholder="Ville / Gouvernorat"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Téléphones</option>
                <option>Maison</option>
                <option>Voitures</option>
                <option>Mode</option>
                <option>Électronique</option>
                <option>Sport</option>
              </select>

              <textarea
                placeholder="Description de l'article"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={4}
              />

              <label className="image-upload">
                📷 Ajouter une photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>

              {image && (
                <img
                  className="preview-image"
                  src={image}
                  alt="Aperçu"
                />
              )}

              <button
                className="submit-btn"
                type="submit"
              >
                Publier l'annonce
              </button>

            </form>

          </div>

        </div>

      )}


      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          🛒 Sou9na
        </div>

        <p>
          Achetez. Vendez. Trouvez.
        </p>

        <p>
          © 2026 Sou9na
        </p>

      </footer>

    </div>
  );
}

export default App;            
