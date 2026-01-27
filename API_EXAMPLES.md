# API Reference & Code Examples

## 📌 Base URL
```
http://localhost:5000/api
```

---

## 🎫 Booking Endpoints

### 1. Create Venue Booking
**Endpoint**: `POST /api/bookings/venue`

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

**Request Body**:
```javascript
{
  "venueId": "uuid-of-venue",
  "startDate": "2025-02-14",
  "endDate": "2025-02-14",
  "startTime": "18:00",
  "endTime": "22:00",
  "numberOfGuests": 100,
  "specialRequirements": "Need parking for 20 cars"
}
```

**Response (201)**:
```javascript
{
  "message": "Venue booking created",
  "booking": {
    "id": "booking-uuid",
    "type": "venue",
    "status": "pending",
    "vendorApproval": "pending",
    "adminApproval": "pending",
    "userId": "customer-uuid",
    "itemName": "The Grand Hotel",
    "startDate": "2025-02-14",
    "endDate": "2025-02-14",
    "numberOfGuests": 100,
    "createdAt": "2025-01-27T10:30:00Z"
  }
}
```

---

### 2. Create Artist Booking
**Endpoint**: `POST /api/bookings/artist`

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

**Request Body**:
```javascript
{
  "artistId": "uuid-of-artist",
  "eventDate": "2025-02-14",
  "eventTime": "20:00",
  "numberOfTickets": 5,
  "eventType": "Wedding",
  "specialRequirements": "Need sound system for 500 people"
}
```

**Response (201)**:
```javascript
{
  "message": "Artist booking created",
  "booking": {
    "id": "booking-uuid",
    "type": "artist",
    "status": "pending",
    "vendorApproval": "pending",
    "adminApproval": "pending",
    "userId": "customer-uuid",
    "itemName": "John Smith - Singer",
    "eventDate": "2025-02-14",
    "eventTime": "20:00",
    "numberOfTickets": 5,
    "createdAt": "2025-01-27T10:30:00Z"
  }
}
```

---

### 3. Get User's Bookings
**Endpoint**: `GET /api/bookings/me`

**Headers**:
```javascript
{
  "Authorization": "Bearer <token>"
}
```

**Response (200)**:
```javascript
[
  {
    "id": "booking-1",
    "type": "venue",
    "status": "pending",
    "vendorApproval": "pending",
    "adminApproval": "pending",
    "itemName": "The Grand Hotel",
    "startDate": "2025-02-14",
    "vendorApprovalDate": null,
    "adminApprovalDate": null
  },
  {
    "id": "booking-2",
    "type": "artist",
    "status": "approved",
    "vendorApproval": "approved",
    "adminApproval": "approved",
    "itemName": "John Smith - Singer",
    "eventDate": "2025-02-20",
    "vendorApprovalDate": "2025-01-27T11:00:00Z",
    "adminApprovalDate": "2025-01-27T11:30:00Z"
  }
]
```

---

### 4. Get Vendor's Bookings
**Endpoint**: `GET /api/bookings/vendor`

**Headers**:
```javascript
{
  "Authorization": "Bearer <token>"
}
```

**Response (200)**:
```javascript
[
  {
    "id": "booking-uuid",
    "type": "venue",
    "status": "pending",
    "vendorApproval": "pending",
    "adminApproval": "pending",
    "contactName": "John Doe",
    "itemName": "Hilton Hotel",
    "startDate": "2025-02-14"
  }
]
```

---

### 5. Get All Bookings (Admin Only)
**Endpoint**: `GET /api/bookings`

**Headers**:
```javascript
{
  "Authorization": "Bearer <admin-token>"
}
```

**Response (200)**:
```javascript
[
  {
    "id": "booking-1",
    "type": "venue",
    "status": "pending",
    "vendorApproval": "approved",
    "adminApproval": "pending",
    "contactName": "John Doe",
    "itemName": "Hilton Hotel",
    "startDate": "2025-02-14"
  },
  {
    "id": "booking-2",
    "type": "artist",
    "status": "approved",
    "vendorApproval": "approved",
    "adminApproval": "approved",
    "contactName": "Jane Smith",
    "itemName": "Jazz Band",
    "eventDate": "2025-02-20"
  }
]
```

