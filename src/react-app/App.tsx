import { useState } from "react";
import "./App.css";

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  location: string;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Téléphone Samsung",
    price: "850 DT",
    category: "Téléphones",
    location: "Hammamet",
    image: "📱",
  },
  {
    id: 2,
    title: "Canapé moderne",
    price: "650 DT",
    category: "Maison",
    location: "Nabeul",
    image: "🛋️",
  },
  {
    id: 3,
    title: "Vélo",
    price: "420 DT",
    category: "Sports",
    location: "Hammamet",
    image: "🚲",
  },
  {
    id: 4,
    title: "Table à manger",
    price: "900 DT",
    category: "Maison",
    location: "Tunis",
    image: "🪑",
  },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Maison");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("📦");

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

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const addProduct = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !price || !location) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      title,
      price: `${price} DT`,
      category: newCategory,
      location,
      image,
    };

    setProducts((current) => [newProduct, ...current]);

    setTitle("");
    setPrice("");
    setLocation("");
    setNewCategory("Maison");
    setImage("📦");
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🛒</span>
          <span>Sou9na</span>
        </div>

        <nav>
          <button onClick={() => setShowForm(false)}>Accueil</button>
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

            <button
              className="sell-button"
              onClick={() => setShowForm(true)}
            >
              ＋ Ajouter une annonce
            </button>
          </div>
        </section>

        {showForm && (
          <section className="search-section">
            <form className="search-box" onSubmit={addProduct}>
              <div style={{ width: "100%" }}>
                <h2 style={{ marginBottom: "20px" }}>
                  Ajouter une annonce
                </h2>

                <input
                  type="text"
                  placeholder="Nom de la marchandise"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                />

                <input
                  type="number"
                  placeholder="Prix en DT"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                />

                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                >
                  <option>Maison</option>
                  <option>Téléphones</option>
                  <option>Sports</option>
                  <option>Mode</option>
                  <option>Voitures</option>
                </select>

                <input
                  type="text"
                  placeholder="Ville / région"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                  }}
                />

                <label
                  style={{
                    display: "block",
                    padding: "15px",
                    marginBottom: "15px",
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  📷 Choisir une photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    style={{ display: "none" }}
                  />
                </label>

                {image.startsWith("data:image") ? (
                  <img
                    src={image}
                    alt="Aperçu"
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "60px",
                      marginBottom: "15px",
                    }}
                  >
                    {image}
                  </div>
                )}

                <button
                  type="submit"
                  className="details"
                >
                  Publier l'annonce
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "11px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    background: "white",
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </section>
        )}

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
                  category === item
                    ? "category active"
                    : "category"
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
                  {product.image.startsWith("data:image") ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span>{product.image}</span>
                  )}

                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id)
                      ? "❤️"
                      : "♡"}
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
