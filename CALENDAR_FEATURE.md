# Calendar Availability Feature - Implementation Summary

## Overview
Implemented Option 2 (Real-time Blocking) with automatic cleanup to save database space. Users can now see unavailable time slots in real-time, and temporary reservations expire after 10 minutes to keep the database lean.

## Features Implemented

### 1. Real-Time Slot Blocking
- When a user selects a date, the system fetches all booked and temporarily reserved slots
- Booked time slots are displayed in red/grayed out state
- Users cannot click on unavailable slots
- Visual feedback shows which slots are available vs. unavailable

### 2. Temporary Slot Reservation (10 minutes)
- When user selects an available time, the system:
  1. Creates a `ReservedSlot` record with 10-minute expiration
  2. Prevents other users from booking that slot during checkout
  3. Auto-releases the slot if user doesn't complete booking

### 3. Automatic Data Cleanup
- **Cleanup triggers on every availability check** (GET /api/bookings/availability)
- **Expired reservations**: Deleted when expiresAt < now
- **Old bookings**: Completed/Cancelled bookings older than 30 days are deleted
- **Space-efficient**: No external cron jobs or storage services needed

## Database Schema

### ReservedSlot Model
```prisma
model ReservedSlot {
  id        String   @id @default(cuid())
  date      String    // YYYY-MM-DD
  time      String    // HH:MM
  expiresAt DateTime // 10 minutes from creation
  createdAt DateTime @default(now())

  @@unique([date, time])  // Prevents double-booking
  @@index([expiresAt])    // Fast cleanup queries
}
```

## API Endpoints

### 1. GET /api/bookings/availability
**Purpose**: Fetch available time slots for a selected date

**Query Parameters**:
- `date` (required): YYYY-MM-DD format

**Auto-cleanup logic**:
1. Deletes ReservedSlots where expiresAt < now
2. Deletes Bookings where status in ['completed', 'cancelled'] AND createdAt < 30 days ago
3. Returns combined list of booked + reserved times

**Response**:
```json
{
  "date": "2024-01-15",
  "bookedTimes": ["09:00", "10:00", "14:30"]
}
```

**Error**: 400 Bad Request if date parameter missing

### 2. POST /api/bookings/reserve-slot
**Purpose**: Reserve a time slot for 10 minutes during checkout

**Request Body**:
```json
{
  "date": "2024-01-15",
  "time": "11:00"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "reservedSlot": {
    "id": "cuid...",
    "date": "2024-01-15",
    "time": "11:00",
    "expiresAt": "2024-01-15T14:32:45.123Z",
    "createdAt": "2024-01-15T14:22:45.123Z"
  },
  "expiresIn": 600
}
```

**Error** (409 Conflict): Slot already booked or reserved
```json
{
  "error": "Slot already booked" or "Slot just got reserved",
  "available": false
}
```

### 3. DELETE /api/bookings/reserve-slot
**Purpose**: Cancel reservation (user cancels before completing booking)

**Query Parameters**:
- `date` (required): YYYY-MM-DD
- `time` (required): HH:MM

**Response**:
```json
{
  "success": true
}
```

## Frontend Integration

### BookingPage.tsx Updates

**New State**:
```typescript
const [bookedTimes, setBookedTimes] = useState<string[]>([]);
const [reservationId, setReservationId] = useState<string | null>(null);
```

**New Handlers**:

1. **handleDateChange()**
   - Called when user selects a date in Calendar
   - Fetches availability for that date
   - Populates bookedTimes state
   - Clears selected time when date changes

2. **handleTimeSelect()**
   - Called when user clicks a time slot
   - Validates slot is not in bookedTimes
   - Calls POST /api/bookings/reserve-slot
   - Handles 409 conflicts by refreshing availability
   - Sets reservationId on success

**UI Changes**:

Calendar component:
```typescript
<Calendar
  mode="single"
  selected={bookingData.date}
  onSelect={handleDateChange}  // Now calls the handler instead of setState
  disabled={(date) => date < new Date() || date.getDay() === 0}
  className="rounded-md border"
/>
```

