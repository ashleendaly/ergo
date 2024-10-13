// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Drone {
    int256 public latitude;
    int256 public longitude;
    int256 public speed; // speed of drones in mps

    constructor(int256 _latitude, int256 _longitude) {
        latitude = _latitude;
        longitude = _longitude;
        speed = 15;
    }

    function makeBid(int256 _pickup_latitude, int256 _pickup_longitude, int256 _dropoff_latitude, int256 _dropoff_longitude) public view returns (int256) {
        int256 timeDistance;
        timeDistance = assessDistance(_pickup_latitude, _pickup_longitude, _dropoff_latitude, _dropoff_longitude);
        return timeDistance;
    }

    // define a helper method to find the absolute of an integer
    function abs(int256 _x) public pure returns (int256) {
        // If the number is negative, return the positive version
        if (_x < 0) {
            return int256(-_x);
        } else {
            return int256(_x);
        }
    }

    // define a helper method to find the square root of an integer
    function sqrt(int256 x) public pure returns (int256) {
        if (x == 0) return 0;
        int256 z = (x + 1) / 2;
        int256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }


    // define a helper method to find the pythogorean distance between two coordiate points, given lat1, lat2, lon1, lon2
    function distance(int256 lat1, int256 lat2, int256 lon1, int256 lon2) public pure returns (int256) {
        int256 dLat = abs((lat1 - lat2));
        int256 dLon = abs((lon1 - lon2));
        int256 dist = sqrt((dLat * dLat) + (dLon * dLon));
        return dist;
    }



    // latitude and longitude are floats multiplied by 10k
    function assessDistance(int256 _pickup_latitude, int256 _pickup_longitude, int256 _dropoff_latitude, int256 _dropoff_longitude) public view returns (int256) {
        int256 distanceToPackage;
        int256 distanceToDropoff;
        int256 totalDistance;
        int256 timeEstimate;

        (int256 lat, int256 long) = this.getLocation();

        distanceToPackage = distance(_pickup_latitude, lat, _pickup_longitude, long);
        distanceToDropoff = distance(_pickup_latitude, _dropoff_latitude, _pickup_longitude, _dropoff_longitude);

        totalDistance = distanceToDropoff + distanceToPackage;

        timeEstimate = totalDistance / this.getSpeed();

        return timeEstimate;
        
    }

    function updateLocation(int256 _latitude, int256 _longitude) public {
        latitude = _latitude;
        longitude = _longitude;
    }

    function getLocation() public view returns (int256, int256) {
        return (latitude, longitude);
    }

    function getSpeed() public view returns (int256) {
        return (speed);
    }
}
