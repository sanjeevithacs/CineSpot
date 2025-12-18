import { notFound } from "next/navigation";
import { movies, shows, theatres } from "@/lib/data";
import SeatSelection from "@/components/booking/SeatSelection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, MapPin, Clock } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type BookingPageProps = {
  params: { showId: string };
  searchParams: { city?: string };
};

export default function BookingPage({ params, searchParams }: BookingPageProps) {
  const { showId } = params;
  const { city } = searchParams;
  
  const show = shows.find((s) => s.id === showId);

  if (!show) {
    notFound();
  }

  const movie = movies.find((m) => m.id === show.movieId);
  const theatre = theatres.find((t) => t.id === show.theatreId);

  if (!movie || !theatre) {
    notFound();
  }

  return (
    <div className="animate-in fade-in duration-500">
      <Button variant="outline" asChild className="mb-6">
        <Link href={`/movies/${movie.id}?city=${city}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Movie
        </Link>
      </Button>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{movie.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{theatre.name}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{show.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-bold text-primary">₹{show.price}</span>
            <span>per seat</span>
          </div>
        </CardContent>
      </Card>

      <SeatSelection show={show} movie={movie} theatre={theatre} />
    </div>
  );
}
