╔════════════════════════════════════════════════════════════════════════════╗
║                      EVENTEASE - API DOCUMENTATION                         ║
║                        Complete Booking System APIs                        ║
╚════════════════════════════════════════════════════════════════════════════╝

Base URL: http://localhost:5000/api

All protected endpoints require:
Header: Authorization: Bearer <jwt_token>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📮 BOOKING ENDPOINTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ CREATE ARTIST BOOKING
   POST /bookings/artist
   
   Required Headers:
   - Authorization: Bearer <token>
   - Content-Type: application/json
   
   Request Body:
   {
     "artistId": "uuid",
     "eventDate": "2025-02-15",
     "eventTime": "18:00",
     "numberOfTickets": 1,
     "eventType": "Wedding",
     "specialRequirements": "Want live setup in lawn"
   }
   
   Response (201):
   {
     "message": "Artist booking created",
     "booking": {
       "id": "uuid",
       "type": "artist",
       "status": "pending",
       "userId": "uuid",
       "itemId": "uuid",
       "itemName": "Raju Lama",
       "contactName": "John Doe",
       "contactEmail": "john@email.com",
       "eventDate": "2025-02-15",
       "eventTime": "18:00",
       "numberOfTickets": 1,
       "eventType": "Wedding",
       "createdAt": "2025-01-23T10:30:00Z"
     }
   }

2️⃣ CREATE VENUE BOOKING
   POST /bookings/venue
   
   Required Headers:
   - Authorization: Bearer <token>
   - Content-Type: application/json
   
   Request Body:
   {
     "venueId": "uuid",
     "startDate": "2025-03-15",
     "endDate": "2025-03-16",
     "startTime": "10:00",
     "endTime": "22:00",
     "numberOfGuests": 250,
     "specialRequirements": "Need parking and catering"
   }
   
   Response (201):
   {
     "message": "Venue booking created",
     "booking": {
       "id": "uuid",
       "type": "venue",
       "status": "pending",
       "userId": "uuid",
       "itemId": "uuid",
       "itemName": "Smart Palace",
       "contactName": "John Doe",
       "contactEmail": "john@email.com",
       "startDate": "2025-03-15",
       "endDate": "2025-03-16",
       "startTime": "10:00",
       "endTime": "22:00",
       "numberOfGuests": 250,
       "createdAt": "2025-01-23T10:30:00Z"
     }
   }

3️⃣ GET MY BOOKINGS
   GET /bookings/me
   
   Required Headers:
   - Authorization: Bearer <token>
   
   Response (200):
   [
     {
       "id": "uuid",
       "type": "venue",
       "status": "pending",
       "itemName": "Smart Palace",
       "contactName": "John Doe",
       "startDate": "2025-03-15",
       "endDate": "2025-03-16",
       "numberOfGuests": 250
     },
     {
       "id": "uuid",
       "type": "artist",
       "status": "confirmed",
       "itemName": "Raju Lama",
       "contactName": "John Doe",
       "eventDate": "2025-02-15",
       "numberOfTickets": 1
     }
   ]

4️⃣ GET VENDOR'S VENUE BOOKINGS
   GET /bookings/vendor
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "vendor"
   
   Response (200):
   [
     {
       "id": "uuid",
       "type": "venue",
       "status": "pending",
       "itemName": "Smart Palace",
       "contactName": "Jane Smith",
       "contactEmail": "jane@email.com",
       "startDate": "2025-03-15",
       "numberOfGuests": 150
     }
   ]

5️⃣ GET ALL BOOKINGS (ADMIN ONLY)
   GET /bookings
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "admin"
   
   Response (200): Array of all bookings

6️⃣ VIEW SINGLE BOOKING
   GET /bookings/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   
   Authorization: User must be owner, customer, or admin
   
   Response (200): Booking object

