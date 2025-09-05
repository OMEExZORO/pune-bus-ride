import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bus, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Stop {
  id: string;
  name: string;
}

interface Route {
  route_id: string;
  route_name: string;
  stops: Stop[];
}

const Routes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call later
  const mockRoutes: Route[] = [
    {
      route_id: '1',
      route_name: 'Route 1A - Pune Station to Katraj',
      stops: [
        { id: '1', name: 'Pune Station' },
        { id: '2', name: 'Shivajinagar' },
        { id: '3', name: 'JM Road' },
        { id: '4', name: 'Deccan Gymkhana' },
        { id: '5', name: 'Karve Road' },
        { id: '6', name: 'Warje' },
        { id: '7', name: 'Katraj' },
      ]
    },
    {
      route_id: '2',
      route_name: 'Route 2B - Camp to Hadapsar',
      stops: [
        { id: '3', name: 'Camp' },
        { id: '8', name: 'Koregaon Park' },
        { id: '9', name: 'Viman Nagar' },
        { id: '10', name: 'Hadapsar' },
      ]
    },
    {
      route_id: '3',
      route_name: 'Route 3C - FC Road Circular',
      stops: [
        { id: '6', name: 'FC Road' },
        { id: '11', name: 'Prabhat Road' },
        { id: '12', name: 'Erandwane' },
        { id: '13', name: 'Pashan' },
        { id: '14', name: 'Baner' },
        { id: '6', name: 'FC Road' },
      ]
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRoutes = async () => {
      try {
        // const response = await fetch('/api/routes');
        // const data = await response.json();
        
        setTimeout(() => {
          setRoutes(mockRoutes);
          setFilteredRoutes(mockRoutes);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch routes:', error);
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    const filtered = routes.filter(route =>
      route.route_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.stops.some(stop => stop.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRoutes(filtered);
  }, [searchTerm, routes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Bus Routes</h1>
          <p className="text-muted-foreground mb-6">
            Explore all bus routes and their stops in the PMPML network
          </p>
          
          {/* Search */}
          <div className="max-w-md">
            <Input
              placeholder="Search routes or stops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-border focus:ring-primary"
            />
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.route_id} className="p-6 bg-surface shadow-card hover:shadow-card-hover transition-all duration-200">
              {/* Route Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                  <Bus className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{route.route_name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {route.stops.length} stops
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ~{Math.ceil(route.stops.length * 3)} mins
                    </span>
                  </div>
                </div>
              </div>

              {/* Stops List */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                <div className="space-y-4">
                  {route.stops.map((stop, index) => (
                    <div key={`${route.route_id}-${stop.id}-${index}`} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full border-2 bg-surface relative z-10 ${
                        index === 0 ? 'border-primary bg-primary' :
                        index === route.stops.length - 1 ? 'border-destructive bg-destructive' :
                        'border-muted-foreground'
                      }`}></div>
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${
                          index === 0 || index === route.stops.length - 1 ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {stop.name}
                        </span>
                        {index === 0 && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">Start</span>
                        )}
                        {index === route.stops.length - 1 && (
                          <span className="ml-2 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">End</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && !isLoading && (
          <Card className="p-12 text-center bg-surface shadow-card">
            <Bus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No routes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all available routes.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Routes;