Time slots buttons:
```typescript
{timeSlots.map((time) => {
  const isBooked = bookedTimes.includes(time);
  return (
    <button
      onClick={() => !isBooked && handleTimeSelect(time)}
      disabled={isBooked || loading}
      className={`
        ${isBooked 
          ? "border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-50"
          : bookingData.time === time
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
        }
      `}
    >
      {time}
    </button>
  );
})}
```

## User Experience Flow

### Scenario: User Books an Appointment
1. **User selects date** → handleDateChange() fires
   - API fetches all booked times + reserved slots
   - Unavailable slots turn red/grayed out
   - Available slots are clickable

2. **User clicks available time** → handleTimeSelect() fires
   - System creates 10-minute reservation lock
   - Time slot is now locked for other users
   - User can proceed to enter contact details

3. **User completes booking** → handleSubmit() fires
   - Creates actual Booking record (status: confirmed)
   - ReservedSlot is still in database (not auto-deleted)
   - User sees confirmation page

4. **After 30 days** → Automatic cleanup
   - If booking is marked completed/cancelled
   - Booking record gets deleted by cleanup job
   - Space is freed in database

### Scenario: User Abandons Booking
1. User selects time → 10-minute lock created
2. User navigates away / closes browser
3. **10 minutes pass** → Lock expires (ReservedSlot.expiresAt < now)
4. **Next user checks availability** → Cleanup job runs
   - Expired ReservedSlot is deleted
   - Time slot becomes available again
   - Space is freed in database

## Data Space Savings

### Database Footprint
- **ReservedSlot**: ~400 bytes per entry (max 10 minutes)
- **Booking**: ~500 bytes per entry (kept only while active, deleted after 30 days)
- **Expected max DB size**: Small (< 1MB for years of data)

### Cleanup Schedule
- **Every availability check**: Clean expired reservations
- **Every 24+ hours**: Clean bookings older than 30 days (when someone checks availability)
- **Manual**: Can run manually via API call if needed

## No External Dependencies
✅ No Firebase needed
✅ No cron job service needed
✅ No storage buckets needed
✅ Pure SQLite + Prisma solution
✅ Automatic cleanup on every usage

## Testing Checklist

- [ ] Select date → availability fetches correctly
- [ ] Booked slots show as unavailable (red/grayed)
- [ ] Click available slot → reservation created (no errors)
- [ ] Click booked slot → disabled, shows error
- [ ] Switch dates → bookedTimes updates
- [ ] Complete booking after slot reserved
- [ ] Wait 10+ minutes, check availability → slot available again
- [ ] Check database → no expired ReservedSlot records
- [ ] Check database → old bookings deleted after 30 days

## Files Modified

1. **prisma/schema.prisma**
   - Added ReservedSlot model with unique constraint and expiresAt index

2. **app/api/bookings/availability/route.ts**
   - GET endpoint with cleanupOldData() function

3. **app/api/bookings/reserve-slot/route.ts**
   - POST to reserve slot (create ReservedSlot)
   - DELETE to cancel reservation

4. **src/components/BookingPage.tsx**
   - Added bookedTimes state
   - Added reservationId state
   - Implemented handleDateChange() handler
   - Implemented handleTimeSelect() handler
   - Updated Calendar onSelect to use handleDateChange
   - Updated time slots UI with disabled state and handleTimeSelect
   - Added error display for unavailable slots

## Performance Considerations

- **Availability check**: O(n) where n = number of slots for that day (fast)
- **Cleanup overhead**: Minimal, only runs on availability check
- **Database indexes**: expiresAt index ensures fast cleanup queries
- **Unique constraint**: Prevents race conditions in slot booking

## Future Enhancements

1. Add SMS reminders (before appointment)
2. Show countdown timer (reservation expires in X minutes)
3. Admin ability to see active reservations
4. Email notification when slot expires
5. Auto-retry availability check if slot becomes available
6. Overbooking prevention (multiple users booking same slot simultaneously)
