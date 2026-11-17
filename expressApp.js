const express = require('express');
const app = express();

app.use(express.json());

// Initializing with three sample records
let vehicles = [
    { id: 1, vehicleName: "Hyundai Creta", vehicleNumber: "HR26AB1234", type: "SUV", price: 1500000 },
    { id: 2, vehicleName: "Honda City", vehicleNumber: "UP14CD5678", type: "Sedan", price: 1200000 },
    { id: 3, vehicleName: "Tata Nexon", vehicleNumber: "DL8CAF9012", type: "SUV", price: 950000 }
];

// GET: Retrieve all vehicles
app.get('/vehicles', (req, res) => {
    res.status(200).json(vehicles);
});

// GET: Retrieve vehicle by ID
app.get('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.status(200).json(vehicle);
});

// POST: Add a new vehicle
app.post('/vehicles', (req, res) => {
    const { id, vehicleName, vehicleNumber, type, price } = req.body;
    
    if (!id || !vehicleName || !vehicleNumber || !type || price === undefined || price <= 0) {
        return res.status(400).json({ error: 'Missing required fields or invalid price' });
    }

    const newVehicle = { id, vehicleName, vehicleNumber, type, price };
    vehicles.push(newVehicle);
    res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
});

// PUT: Update vehicle details
app.put('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const { vehicleName, vehicleNumber, type, price } = req.body;
    if (vehicleName) vehicle.vehicleName = vehicleName;
    if (vehicleNumber) vehicle.vehicleNumber = vehicleNumber;
    if (type) vehicle.type = type;
    if (price && price > 0) vehicle.price = price;

    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
});

// DELETE: Delete a vehicle
app.delete('/vehicles/:id', (req, res) => {
    const index = vehicles.findIndex(v => v.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Vehicle not found' });

    const deletedVehicle = vehicles.splice(index, 1);
    res.status(200).json({ message: "Vehicle deleted successfully", vehicle: deletedVehicle[0] });
});

app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});