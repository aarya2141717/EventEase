# Booking Approval System - Quick Reference

## 🎯 System Flow at a Glance

```
Customer Books → Booking Created (PENDING) → Vendor Reviews → Admin Reviews → APPROVED ✓
                                                    ↓              ↓
                                                  REJECT        REJECT
                                                    ↓              ↓
                                                  REJECTED ✗   REJECTED ✗
```

## 📋 Booking Statuses

| Status | Meaning | Who Sets | Action Available |
|--------|---------|---------|------------------|
| **PENDING** | Waiting for approvals | System (automatic) | Edit, Cancel, Wait for approval |
| **APPROVED** | ✓ Vendor & Admin both approved | System (auto when both approve) | View, Cancel |
| **REJECTED** | ✗ Either vendor or admin rejected | System (auto on any rejection) | None (booking over) |
| **CANCELLED** | User cancelled before approval | User or customer | None (cancelled) |

## 🔑 Approval Status Tracking

### For Each Booking:
```
vendorApproval: [PENDING] → APPROVED ✓ or REJECTED ✗
adminApproval:  [PENDING] → APPROVED ✓ or REJECTED ✗
status:         [PENDING] → APPROVED ✓ or REJECTED ✗
```

### Color Coding in UI:
- 🟢 **Green** = APPROVED
- 🔴 **Red** = REJECTED  
- 🟡 **Yellow** = PENDING

## 👥 User Actions by Role

### 👤 CUSTOMER
**Dashboard**: User Dashboard
- **View** all their bookings
- **See** approval status (vendor badge + admin badge)
- **Edit** booking details (only when PENDING)
- **Cancel** booking (anytime)

**Actions**:
- ✏️ Edit (when pending)
- ❌ Cancel (anytime)

---

### 🏢 VENDOR
**Dashboard**: Vendor Dashboard  
- **See** "Pending Booking Requests for Your Approval"
- **Review** booking details from customers

**Actions**:
- ✓ Approve (sets vendorApproval = APPROVED)
- ✗ Reject (sets vendorApproval = REJECTED)

---

### 👨‍💼 ADMIN
**Dashboard**: Admin Dashboard
- **See** "Pending Bookings for Approval"  
- **Review** all bookings pending approval
- **Check** vendor approval status

**Actions**:
- ✓ Approve (sets adminApproval = APPROVED)
- ✗ Reject (sets adminApproval = REJECTED)

## 🔄 Approval Logic

```javascript
IF (vendorApproval === "approved" AND adminApproval === "approved") {
  status = "approved"  // ✓ Booking confirmed!
}

IF (vendorApproval === "rejected" OR adminApproval === "rejected") {
  status = "rejected"  // ✗ Booking rejected
}

ELSE {
  status = "pending"   // ⏳ Waiting for approvals
}
```

## 📱 Dashboard Sections

### User Dashboard
```
My Bookings Section:
├─ Booking Card
│  ├─ Item Name
│  ├─ Type (VENUE/ARTIST)
│  ├─ Date
│  ├─ Overall Status Badge
│  ├─ Approval Status Display
│  │  ├─ Vendor: [pending/approved/rejected]
│  │  └─ Admin: [pending/approved/rejected]
│  └─ Actions
│     ├─ Edit (if pending)
│     └─ Cancel (if pending)
```

### Vendor Dashboard
```
Pending Booking Requests Table:
├─ Booking ID
├─ Customer Name
├─ Venue Name
├─ Date
├─ Vendor Status (PENDING/APPROVED/REJECTED)
├─ Admin Status (PENDING/APPROVED/REJECTED)
└─ Actions
   ├─ ✓ Approve Button
   └─ ✗ Reject Button
```

### Admin Dashboard
```
Pending Bookings for Approval Table:
├─ Booking ID
├─ Customer Name
├─ Item Name
├─ Date
├─ Type
├─ Vendor Status (PENDING/APPROVED/REJECTED)
├─ Admin Status (PENDING/APPROVED/REJECTED)
└─ Actions
   ├─ ✓ Approve Button
   └─ ✗ Reject Button
```

## 🔌 API Endpoints

### For Vendors
```
PUT /api/bookings/:id/vendor-approval
Body: { approved: true/false }
Role: vendor
```

### For Admins
```
PUT /api/bookings/:id/admin-approval
Body: { approved: true/false }
Role: admin
```

### For Customers
```
PUT /api/bookings/:id
Body: { startDate, endDate, numberOfGuests, ... }
(Edit only when status = "pending")

PUT /api/bookings/:id
Body: { status: "cancelled" }
(Cancel anytime)
```

## ✨ Key Features

| Feature | Details |
|---------|---------|
| **Two-tier Approval** | Both vendor AND admin must approve |
| **Edit Pending** | Modify booking while waiting for approvals |
| **Real-time Status** | See approval progress in dashboard |
| **Color Badges** | Visual feedback (green/red/yellow) |
| **Anytime Cancel** | Cancel booking at any stage |
| **Audit Trail** | Approval dates tracked |
| **Smart Status** | Auto-updates based on approval votes |

## 🚀 Testing Scenarios

### ✅ Scenario 1: Happy Path
1. Customer books → sees "Booking Request Submitted"
2. Vendor approves → customer sees vendor badge turn green
3. Admin approves → customer sees overall status = "APPROVED" ✓

### ✅ Scenario 2: Vendor Rejects
1. Customer books
2. Vendor rejects → booking status = "REJECTED" ✗
3. Customer sees rejection

### ✅ Scenario 3: Admin Rejects
1. Customer books  
2. Vendor approves → still pending (admin not approved yet)
3. Admin rejects → booking status = "REJECTED" ✗

### ✅ Scenario 4: Edit Before Approval
1. Customer books (status = pending)
2. Click Edit → modify dates/guests/requirements
3. Save changes → booking updated while waiting for approvals

### ✅ Scenario 5: Cancel Anytime
1. Customer books
2. At any point, click Cancel
3. Status = "CANCELLED" ✗

## 📊 Status Matrix

```
Vendor\Admin | PENDING | APPROVED | REJECTED
-------------|---------|----------|----------
PENDING      | PENDING | PENDING  | REJECTED
APPROVED     | PENDING | APPROVED | REJECTED
REJECTED     | REJECTED| REJECTED | REJECTED
```

## ⚡ Quick Reference

**Who can approve?**
- Vendor: Only vendor who owns the venue/artist
- Admin: Any admin user

**Who can edit?**
- Only the customer who made the booking
- Only when status = "pending"

**Who can cancel?**
- The customer who made the booking
- Anytime (at any approval stage)

**What happens on rejection?**
- Booking status = "rejected"
- Customer sees rejection in dashboard
- Cannot be edited or confirmed again

**What happens on both approval?**
- Booking status = "approved"
- Customer sees ✓ "Approved" indicator
- Booking is confirmed

## 📍 Where to Find Things

| Task | Where | How |
|------|-------|-----|
| View my bookings | User Dashboard | Home → Dashboard |
| Edit pending booking | User Dashboard | Click "Edit" button |
| Approve bookings | Vendor Dashboard | "Pending Booking Requests" section |
| Review approvals | Admin Dashboard | "Pending Bookings for Approval" section |
| Check approval status | User Dashboard | Look at Vendor & Admin badges |
| Cancel booking | User Dashboard | Click "Cancel" button |

---

**System**: EventEase Booking Approval System v1.0
**Deployment Ready**: ✅ All features implemented and tested
