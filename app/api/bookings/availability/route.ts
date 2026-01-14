import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Clean up expired reservations and old bookings
async function cleanupOldData() {
  const now = new Date();
  
  // Delete expired temporary reservations
  await prisma.reservedSlot.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });
  
  // Delete completed/cancelled bookings older than 30 days
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  await prisma.booking.deleteMany({
    where: {
      status: {
        in: ['completed', 'cancelled'],
      },
      createdAt: {
        lt: thirtyDaysAgo,
      },
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Clean up old data
    await cleanupOldData();

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
    }

    // Get all booked times for this date (only confirmed bookings block slots)
    // The date is stored as ISO string, so we need to check if it starts with the date string
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          startsWith: date,
        },
        status: 'confirmed',
      },
      select: {
        time: true,
      },
    });

    // Return only confirmed bookings (not temporary reservations)
    // This prevents orphaned ReservedSlots from blocking users
    const bookedTimes = new Set<string>();
    bookings.forEach((b) => bookedTimes.add(b.time));

    return NextResponse.json({
      date,
      bookedTimes: Array.from(bookedTimes),
    });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
