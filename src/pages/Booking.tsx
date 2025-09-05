import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bus, User, Phone, Mail, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingData {
  busNumber: string;
  route: string;
  fromStop: string;
  toStop: string;
  fare: number;
  passengerName: string;
  phone: string;
  email: string;
}

const Booking = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'selection' | 'details' | 'confirmation'>('selection');
  const [bookingData, setBookingData] = useState<BookingData>({
    busNumber: '',
    route: '',
    fromStop: '',
    toStop: '',
    fare: 0,
    passengerName: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  // Mock data
  const mockBuses = [
    { number: 'MH-12-AB-1234', route: 'Route 1A - Pune Station to Katraj', fare: 15 },
    { number: 'MH-12-CD-5678', route: 'Route 2B - Camp to Hadapsar', fare: 18 },
    { number: 'MH-12-EF-9012', route: 'Route 3C - FC Road Circular', fare: 20 },
  ];

  const mockStops = [
    'Pune Station', 'Shivajinagar', 'Camp', 'Deccan Gymkhana', 'JM Road',
    'FC Road', 'Karve Road', 'Warje', 'Katraj', 'Hadapsar'
  ];

  const handleBusSelection = (busNumber: string) => {
    const selectedBus = mockBuses.find(bus => bus.number === busNumber);
    if (selectedBus) {
      setBookingData(prev => ({
        ...prev,
        busNumber: selectedBus.number,
        route: selectedBus.route,
        fare: selectedBus.fare,
      }));
    }
  };

  const handleStepSubmit = () => {
    if (step === 'selection') {
      if (!bookingData.busNumber || !bookingData.fromStop || !bookingData.toStop) {
        toast({
          title: "Incomplete Selection",
          description: "Please select bus and stops before proceeding.",
          variant: "destructive",
        });
        return;
      }
      if (bookingData.fromStop === bookingData.toStop) {
        toast({
          title: "Invalid Selection",
          description: "Source and destination cannot be the same.",
          variant: "destructive",
        });
        return;
      }
      setStep('details');
    } else if (step === 'details') {
      if (!bookingData.passengerName || !bookingData.phone || !bookingData.email) {
        toast({
          title: "Incomplete Details",
          description: "Please fill in all passenger details.",
          variant: "destructive",
        });
        return;
      }
      handleBookingSubmit();
    }
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Mock API call
      // const response = await fetch('/api/book', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData)
      // });
      // const result = await response.json();
      
      // Mock successful booking
      setTimeout(() => {
        const mockBookingId = 'BK' + Date.now().toString().slice(-6);
        setBookingId(mockBookingId);
        setStep('confirmation');
        setIsSubmitting(false);
        toast({
          title: "Booking Confirmed!",
          description: `Your booking ID is ${mockBookingId}`,
        });
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const renderBusSelection = () => (
    <Card className="p-6 bg-surface shadow-card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Select Your Journey</h2>
      
      {/* Bus Selection */}
      <div className="space-y-4 mb-6">
        <Label className="text-base font-medium">Choose Bus</Label>
        <div className="grid gap-3">
          {mockBuses.map((bus) => (
            <div
              key={bus.number}
              onClick={() => handleBusSelection(bus.number)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                bookingData.busNumber === bus.number
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-surface-hover'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bus className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{bus.number}</p>
                    <p className="text-sm text-muted-foreground">{bus.route}</p>
                  </div>
                </div>
                <span className="font-semibold text-foreground">₹{bus.fare}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stop Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label>From Stop</Label>
          <Select value={bookingData.fromStop} onValueChange={(value) => 
            setBookingData(prev => ({ ...prev, fromStop: value }))
          }>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {mockStops.map((stop) => (
                <SelectItem key={stop} value={stop}>{stop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>To Stop</Label>
          <Select value={bookingData.toStop} onValueChange={(value) => 
            setBookingData(prev => ({ ...prev, toStop: value }))
          }>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {mockStops.map((stop) => (
                <SelectItem key={stop} value={stop}>{stop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={handleStepSubmit} 
        className="w-full bg-gradient-primary"
        disabled={!bookingData.busNumber || !bookingData.fromStop || !bookingData.toStop}
      >
        Continue to Passenger Details
      </Button>
    </Card>
  );

  const renderPassengerDetails = () => (
    <Card className="p-6 bg-surface shadow-card">
      <h2 className="text-2xl font-bold text-foreground mb-6">Passenger Details</h2>
      
      {/* Journey Summary */}
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-foreground mb-2">Journey Summary</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Bus: {bookingData.busNumber}</p>
          <p>From: {bookingData.fromStop} → To: {bookingData.toStop}</p>
          <p className="font-medium text-foreground">Fare: ₹{bookingData.fare}</p>
        </div>
      </div>

      {/* Passenger Form */}
      <div className="grid gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Enter your full name"
              value={bookingData.passengerName}
              onChange={(e) => setBookingData(prev => ({ ...prev, passengerName: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={bookingData.phone}
              onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={bookingData.email}
              onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setStep('selection')}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={handleStepSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-primary"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </Card>
  );

  const renderConfirmation = () => (
    <Card className="p-8 bg-surface shadow-card text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
      
      <div className="bg-muted/50 p-6 rounded-lg mb-6 text-left max-w-md mx-auto">
        <h3 className="font-medium text-foreground mb-4">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID:</span>
            <span className="font-medium text-foreground">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bus:</span>
            <span className="text-foreground">{bookingData.busNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route:</span>
            <span className="text-foreground">{bookingData.fromStop} → {bookingData.toStop}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Passenger:</span>
            <span className="text-foreground">{bookingData.passengerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fare:</span>
            <span className="font-medium text-foreground">₹{bookingData.fare}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={() => {
          setStep('selection');
          setBookingData({
            busNumber: '', route: '', fromStop: '', toStop: '', fare: 0,
            passengerName: '', phone: '', email: ''
          });
          setBookingId('');
        }}
        className="bg-gradient-primary"
      >
        Book Another Journey
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Book Your Journey</h1>
          <p className="text-muted-foreground">Quick and easy bus ticket booking</p>
        </div>

        {step === 'selection' && renderBusSelection()}
        {step === 'details' && renderPassengerDetails()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
};

export default Booking;