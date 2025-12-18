"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { movies, shows, theatres } from "@/lib/data";
import type { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Film, MapPin, Clock, Armchair, IndianRupee } from "lucide-react";

type ConfirmationPageProps = {
  params: { bookingId: string };
};

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const [allBookings] = useLocalStorage<Booking[]>("userBookings", []);
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const foundBooking = allBookings.find(b => b.id === params.bookingId);
    setBooking(foundBooking || null);
  }, [allBookings, params.bookingId]);

  if (booking === undefined) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading booking details...</p>
      </div>
    );
  }
  
  if (booking === null) {
    notFound();
  }
  
  const show = shows.find((s) => s.id === booking.showId);
  const movie = movies.find((m) => m.id === show?.movieId);
  const theatre = theatres.find((t) => t.id === show?.theatreId);

  if (!show || !movie || !theatre) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <Card className="shadow-xl">
        <CardHeader className="text-center bg-accent/10">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="font-headline text-3xl">Booking Confirmed!</CardTitle>
          <CardDescription>Your tickets for {movie.title} are booked.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold font-headline text-xl">Reservation Details</h3>
            <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center gap-3">
                <Film className="h-5 w-5 text-primary" />
                <span className="font-semibold">{movie.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{theatre.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>{new Date(booking.bookingTime).toLocaleDateString()} at {show.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <Armchair className="h-5 w-5 text-primary" />
                <span className="font-bold">{booking.seats.join(", ")}</span>
              </div>
               <div className="flex items-center gap-3">
                <IndianRupee className="h-5 w-5 text-primary" />
                <span>Total Amount: <span className="font-bold">₹{booking.totalAmount.toFixed(2)}</span></span>
              </div>
            </div>
          </div>
           <div className="text-center text-sm text-muted-foreground">
            Booking ID: {booking.id}
          </div>
          <Button asChild className="w-full">
            <Link href="/">Book Another Ticket</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
