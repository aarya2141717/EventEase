# EventEase Booking Approval System - Implementation Guide

## Overview
A comprehensive two-level booking approval system has been implemented for EventEase. This system requires approval from both the **Vendor/Artist Manager** and **Admin** before a booking is confirmed. Users can also edit their pending bookings and track approval status in real-time.

---

## What Was Changed

### 1. **Backend Models** (`backend/models/Booking.js`)

#### Added New Fields:
- `vendorApproval` (ENUM): "pending" | "approved" | "rejected" - Tracks vendor's approval status
- `adminApproval` (ENUM): "pending" | "approved" | "rejected" - Tracks admin's approval status
- `vendorApprovalDate` (DATE): Timestamp of vendor's approval/rejection
- `adminApprovalDate` (DATE): Timestamp of admin's approval/rejection

#### Updated Status Field:
- Old: `status` = "pending" | "confirmed" | "cancelled"
- New: `status` = "pending" | "approved" | "rejected" | "cancelled"

**Note**: The database will automatically update on server restart with `sequelize.sync({ alter: true })`

---

### 2. **Backend Routes** (`backend/routes/bookings.js`)

#### New Endpoints Added:

**✅ Vendor Approval Endpoint**
```
PUT /api/bookings/:id/vendor-approval
```
- **Role Required**: Vendor (authenticate + requireRole("vendor"))
- **Body**: `{ approved: true/false }`
- **Logic**: 
  - Only the vendor who owns the venue can approve
  - Updates `vendorApproval` status
  - Auto-sets `status = "approved"` if both vendor AND admin approve
  - Auto-sets `status = "rejected"` if either rejects

**✅ Admin Approval Endpoint**
```
PUT /api/bookings/:id/admin-approval
```
- **Role Required**: Admin (authenticate + requireRole("admin"))
- **Body**: `{ approved: true/false }`
- **Logic**: 
  - Admin can approve any booking
  - Updates `adminApproval` status
  - Auto-sets `status = "approved"` if both vendor AND admin approve
  - Auto-sets `status = "rejected"` if either rejects

#### Updated Endpoints:

**PUT /api/bookings/:id**
- Customers can now only edit booking details when `status = "pending"`
- Cannot edit if already approved/rejected
- Still supports cancellation at any time

---

### 3. **Frontend - User Dashboard** (`frontend/src/pages/UserDashboard.jsx`)

#### Enhanced Features:

**Booking Status Display**
- Shows overall booking status: **PENDING** | **APPROVED** | **REJECTED** | **CANCELLED**
- Displays separate approval badges for:
  - **Vendor Status** (green if approved, red if rejected, yellow if pending)
  - **Admin Status** (green if approved, red if rejected, yellow if pending)

**Edit Functionality**
- Users can edit booking details only when status is **PENDING**
- Editable fields:
  - Start/End dates
  - Start/End times
  - Number of guests/tickets
  - Event type
  - Special requirements
  - Contact phone

**Booking Actions**
- **Edit** button (visible when pending)
- **Cancel** button (visible when pending)
- **Approval Status** badges (always visible)

**Updated Stats**
- Now shows count of pending bookings

---

### 4. **Frontend - Admin Dashboard** (`frontend/src/pages/AdminDashboard.jsx`)

#### New Section: "Pending Bookings for Approval"

**Features**
- Displays only bookings with `adminApproval = "pending"`
- Shows detailed table with columns:
  - Booking ID
  - Customer name
  - Item (venue/artist name)
  - Date
  - Type (venue/artist)
  - Vendor approval status (colored badge)
  - Admin approval status (colored badge)
  - Action buttons

**Admin Actions**
- **✓ Approve Button** (green) - Sets `adminApproval = "approved"`
- **✗ Reject Button** (red) - Sets `adminApproval = "rejected"`

**Auto-Update Logic**
- When admin approves and vendor already approved → `status = "approved"` (user sees ✓ in dashboard)
- When admin rejects → `status = "rejected"` (user sees rejection)

---

### 5. **Frontend - Vendor Dashboard** (`frontend/src/pages/VendorDashboard.jsx`)

#### New Section: "Pending Booking Requests for Your Approval"

**Features**
- Displays only bookings with `vendorApproval = "pending"`
- Shows detailed table with columns:
  - Booking ID
  - Customer name
  - Venue name
  - Date
  - Vendor approval status
  - Admin approval status (colored badge)
  - Action buttons

