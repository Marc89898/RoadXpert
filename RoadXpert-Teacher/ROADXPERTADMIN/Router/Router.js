import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Principal Screens
import SplashScreen from '../Screens/Shared/SplashScreen.js';
import LoginScreen from '../Screens/Shared/LoginScreen.js';

/////////////////////////////////////// PROFESSOR ///////////////////////////////////////

// Navigation Components
import NavBar from '../Components/Navigation/NavBar.js';
import BackNavigation from '../Components/Navigation/BackNavigation.js';

// Dashboard Components
import Dashboard from '../Screens/Professor/DashboardSection/Dashboard.js';
import NotificationsScreen from '../Screens/Professor/DashboardSection/NotificationsScreen.js';
import Settings from '../Screens/Professor/DashboardSection/Settings/Settings.js';
import UserProfile from '../Screens/Professor/DashboardSection/Settings/UserProfile.js';
import ChatBot from '../Screens/Professor/DashboardSection/ChatBot.js';

// Students Components
import MyStudents from '../Screens/Professor/StudentsSection/MyStudents.js';
import AllStudents from '../Screens/Professor/StudentsSection/AllStudents.js';
import StudentInfo from '../Screens/Professor/StudentsSection/StudentInfo.js';
import StudentProfile from '../Screens/Professor/StudentsSection/StudentProfile.js';

// Map Components
import MapScreen from '../Screens/Professor/StudentsSection/MapScreen.js';

// Cars Components
import MyCars from '../Screens/Professor/Cars/Cars.js';
import CarInfo from '../Screens/Professor/Cars/CarInfo.js';

// Practice Components
import prePractice from '../Screens/Professor/Practices/pre-practice.js';
import StartRouteMap from '../Screens/Professor/Practices/StartRouteMap.js';
import PostPractice from '../Screens/Professor/Practices/post-practice.js';

// Categories Components
import Categories from '../Screens/Professor/StudentsSection/Categories.js';
import SelectedCategory from '../Screens/Professor/StudentsSection/SelectedCategory.js';


/////////////////////////////////////// ADMIN ///////////////////////////////////////

// Schools
import CreateSchool from '../Screens/Administrador/DashboardSection/Settings/CreateSchool.js';

// Students
import AllStudent from '../Screens/Administrador/DashboardSection/Settings/Students/AllStudent.js';
import RegisterStudent from '../Screens/Administrador/DashboardSection/Settings/Students/RegisterStudent.js';

// Professors
import AllWorkers from '../Screens/Administrador/DashboardSection/Settings/Workers/AllWorkers.js';
import RegisterPerson from '../Screens/Administrador/DashboardSection/Settings/Workers/RegisterPerson.js';

// Roles
import AllRoles from '../Screens/Administrador/DashboardSection/Settings/Roles/AllRoles.js';
import CreateRoles from '../Screens/Administrador/DashboardSection/Settings/Roles/CreateRoles.js';

// Vehicles
import AllVehicles from '../Screens/Administrador/DashboardSection/Settings/Vehicles/AllVehicles.js';
import RegisterVehicle from '../Screens/Administrador/DashboardSection/Settings/Vehicles/RegisterVehicle.js';
import NoPage from '../Screens/Administrador/DashboardSection/Settings/NoPage.js';


/////////////////////////////////////// MAIN COMPONENET ///////////////////////////////////////

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
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
        <Stack.Screen name="ChatBot" component={ChatBot} />
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
        <Stack.Screen name="CreateSchool" component={CreateSchool} />
        <Stack.Screen name="AllStudent" component={AllStudent} />
        <Stack.Screen name="RegisterStudent" component={RegisterStudent} />
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
