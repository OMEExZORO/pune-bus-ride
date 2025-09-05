import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, IndianRupee, Clock, Search } from 'lucide-react';

interface Booking {
  booking_id: string;
  bus_number: string;
  source: string;
  destination: string;
  fare: number;
  booking_time: string;
  journey_date: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  passenger_name: string;
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with API call later
  const mockBookings: Booking[] = [
    {
      booking_id: 'BK123456',
      bus_number: 'MH-12-AB-1234',
      source: 'Pune Station',
      destination: 'Katraj',
      fare: 15,
      booking_time: '2024-01-15T10:30:00Z',
      journey_date: '2024-01-15',
      status: 'completed',
      passenger_name: 'John Doe'
    },
    {
      booking_id: 'BK123457',
      bus_number: 'MH-12-CD-5678',
      source: 'Camp',
      destination: 'Hadapsar',
      fare: 18,
      booking_time: '2024-01-14T14:20:00Z',
      journey_date: '2024-01-14',
      status: 'completed',
      passenger_name: 'John Doe'
    },
    {
      booking_id: 'BK123458',
      bus_number: 'MH-12-EF-9012',
      source: 'Shivajinagar',
      destination: 'FC Road',
      fare: 12,
      booking_time: '2024-01-16T09:15:00Z',
      journey_date: '2024-01-17',
      status: 'confirmed',
      passenger_name: 'John Doe'
    },
    {
      booking_id: 'BK123459',
      bus_number: 'MH-12-GH-3456',
      source: 'Deccan Gymkhana',
      destination: 'Warje',
      fare: 10,
      booking_time: '2024-01-10T16:45:00Z',
      journey_date: '2024-01-10',
      status: 'cancelled',
      passenger_name: 'John Doe'
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      try {
        // const response = await fetch('/api/bookings/user123');
        // const data = await response.json();
        
        setTimeout(() => {
          setBookings(mockBookings);
          setFilteredBookings(mockBookings);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter(booking =>
      booking.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bus_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Booking History</h1>
          <p className="text-muted-foreground mb-6">
            View and manage all your past and upcoming bus bookings
          </p>
          
          {/* Search */}
          <div className="max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border focus:ring-primary"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-surface shadow-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {bookings.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </div>
          </Card>
          <Card className="p-4 bg-surface shadow-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </Card>
          <Card className="p-4 bg-surface shadow-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </div>
          </Card>
          <Card className="p-4 bg-surface shadow-card">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ₹{bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.fare, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.booking_id} className="p-6 bg-surface shadow-card hover:shadow-card-hover transition-all duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Booking Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      Booking #{booking.booking_id}
                    </h3>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <MapPin className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Route</p>
                        <p className="font-medium text-foreground">{booking.source} → {booking.destination}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <Calendar className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Journey Date</p>
                        <p className="font-medium text-foreground">{formatDate(booking.journey_date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Booked At</p>
                        <p className="font-medium text-foreground">{formatTime(booking.booking_time)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <IndianRupee className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fare</p>
                        <p className="font-medium text-foreground">₹{booking.fare}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Bus: {booking.bus_number}</span>
                    <span>•</span>
                    <span>Passenger: {booking.passenger_name}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && !isLoading && (
          <Card className="p-12 text-center bg-surface shadow-card">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start booking your first journey!'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;