import Image from "next/image";
import Link from "next/link";
import { movies, shows, theatres, cities } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock } from "lucide-react";

type MovieDetailPageProps = {
  params: { id: string };
  searchParams: { city?: string };
};

export default function MovieDetailPage({ params, searchParams }: MovieDetailPageProps) {
  const { id } = params;
  const { city: cityName } = searchParams;
  
  const movie = movies.find((m) => m.id === id);
  const poster = PlaceHolderImages.find((p) => p.id === movie?.posterId);
  const city = cities.find(c => c.name === cityName);

  if (!movie || !cityName || !city) {
    notFound();
  }

  const cityTheatres = theatres.filter(t => t.cityId === city.id);
  const cityTheatreIds = cityTheatres.map(t => t.id);

  const showsForMovieInCity = shows.filter(
    (s) => s.movieId === movie.id && cityTheatreIds.includes(s.theatreId)
  );

  const theatresWithShows = cityTheatres
    .map(theatre => ({
      ...theatre,
      shows: showsForMovieInCity.filter(show => show.theatreId === theatre.id),
    }))
    .filter(theatre => theatre.shows.length > 0);

  return (
    <div className="animate-in fade-in duration-500">
      <Button variant="outline" asChild className="mb-6">
        <Link href={`/movies?city=${cityName}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Movies
        </Link>
      </Button>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="overflow-hidden sticky top-24">
            <div className="aspect-[2/3] relative">
              <Image
                src={poster?.imageUrl || `https://picsum.photos/seed/${movie.id}/400/600`}
                alt={`Poster for ${movie.title}`}
                fill
                className="object-cover"
                data-ai-hint={poster?.imageHint}
              />
            </div>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="font-headline text-5xl font-bold">{movie.title}</h1>
            <p className="text-lg text-muted-foreground mt-4">{movie.description}</p>
          </div>

          <div>
            <h2 className="font-headline text-3xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-7 w-7 text-primary" /> Theatres in {cityName}
            </h2>
            <div className="space-y-6">
              {theatresWithShows.length > 0 ? (
                theatresWithShows.map((theatre) => (
                  <Card key={theatre.id} className="shadow-md">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">{theatre.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Showtimes</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {theatre.shows.map((show) => (
                          <Button asChild key={show.id} variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                            <Link href={`/booking/${show.id}?city=${cityName}`}>
                              {show.time}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No shows available for this movie in {cityName} today.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