**Vendor Actions**
- **✓ Approve Button** (green) - Sets `vendorApproval = "approved"`
- **✗ Reject Button** (red) - Sets `vendorApproval = "rejected"`

**Updated Stats Widget**
- Changed "Confirmed" count to "Approved" count
- Tracks vendor-level approvals

---

### 6. **Frontend - Booking Confirmation Pages**

#### VenueBooking.jsx
- Updated success modal to show:
  - "Booking Request Submitted!" (instead of "Booking Confirmed!")
  - Information box explaining approval workflow
  - Message: "Your booking needs approval from both the venue owner and our admin team"

#### ArtistBooking.jsx
- Updated success modal to show:
  - "Booking Request Submitted!" (instead of "Booking Confirmed!")
  - Information box explaining approval workflow
  - Message: "Your booking needs approval from both the artist's manager and our admin team"

---

## Booking Approval Workflow

### Step 1: User Books a Venue/Artist
```
User submits booking form
        ↓
Booking created with:
- status = "pending"
- vendorApproval = "pending"
- adminApproval = "pending"
        ↓
Success modal shown with approval workflow info
```

### Step 2: Vendor Reviews
```
Vendor goes to Vendor Dashboard
        ↓
Sees booking in "Pending Booking Requests for Your Approval"
        ↓
Approves or Rejects
        ↓
If Approved:
  - vendorApproval = "approved"
  - (status stays "pending" - waiting for admin)
        ↓
If Rejected:
  - vendorApproval = "rejected"
  - status = "rejected" (booking rejected)
```

### Step 3: Admin Reviews
```
Admin goes to Admin Dashboard
        ↓
Sees booking in "Pending Bookings for Approval"
        ↓
Approves or Rejects
        ↓
If Approved & Vendor already Approved:
  - adminApproval = "approved"
  - status = "approved" ✓
  - User sees "Approved" badge in dashboard
        ↓
If Rejected:
  - adminApproval = "rejected"
  - status = "rejected"
```

### Step 4: User Tracking
```
User goes to User Dashboard
        ↓
Sees booking with status badges:
- Vendor: [Pending/Approved/Rejected]
- Admin: [Pending/Approved/Rejected]
        ↓
Once BOTH approve:
- Overall status = "APPROVED" ✓
- User sees green "Approved" indicator
        ↓
If either rejects:
- Overall status = "REJECTED" ✗
        ↓
While pending, user can:
- Edit booking details
- Cancel booking
```

---

## Key Features

### ✅ Two-Level Approval
- Vendor/Artist Manager must approve
- Admin must approve
- Both approvals required for confirmation

### 📝 Edit Capability
- Users can edit pending bookings
- All booking details can be modified:
  - Dates/times
  - Number of guests/tickets
  - Event type
  - Special requirements
  - Contact information
- Once approved, editing is locked

### 📊 Real-Time Status Tracking
- Users see current approval status
- Separate badges for vendor and admin
- Color-coded (green=approved, red=rejected, yellow=pending)

### 📲 Unified Dashboard View
- All bookings visible across admin, vendor, and user dashboards
- Filtered views to show only relevant bookings
- Quick action buttons for approvals/rejections

### 🔄 Smart Status Logic
- Booking status automatically updates based on approval votes
- If either vendor or admin rejects → booking is rejected
- If both approve → booking is approved
- Otherwise → stays pending

---

## Database Schema Changes

### Booking Table - New Columns
```sql
-- Approval tracking fields
vendorApproval ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
adminApproval ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
vendorApprovalDate DATETIME NULL
adminApprovalDate DATETIME NULL

-- Updated status field
status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending'
```

**Migration**: Automatic via `sequelize.sync({ alter: true })`

---

## Testing Checklist

### ✓ Test Case 1: Happy Path (Both Approve)
1. Create user account
2. Book a venue/artist
3. See "Booking Request Submitted" modal
4. Vendor approves in Vendor Dashboard
5. Admin approves in Admin Dashboard
6. User sees "APPROVED" status with both badges green ✓

### ✓ Test Case 2: Vendor Rejects
1. Create booking
2. Vendor goes to Vendor Dashboard → Rejects
3. User should see status = "REJECTED" ✓

