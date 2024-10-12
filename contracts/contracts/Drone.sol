// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Drone {
    int256 public latitude;
    int256 public longitude;

    constructor(int256 _latitude, int256 _longitude) {
        latitude = _latitude;
        longitude = _longitude;
    }

    // function sendDrone(int256 _latitude, int256 _longitude) public {
    //     int256 incrementAmountLatitude = _latitude/10;
    //     int256 incrementAmountLongitude = _longitude/10;
    //     updateLocation(incrementAmountLatitude, incrementAmountLongitude);
    // }

    function updateLocation(int256 _latitude, int256 _longitude) public {
        latitude = _latitude;
        longitude = _longitude;
    }

    function getLocation() public view returns (int256, int256) {
        return (latitude, longitude);
    }
}
