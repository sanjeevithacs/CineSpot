"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Show, Movie, Theatre, Booking } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Armchair, Screen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 12;

interface SeatSelectionProps {
  show: Show;
  movie: Movie;
  theatre: Theatre;
}

export default function SeatSelection({ show, movie, theatre }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useLocalStorage<string[]>(`bookedSeats-${show.id}`, []);
  const [userBookings, setUserBookings] = useLocalStorage<Booking[]>("userBookings", []);

  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * show.price;

  const handleBooking = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "You must be logged in to book tickets.",
      });
      router.push("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      toast({
        variant: "destructive",
        title: "No seats selected",
        description: "Please select at least one seat.",
      });
      return;
    }
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      showId: show.id,
      userId: user.id,
      seats: selectedSeats,
      totalAmount: totalPrice,
      bookingTime: new Date().toISOString(),
    };

    // Update booked seats for this show
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    
    // Add to user's personal bookings
    setUserBookings([...userBookings, newBooking]);

    toast({
      title: "Booking Successful!",
      description: "Your tickets have been confirmed.",
    });

    router.push(`/confirmation/${newBooking.id}`);
  };

  const seatGrid = useMemo(() => {
    return SEAT_ROWS.map((row) => (
      <div key={row} className="flex items-center justify-center gap-2">
        <div className="w-4 text-sm text-muted-foreground">{row}</div>
        {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
          const seatNumber = i + 1;
          const seatId = `${row}${seatNumber}`;
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={isBooked}
              aria-label={`Seat ${seatId}`}
              className={cn(
                "transition-colors",
                isBooked && "text-muted-foreground/50 cursor-not-allowed",
                isSelected && "text-primary",
                !isBooked && !isSelected && "text-muted-foreground hover:text-accent"
              )}
            >
              <Armchair className="h-6 w-6" />
            </button>
          );
        })}
      </div>
    ));
  }, [bookedSeats, selectedSeats]);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline tracking-widest text-muted-foreground">SCREEN</CardTitle>
            <div className="w-full h-1 bg-foreground/80 rounded-full mx-auto max-w-sm" />
          </CardHeader>
          <CardContent className="space-y-2 p-4 md:p-8">
            {seatGrid}
          </CardContent>
           <CardFooter className="flex justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2"><Armchair className="h-5 w-5"/> Available</div>
              <div className="flex items-center gap-2"><Armchair className="h-5 w-5 text-primary"/> Selected</div>
              <div className="flex items-center gap-2"><Armchair className="h-5 w-5 text-muted-foreground/50"/> Booked</div>
            </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Seats</p>
              <p className="font-bold text-lg text-primary truncate">
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None selected"}
              </p>
            </div>
             <div>
              <p className="text-sm font-semibold text-muted-foreground">Total Price</p>
              <p className="font-bold text-lg">
                ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              size="lg"
            >
              Confirm & Pay ₹{totalPrice.toFixed(2)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