---

## ✅ Approval Endpoints

### 6. Vendor Approval
**Endpoint**: `PUT /api/bookings/:id/vendor-approval`

**Role**: Vendor (must own the venue)

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <vendor-token>"
}
```

**Request Body**:
```javascript
{
  "approved": true  // or false for rejection
}
```

**Response (200) - Approved**:
```javascript
{
  "message": "Booking approval updated",
  "booking": {
    "id": "booking-uuid",
    "vendorApproval": "approved",
    "adminApproval": "pending",
    "status": "pending",  // Still pending until admin approves
    "vendorApprovalDate": "2025-01-27T11:00:00Z"
  }
}
```

**Response (200) - Rejected**:
```javascript
{
  "message": "Booking approval updated",
  "booking": {
    "id": "booking-uuid",
    "vendorApproval": "rejected",
    "adminApproval": "pending",
    "status": "rejected",  // Immediately rejected
    "vendorApprovalDate": "2025-01-27T11:00:00Z"
  }
}
```

**Error (403) - Not Vendor's Booking**:
```javascript
{
  "message": "Forbidden"
}
```

---

### 7. Admin Approval
**Endpoint**: `PUT /api/bookings/:id/admin-approval`

**Role**: Admin

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <admin-token>"
}
```

**Request Body**:
```javascript
{
  "approved": true  // or false for rejection
}
```

**Response (200) - Approved (Both Already Approved)**:
```javascript
{
  "message": "Booking approval updated",
  "booking": {
    "id": "booking-uuid",
    "vendorApproval": "approved",
    "adminApproval": "approved",
    "status": "approved",  // ✓ Confirmed!
    "adminApprovalDate": "2025-01-27T11:30:00Z"
  }
}
```

**Response (200) - Approved (Vendor Still Pending)**:
```javascript
{
  "message": "Booking approval updated",
  "booking": {
    "id": "booking-uuid",
    "vendorApproval": "pending",
    "adminApproval": "approved",
    "status": "pending",  // Waiting for vendor
    "adminApprovalDate": "2025-01-27T11:30:00Z"
  }
}
```

**Response (200) - Rejected**:
```javascript
{
  "message": "Booking approval updated",
  "booking": {
    "id": "booking-uuid",
    "vendorApproval": "approved",
    "adminApproval": "rejected",
    "status": "rejected",  // ✗ Rejected
    "adminApprovalDate": "2025-01-27T11:30:00Z"
  }
}
```

---

## ✏️ Update Booking

### 8. Edit Booking (Customer Only, When Pending)
**Endpoint**: `PUT /api/bookings/:id`

**Role**: Customer (must own the booking)

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <customer-token>"
}
```

**Request Body** (For Venue):
```javascript
{
  "startDate": "2025-02-15",  // Optional
  "endDate": "2025-02-15",    // Optional
  "startTime": "19:00",       // Optional
  "endTime": "23:00",         // Optional
  "numberOfGuests": 150,      // Optional
  "specialRequirements": "Updated requirements"  // Optional
}
```

**Request Body** (For Artist):
```javascript
{
  "eventDate": "2025-02-15",  // Optional
  "eventTime": "21:00",       // Optional
  "numberOfTickets": 10,      // Optional
  "eventType": "Birthday",    // Optional
  "specialRequirements": "Updated requirements"  // Optional
}
```

**Response (200)**:
```javascript
{
  "message": "Booking updated",
  "booking": {
    "id": "booking-uuid",
    "startDate": "2025-02-15",
    "numberOfGuests": 150,
    "specialRequirements": "Updated requirements",
    "status": "pending"  // Remains pending
  }
}
```

**Error (403) - Not Booking Owner**:
```javascript
{
  "message": "Forbidden"
}
```

**Error (400) - Not in Pending Status**:
```javascript
{
  "message": "Cannot edit booking that is not pending"
}
```

---

## ❌ Cancel Booking

### 9. Cancel Booking (Customer)
**Endpoint**: `PUT /api/bookings/:id`

**Headers**:
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <customer-token>"
}
```

