import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import { Card } from '@/components/ui/card';
import { Clock, MapPin, IndianRupee, Bus } from 'lucide-react';

interface BusResult {
  bus_number: string;
  route_name: string;
  fare: number;
  eta: string;
}

const Home = () => {
  const [searchResults, setSearchResults] = useState<BusResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (from: string, to: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API later
      // const response = await fetch(`/api/search?from=${from}&to=${to}`);
      // const results = await response.json();
      
      // Mock results for now
      const mockResults: BusResult[] = [
        { bus_number: 'MH-12-AB-1234', route_name: 'Route 1A', fare: 15, eta: '5 mins' },
        { bus_number: 'MH-12-CD-5678', route_name: 'Route 2B', fare: 18, eta: '12 mins' },
        { bus_number: 'MH-12-EF-9012', route_name: 'Route 3C', fare: 20, eta: '18 mins' },
      ];
      
      setTimeout(() => {
        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Search failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            PMPML Bus Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track buses in real-time and book your journey across Pune with ease
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center bg-surface shadow-card">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </Card>
          </div>
        )}

        {searchResults.length > 0 && !isLoading && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Buses</h2>
            <div className="grid gap-4">
              {searchResults.map((bus, index) => (
                <Card key={index} className="p-6 bg-surface shadow-card hover:shadow-card-hover transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Bus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{bus.bus_number}</h3>
                        <p className="text-sm text-muted-foreground">{bus.route_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{bus.eta}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">₹{bus.fare}</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-surface shadow-card">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Bus Routes</div>
          </Card>
          <Card className="p-6 text-center bg-surface shadow-card">
            <div className="text-3xl font-bold text-primary mb-2">2000+</div>
            <div className="text-muted-foreground">Bus Stops</div>
          </Card>
          <Card className="p-6 text-center bg-surface shadow-card">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Daily Passengers</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;