7️⃣ UPDATE BOOKING
   PUT /bookings/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   - Content-Type: application/json
   
   Request Body (Editable fields):
   {
     "startDate": "2025-03-20",
     "endDate": "2025-03-21",
     "startTime": "14:00",
     "endTime": "23:00",
     "numberOfGuests": 300,
     "eventDate": "2025-02-20",
     "eventTime": "19:00",
     "numberOfTickets": 2,
     "eventType": "Corporate",
     "specialRequirements": "Updated requirements",
     "contactPhone": "+977 98XXXXXXX",
     "status": "confirmed"  (Admin/Owner only)
   }
   
   Response (200):
   {
     "message": "Booking updated",
     "booking": { ...updated booking }
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏢 VENUE ENDPOINTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ GET ALL VENUES (PUBLIC)
   GET /venues
   
   Response (200):
   [
     {
       "id": "uuid",
       "name": "Smart Palace",
       "location": "Chabahil",
       "category": "Banquet",
       "price": "NPR 150,000 - 300,000",
       "capacity": "500-1000",
       "image": "url",
       "createdBy": "vendor-uuid"
     }
   ]

2️⃣ CREATE VENUE
   POST /venues
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "vendor" or "admin"
   
   Request Body (Form Data):
   {
     "name": "Smart Palace",
     "location": "Chabahil",
     "category": "Banquet",
     "description": "Luxurious venue...",
     "capacity": "500-1000",
     "price": "NPR 150,000 - 300,000",
     "contact": "+977 98XXXXXXX",
     "amenities": "Air Conditioning,Parking,Catering",
     "images": [file, file, file]  (up to 3)
   }
   
   Response (201):
   {
     "message": "Venue added successfully",
     "venue": { ...venue object with createdBy }
   }

3️⃣ GET MY VENUES (VENDOR ONLY)
   GET /venues/mine
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "vendor"
   
   Response (200): Array of venues created by this vendor

4️⃣ UPDATE VENUE
   PUT /venues/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must be venue creator (vendor) or admin
   
   Request Body:
   {
     "name": "Updated Name",
     "location": "New Location",
     "category": "Resorts",
     "description": "Updated description",
     "capacity": "600-1200",
     "price": "NPR 200,000 - 400,000",
     "contact": "+977 98XXXXXXX",
     "amenities": "Parking,WiFi,Catering"
   }
   
   Response (200):
   {
     "message": "Venue updated successfully",
     "venue": { ...updated venue }
   }

5️⃣ DELETE VENUE
   DELETE /venues/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must be venue creator (vendor) or admin
   
   Response (200):
   {
     "message": "Venue deleted successfully"
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎤 ARTIST ENDPOINTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ GET ALL ARTISTS (PUBLIC)
   GET /artists
   
   Response (200):
   [
     {
       "id": "uuid",
       "name": "Raju Lama",
       "category": "Singer",
       "genre": "Pop,Rock",
       "image": "url",
       "bookingFee": "NPR 200,000 - 500,000",
       "createdBy": "admin-uuid"
     }
   ]

2️⃣ CREATE ARTIST (ADMIN ONLY)
   POST /artists
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "admin"
   
   Request Body (Form Data):
   {
     "name": "New Artist",
     "category": "Singer",
     "genre": "Pop",
     "description": "Bio and description",
     "experience": "10+ years",
     "bookingFee": "NPR 300,000",
     "contact": "+977 98XXXXXXX",
     "availability": "Weddings,Concerts,Corporate",
     "achievements": "Award 1, Award 2",
     "popularSongs": "Song 1, Song 2, Song 3",
     "socialMedia": "{"facebook":"url","instagram":"url"}",
     "image": file
   }
   
   Response (201):
   {
     "message": "Artist added successfully",
     "artist": { ...artist object with createdBy }
   }

3️⃣ UPDATE ARTIST (ADMIN ONLY)
   PUT /artists/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "admin"
   
   Request Body:
   {
     "name": "Updated Name",
     "category": "Band",
     "genre": "Rock,Fusion",
     "description": "Updated description",
     "experience": "15+ years",
     "bookingFee": "NPR 500,000",
     "contact": "+977 98XXXXXXX",
     "availability": "Festivals,Concerts",
     "achievements": "Updated achievements",
     "popularSongs": "Updated songs"
   }
   
   Response (200):
   {
     "message": "Artist updated successfully",
     "artist": { ...updated artist }
   }

4️⃣ DELETE ARTIST (ADMIN ONLY)
   DELETE /artists/:id
   
   Required Headers:
   - Authorization: Bearer <token>
   - User must have role: "admin"
   
   Response (200):
   {
     "message": "Artist deleted successfully"
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 AUTHENTICATION ENDPOINTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ SIGNUP
   POST /auth/signup
   
   Request Body:
   {
     "fullName": "John Doe",
     "email": "john@email.com",
     "password": "password123",
     "phone": "+977 98XXXXXXX",
     "userType": "customer",  // "customer" | "vendor" | "admin"
     "location": "Kathmandu",
     "securityQuestion": "Your pet name?",
     "securityAnswer": "Fluffy"
   }
   
   Response (201):
   {
     "message": "Signup successful",
     "token": "jwt_token",
     "user": {
       "id": "uuid",
       "fullName": "John Doe",
       "email": "john@email.com",
       "userType": "customer"
     }
   }

2️⃣ LOGIN
   POST /auth/login
   
   Request Body:
   {
     "email": "john@email.com",
     "password": "password123"
   }
   
   Response (200):
   {
     "message": "Login successful",
     "token": "jwt_token",
     "user": {
       "id": "uuid",
       "fullName": "John Doe",
       "email": "john@email.com",
       "userType": "customer",
       "phone": "+977 98XXXXXXX",
       "location": "Kathmandu"
     }
   }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ERROR RESPONSES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

400 Bad Request:
{
  "message": "Missing required fields"
}

401 Unauthorized:
{
  "message": "Authorization token missing"
}
OR
{
  "message": "Invalid or expired token"
}

403 Forbidden:
{
  "message": "Forbidden"
}

404 Not Found:
{
  "message": "Booking not found"
}

409 Conflict:
{
  "message": "Email already registered"
}

500 Server Error:
{
  "message": "Server error",
  "error": "Error details"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 USAGE EXAMPLES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXAMPLE 1: Customer Creates Venue Booking
────────────────────────────────────────

// After login, token is obtained
const token = localStorage.getItem('token');

const bookingData = {
  venueId: '550e8400-e29b-41d4-a716-446655440000',
  startDate: '2025-04-15',
  endDate: '2025-04-16',
  startTime: '10:00',
  endTime: '22:00',
  numberOfGuests: 250,
  specialRequirements: 'Need parking'
};

fetch('http://localhost:5000/api/bookings/venue', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(bookingData)
})
.then(res => res.json())
.then(data => console.log(data.booking));

EXAMPLE 2: Vendor Updates Their Venue
──────────────────────────────────────

const token = localStorage.getItem('token');
const venueId = '550e8400-e29b-41d4-a716-446655440000';

const updateData = {
  price: 'NPR 250,000 - 400,000',
  capacity: '600-1200',
  description: 'Updated venue description'
};

fetch(`http://localhost:5000/api/venues/${venueId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
})
.then(res => res.json())
.then(data => console.log(data.message));

EXAMPLE 3: Admin Edits Artist
──────────────────────────────

const token = localStorage.getItem('token');
const artistId = '550e8400-e29b-41d4-a716-446655440000';

const updateData = {
  bookingFee: 'NPR 400,000 - 700,000',
  description: 'Award-winning artist'
};

fetch(`http://localhost:5000/api/artists/${artistId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(updateData)
})
.then(res => res.json())
.then(data => console.log(data.message));

EXAMPLE 4: Customer Gets Their Bookings
────────────────────────────────────────

const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/bookings/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(bookings => {
  bookings.forEach(booking => {
    console.log(`${booking.itemName} - ${booking.status}`);
  });
});

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

End of API Documentation