### ✓ Test Case 3: Admin Rejects
1. Create booking
2. Vendor approves
3. Admin rejects
4. User should see status = "REJECTED" ✓

### ✓ Test Case 4: Edit Pending Booking
1. Create booking (status = pending)
2. Click Edit button
3. Modify dates/guests/requirements
4. Save changes
5. Booking updated successfully ✓

### ✓ Test Case 5: Cannot Edit Approved Booking
1. Book and get both approvals
2. Try to edit (Edit button should not be visible)
3. Only Cancel and approval badges visible ✓

### ✓ Test Case 6: Cancel Anytime
1. Create booking at any stage
2. Click Cancel button
3. Confirm cancellation
4. Status = "CANCELLED" ✓

---

## API Endpoint Reference

### Create Booking
```
POST /api/bookings/venue
POST /api/bookings/artist
```

### Get Bookings
```
GET /api/bookings/me              (user's bookings)
GET /api/bookings/vendor          (vendor's bookings)
GET /api/bookings                 (all bookings - admin only)
```

### Update Booking Details
```
PUT /api/bookings/:id
Body: { startDate, endDate, numberOfGuests, etc. }
```

### Vendor Approval
```
PUT /api/bookings/:id/vendor-approval
Body: { approved: true/false }
Headers: Authorization required, vendorApproval role required
```

### Admin Approval
```
PUT /api/bookings/:id/admin-approval
Body: { approved: true/false }
Headers: Authorization required, admin role required
```

---

## Git Commit Message

```
feat: implement two-level booking approval system

- Add vendor and admin approval fields to Booking model
- Create /vendor-approval and /admin-approval endpoints
- Update UserDashboard with approval status display and edit functionality
- Update AdminDashboard with pending bookings approval interface
- Update VendorDashboard with booking approval requests
- Enhance booking confirmation modals with approval workflow info
- Implement smart status logic (approved only when both approve)
- Add edit capability for pending bookings
- Color-coded approval status badges (green/red/yellow)
- Automatic database migration via sequelize.sync

This implements a complete two-tier approval system where both vendor
and admin must approve bookings before confirmation. Users can track
real-time approval status and edit bookings while pending.
```

---

## What User Should Expect

### 👤 As a Customer:
1. Book a venue/artist → See confirmation modal with approval workflow
2. Get notified about vendor approval
3. Track approval status in dashboard (vendor + admin badges)
4. Edit booking details if still pending
5. Once both approve → See green "Approved" checkmark
6. Can cancel anytime

### 🏢 As a Vendor:
1. See "Pending Booking Requests for Your Approval" section in dashboard
2. Review customer booking details
3. Click "Approve" or "Reject" button
4. See immediate status update
5. Track which bookings are awaiting admin approval

### 👨‍💼 As an Admin:
1. See "Pending Bookings for Approval" section in dashboard
2. Review all pending bookings
3. Check vendor approval status
4. Click "Approve" or "Reject" button
5. Booking auto-confirms when both vendor and admin approve
6. See complete approval audit trail (dates + statuses)

---

## Important Notes

⚠️ **Database Sync**: The server automatically syncs new fields on startup with `sequelize.sync({ alter: true })`

⚠️ **No Data Loss**: All existing bookings will get default values:
- `vendorApproval = "pending"`
- `adminApproval = "pending"`
- `status` updated to match new schema

✅ **Backward Compatible**: All existing endpoints still work, just with enhanced functionality

✅ **Real-Time**: Use dashboard refresh (Ctrl+R / Cmd+R) to see latest approval statuses

---

## Summary of Files Modified

1. ✅ `backend/models/Booking.js` - Added approval fields
2. ✅ `backend/routes/bookings.js` - Added approval endpoints
3. ✅ `frontend/src/pages/UserDashboard.jsx` - Enhanced with approval display & edit
4. ✅ `frontend/src/pages/AdminDashboard.jsx` - Added admin approval interface
5. ✅ `frontend/src/pages/VendorDashboard.jsx` - Added vendor approval interface
6. ✅ `frontend/src/pages/VenueBooking.jsx` - Updated success modal
7. ✅ `frontend/src/pages/ArtistBooking.jsx` - Updated success modal

---

**Total Changes**: 7 files modified | 2 new API endpoints | 3 new dashboard sections | Full two-tier approval system implemented ✅
