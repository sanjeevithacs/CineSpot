import Link from "next/link";
import Image from "next/image";
import { movies, shows, theatres } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type MoviesPageProps = {
  searchParams: {
    city?: string;
  };
};

export default function MoviesPage({ searchParams }: MoviesPageProps) {
  const { city } = searchParams;

  if (!city) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No city selected</h1>
        <p className="text-muted-foreground">
          Please select a city to see available movies.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to City Selection
          </Link>
        </Button>
      </div>
    );
  }

  const cityTheatres = theatres.filter(
    (theatre) => theatre.name.toLowerCase().includes(city.toLowerCase()) || 
                 theatres.find(t => t.id === theatre.id && t.cityId === 1 && city.toLowerCase() === 'coimbatore') ||
                 theatres.find(t => t.id === theatre.id && t.cityId === 2 && city.toLowerCase() === 'chennai')
  );
  
  const cityTheatreIds = cityTheatres.map(t => t.id);

  const cityShows = shows.filter(show => cityTheatreIds.includes(show.theatreId));
  const cityMovieIds = [...new Set(cityShows.map(show => show.movieId))];
  const cityMovies = movies.filter(movie => cityMovieIds.includes(movie.id));

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-headline font-bold">
          Now Showing in <span className="text-primary">{city}</span>
        </h1>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change City
          </Link>
        </Button>
      </div>

      {cityMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cityMovies.map((movie) => {
            const poster = PlaceHolderImages.find(p => p.id === movie.posterId);
            return (
              <Card key={movie.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/movies/${movie.id}?city=${city}`}>
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={poster?.imageUrl || `https://picsum.photos/seed/${movie.id}/400/600`}
                      alt={`Poster for ${movie.title}`}
                      fill
                      className="object-cover"
                      data-ai-hint={poster?.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg truncate">{movie.title}</CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No movies available for this city at the moment.</p>
        </div>
      )}
    </div>
  );
}
