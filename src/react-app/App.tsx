import { useState } from "react";
import "./App.css";

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  location: string;
  emoji: string;
};

const products: Product[] = [
  {
    id: 1,
    title: "Téléphone Samsung",
    price: "850 DT",
    category: "Téléphones",
    location: "Hammamet",
    emoji: "📱",
  },
  {
    id: 2,
    title: "Canapé moderne",
    price: "650 DT",
    category: "Maison",
    location: "Nabeul",
    emoji: "🛋️",
  },
  {
    id: 3,
    title: "Vélo",
    price: "420 DT",
    category: "Sports",
    location: "Hammamet",
    emoji: "🚲",
  },
  {
    id: 4,
    title: "Table à manger",
    price: "900 DT",
    category: "Maison",
    location: "Tunis",
    emoji: "🪑",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    "Tous",
    "Téléphones",
    "Maison",
    "Sports",
    "Mode",
    "Voitures",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Tous" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🛒</span>
          <span>Sou9na</span>
        </div>

        <nav>
          <button>Accueil</button>
          <button>Catégories</button>
          <button>Mes favoris ❤️</button>
          <button className="login">Connexion</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="welcome">Bienvenue sur</p>
            <h1>Sou9na</h1>
            <h2>Achetez. Vendez. Trouvez.</h2>
            <p>
              La plateforme tunisienne pour acheter et vendre facilement.
            </p>

            <button className="sell-button">
              ＋ Ajouter une annonce
            </button>
          </div>
        </section>

        <section className="search-section">
          <div className="search-box">
            🔎
            <input
              type="text"
              placeholder="Que cherchez-vous ?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <section className="categories">
          <h2>Catégories</h2>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "category active" : "category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="products">
          <div className="section-title">
            <h2>Annonces récentes</h2>
            <span>{filteredProducts.length} annonces</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span>{product.emoji}</span>

                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.title}</h3>

                  <strong>{product.price}</strong>

                  <p className="location">
                    📍 {product.location}
                  </p>

                  <button className="details">
                    Voir l'annonce
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              <span>🔍</span>
              <h3>Aucune annonce trouvée</h3>
              <p>Essayez une autre recherche.</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <div className="footer-logo">🛒 Sou9na</div>
        <p>Votre marché tunisien en ligne 🇹🇳</p>
        <p>© 2026 Sou9na - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
