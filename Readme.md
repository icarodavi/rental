# Create a car
**RF**
- Should be able t create a new car
- Should be able to list all categories

**RN**
- Shouldn't able to create a car with same plate
- The user can't change the car's plate
- By default the car have property available as true
- Only admin can crate a car

#Car's List
**RF**
- Should be able to get a list with all cars with available as true
- Should be able to list all car's by category
- Should be able to list all car's by specification
- Should be able to list all car's by brand

**RN**
- It isn't necessary the user be signed in

#Specifications
**RF**
- Should be able to create the car's specifications 
- Should be able to list all specifications
- Should be able to list all cars
- Only admin can crate a specification

**RN**
- Only created cars receive specifications
- The specification can't be insert more than one time in the car

#Car's image
**RF**
- Should be able to save a car's image
- Should be able to list all cars

**RNF**
- use the mutter to upload

**RN**
- The user can can upload more than one file by car
- The user need to be an admin

#Rent the car
**RF**
- Should be able to create a rent


**RN**
- The an hour is a minor period.
- An user can rent only one car
- A Car can rent by only one user per time