**Request Body**:
```javascript
{
  "status": "cancelled"
}
```

**Response (200)**:
```javascript
{
  "message": "Booking updated",
  "booking": {
    "id": "booking-uuid",
    "status": "cancelled"
  }
}
```

---

## 🔍 Get Single Booking

### 10. Get Booking Details
**Endpoint**: `GET /api/bookings/:id`

**Headers**:
```javascript
{
  "Authorization": "Bearer <token>"
}
```

**Response (200)**:
```javascript
{
  "id": "booking-uuid",
  "type": "venue",
  "status": "pending",
  "vendorApproval": "approved",
  "adminApproval": "pending",
  "userId": "customer-uuid",
  "ownerId": "vendor-uuid",
  "itemId": "venue-uuid",
  "itemName": "The Grand Hotel",
  "contactName": "John Doe",
  "contactEmail": "john@example.com",
  "contactPhone": "+977 9800000000",
  "startDate": "2025-02-14",
  "endDate": "2025-02-14",
  "startTime": "18:00",
  "endTime": "22:00",
  "numberOfGuests": 100,
  "specialRequirements": "Need parking",
  "vendorApprovalDate": "2025-01-27T11:00:00Z",
  "adminApprovalDate": null,
  "createdAt": "2025-01-27T10:30:00Z",
  "updatedAt": "2025-01-27T11:00:00Z"
}
```

---

## 📋 Status Code Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Booking updated |
| 201 | Created | New booking created |
| 400 | Bad Request | Missing required fields |
| 403 | Forbidden | Not authorized for this action |
| 404 | Not Found | Booking doesn't exist |
| 500 | Server Error | Database error |

---

## 🧪 cURL Examples

### Create Venue Booking
```bash
curl -X POST http://localhost:5000/api/bookings/venue \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "venueId": "venue-uuid",
    "startDate": "2025-02-14",
    "endDate": "2025-02-14",
    "startTime": "18:00",
    "endTime": "22:00",
    "numberOfGuests": 100
  }'
```

### Vendor Approval
```bash
curl -X PUT http://localhost:5000/api/bookings/booking-uuid/vendor-approval \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VENDOR_TOKEN" \
  -d '{
    "approved": true
  }'
```

### Admin Approval
```bash
curl -X PUT http://localhost:5000/api/bookings/booking-uuid/admin-approval \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "approved": true
  }'
```

### Edit Booking
```bash
curl -X PUT http://localhost:5000/api/bookings/booking-uuid \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -d '{
    "numberOfGuests": 150,
    "specialRequirements": "Updated requirements"
  }'
```

### Cancel Booking
```bash
curl -X PUT http://localhost:5000/api/bookings/booking-uuid \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CUSTOMER_TOKEN" \
  -d '{
    "status": "cancelled"
  }'
```

---

## 🔐 Authentication

All endpoints (except public ones) require:

**Authorization Header**:
```javascript
Authorization: Bearer <jwt_token>
```

**Token Format**: JWT token received from login endpoint
```
GET /api/auth/login
```

---

## 📝 Error Handling

### Common Errors

**Missing Token**:
```javascript
{
  "message": "No token provided"
}
// Status: 401
```

**Invalid Token**:
```javascript
{
  "message": "Invalid token"
}
// Status: 401
```

**Unauthorized Role**:
```javascript
{
  "message": "Forbidden - Admin role required"
}
// Status: 403
```

**Booking Not Found**:
```javascript
{
  "message": "Booking not found"
}
// Status: 404
```

---

## 🔄 Approval Status Transitions

```
VENDOR APPROVAL:
pending → approved (vendor approves)
pending → rejected (vendor rejects)

ADMIN APPROVAL:
pending → approved (admin approves)
pending → rejected (admin rejects)

OVERALL STATUS (Auto-Updated):
pending → approved (BOTH approved)
pending → rejected (EITHER rejected)
pending → cancelled (customer cancels)
```

---

**API Documentation Complete** ✅

Use these endpoints to integrate the booking approval system into your application.
