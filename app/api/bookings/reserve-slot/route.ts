import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ReserveRequest {
  date: string;
  time: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReserveRequest = await request.json();
    const { date, time } = body;

    if (!date || !time) {
      return NextResponse.json(
        { error: 'Date and time required' },
        { status: 400 }
      );
    }

    // Check if slot is already booked (only confirmed bookings block)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: {
          startsWith: date,
        },
        time,
        status: 'confirmed',
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Slot already booked', available: false },
        { status: 409 }
      );
    }

    // Try to create a temporary reservation (10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    try {
      const reserved = await prisma.reservedSlot.create({
        data: {
          date,
          time,
          expiresAt,
        },
      });

      return NextResponse.json({
        success: true,
        reservedSlot: reserved,
        expiresIn: 10 * 60, // seconds
      });
    } catch (e: any) {
      // Unique constraint failed - slot already reserved
      if (e.code === 'P2002') {
        return NextResponse.json(
          { error: 'Slot just got reserved', available: false },
          { status: 409 }
        );
      }
      throw e;
    }
  } catch (error) {
    console.error('Reserve slot error:', error);
    return NextResponse.json(
      { error: 'Failed to reserve slot' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date || !time) {
      return NextResponse.json(
        { error: 'Date and time required' },
        { status: 400 }
      );
    }

    // Delete the reservation
    await prisma.reservedSlot.deleteMany({
      where: {
        date,
        time,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete reservation error:', error);
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
