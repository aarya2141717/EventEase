export default function ArtistCard({ img, name, role, rating = "4.5" }) {
  return (
    <div className="card artist-card">
      <img src={`/images/${img}`} alt={name} />
      
      <div className="card-info">
        <h3>{name}</h3>
        <p className="role">{role}</p>
      </div>

      <div className="card-bottom">
        <div className="rating">
          ⭐ {rating}
        </div>
        <button className="view-btn">View Details</button>
      </div>
    </div>
  );
}