export class LocationCommon {

   constructor(){

   }

   public getLocationsOrderBynearest = function(locations, current_user_location) { 
      for (let i = 0; i < locations.length; i++) {
         if (current_user_location.latitude != 0 && current_user_location.longitude != 0) {
            locations[i]['distance_miles'] = this.getDistanceFromLatLonInKm(locations[i], current_user_location);
         }
      }
      return this.sortByDistance(locations);
   }
   public getProvinces = function(){

   }

   sortByDistance = function (locations) {
      locations.sort((a, b) => {
         if (parseFloat(a.distance_miles) < parseFloat(b.distance_miles)) return -1;
         else if (parseFloat(a.distance_miles) > parseFloat(b.distance_miles)) return 1;
         else return 0;
      });

      return locations;
   }

   public getDistanceFromLatLonInKm = function(locationLog, currentLocation) {
      let lat1 = currentLocation.latitude;
      let lon1 = currentLocation.longitude;
      let lat2 = locationLog.latitude;
      let lon2 = locationLog.longitude;
      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      let dLon = this.deg2rad(lon2 - lon1);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = ((R * c) * 0.621371).toFixed(2); // Distance in miles

      return d;
   }

   deg2rad = function(deg) {
      return deg * (Math.PI / 180)
   }
}