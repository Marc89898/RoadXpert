import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

/////////////////////////////////////// PROFESSOR ///////////////////////////////////////

// Principal Screens
import SplashScreen from '../Screens/SplashScreen.js';
import LoginScreen from '../Screens/LoginScreen.js';

// Navigation Components
import NavBar from '../Screens/Navigation/NavBar.js';
import BackNavigation from '../Screens/Navigation/BackNavigation.js';

// Dashboard Components
import Dashboard from '../Screens/DashboardSection/Dashboard.js';
import NotificationsScreen from '../Screens/DashboardSection/NotificationsScreen.js';
import Settings from '../Screens/DashboardSection/Settings.js';
import UserProfile from '../Screens/DashboardSection/UserProfile.js';

// Students Components
import MyStudents from '../Screens/StudentsSection/MyStudents.js';
import AllStudents from '../Screens/StudentsSection/AllStudents.js';
import StudentInfo from '../Screens/StudentsSection/StudentInfo.js';
import StudentProfile from '../Screens/StudentsSection/StudentProfile.js';

// Map Components
import MapScreen from '../Screens/StudentsSection/MapScreen.js';

// Cars Components
import MyCars from '../Screens/Cars/Cars.js';
import CarInfo from '../Screens/Cars/CarInfo.js';

// Practice Components
import prePractice from '../Screens/Practices/pre-practice.js';
import StartRouteMap from '../Screens/Practices/StartRouteMap.js';
import PostPractice from '../Screens/Practices/post-practice.js';

// Categories Components
import Categories from '../Screens/StudentsSection/Categories.js';
import SelectedCategory from '../Screens/StudentsSection/SelectedCategory.js';


/////////////////////////////////////// ADMIN ///////////////////////////////////////

// Create Welcome Page
import WelcomePage from '../ScreensAdmin/WelcomePage.js'

// Schools
import CreateSchool from '../ScreensAdmin/CreateSchool.js';

// Professors
import AllWorkers from '../ScreensAdmin/AllWorkers.js';
import RegisterPerson from '../ScreensAdmin/RegisterPerson.js';

// Roles
import AllRoles from '../ScreensAdmin/AllRoles.js';
import CreateRoles from '../ScreensAdmin/CreateRoles.js';

// Vehicles
import AllVehicles from '../ScreensAdmin/AllVehicles.js';
import RegisterVehicle from '../ScreensAdmin/RegisterVehicle.js';
import NoPage from '../ScreensAdmin/NoPage.js';


/////////////////////////////////////// MAIN COMPONENET ///////////////////////////////////////

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NavBar"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*/////////////////////////////////// PROFESSOR ///////////////////////////////////  */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="BackNavigation" component={BackNavigation} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="MyStudents" component={MyStudents} />
        <Stack.Screen name="AllStudents" component={AllStudents} />
        <Stack.Screen name="StudentInfo" component={StudentInfo} />
        <Stack.Screen name="StudentProfile" component={StudentProfile} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="MyCars" component={MyCars} />
        <Stack.Screen name="CarInfo" component={CarInfo} />
        <Stack.Screen name="prePractice" component={prePractice} />
        <Stack.Screen name="StartRouteMap" component={StartRouteMap} />
        <Stack.Screen name="PostPractice" component={PostPractice} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="SelectedCategory" component={SelectedCategory} />


        {/*/////////////////////////////////// ADMIN ////////////////////////////////////  */}
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="CreateSchool" component={CreateSchool} />
        <Stack.Screen name="AllWorkers" component={AllWorkers} />
        <Stack.Screen name="RegisterPerson" component={RegisterPerson} />
        <Stack.Screen name="AllRoles" component={AllRoles} />
        <Stack.Screen name="CreateRoles" component={CreateRoles} />
        <Stack.Screen name="AllVehicles" component={AllVehicles} />
        <Stack.Screen name="RegisterVehicle" component={RegisterVehicle} />
        <Stack.Screen name="NoPage" component={NoPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
