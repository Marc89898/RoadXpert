import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


/////////////////////////////////////// SHARED ///////////////////////////////////////

// Principal Screens
import SplashScreen from '../Screens/Shared/SplashScreen.js';
import LoginScreen from '../Screens/Shared/LoginScreen.js';

// Navigation
import NavBar from '../Components/Navigation/NavBar.js';
import BackNavigation from '../Components/Navigation/BackNavigation.js';

/////////////////////////////////////// PROFESSOR ///////////////////////////////////////

// Dashboard
import Dashboard from '../Screens/Professor/DashboardSection/Dashboard.js';
import NotificationsScreen from '../Screens/Professor/DashboardSection/NotificationsScreen.js';
import Settings from '../Screens/Professor/DashboardSection/Settings/Settings.js';
import UserProfile from '../Screens/Professor/DashboardSection/Settings/UserProfile.js';
import ChatBot from '../Screens/Professor/DashboardSection/ChatBot.js';

// Students
import MyStudents from '../Screens/Professor/StudentsSection/MyStudents.js';
import AllStudents from '../Screens/Professor/StudentsSection/AllStudents.js';
import StudentInfo from '../Screens/Professor/StudentsSection/StudentInfo.js';
import StudentProfile from '../Screens/Professor/StudentsSection/StudentProfile.js';

// Map
import MapScreen from '../Screens/Professor/StudentsSection/MapScreen.js';

// Cars
import MyCars from '../Screens/Professor/Cars/Cars.js';
import CarInfo from '../Screens/Professor/Cars/CarInfo.js';

// Practice
import PrePractice from '../Screens/Professor/Practices/pre-practice.js';
import StartRouteMap from '../Screens/Professor/Practices/StartRouteMap.js';
import PostPractice from '../Screens/Professor/Practices/post-practice.js';

// Categories
import Categories from '../Screens/Professor/StudentsSection/Categories.js';
import SelectedCategory from '../Screens/Professor/StudentsSection/SelectedCategory.js';

// OneRouteScreen
import OneRouteScreen from '../Screens/Professor/StudentsSection/OneRouteScreen.js';



/////////////////////////////////////// ADMIN ///////////////////////////////////////

// Dashboard
import AdminDashboard from '../Screens/Administrador/DashboardSection/AdminDashboard.js';
import AdminNotificationsScreen from '../Screens/Administrador/DashboardSection/AdminNotificationsScreen.js';
import AdminChatBot from '../Screens/Administrador/DashboardSection/AdminChatBot.js';

// Settings
import AdminSettings from '../Screens/Administrador/DashboardSection/Settings/AdminSettings.js';
import AdminAllStudent from '../Screens/Administrador/DashboardSection/Settings/Students/AdminAllStudent.js';
import AdminRegisterStudent from '../Screens/Administrador/DashboardSection/Settings/Students/AdminRegisterStudent.js';
import AdminAllWorkers from '../Screens/Administrador/DashboardSection/Settings/Workers/AdminAllWorkers.js';
import AdminRegisterPerson from '../Screens/Administrador/DashboardSection/Settings/Workers/AdminRegisterPerson.js';
import AdminAllRoles from '../Screens/Administrador/DashboardSection/Settings/Roles/AdminAllRoles.js';
import AdminEditRole from '../Screens/Administrador/DashboardSection/Settings/Roles/AdminEditRole.js';
import AdminCreateRoles from '../Screens/Administrador/DashboardSection/Settings/Roles/AdminCreateRoles.js';
import AdminAllVehicles from '../Screens/Administrador/DashboardSection/Settings/Vehicles/AdminAllVehicles.js';
import AdminRegisterVehicle from '../Screens/Administrador/DashboardSection/Settings/Vehicles/AdminRegisterVehicle.js';

// Students
import AdminMyStudents from '../Screens/Administrador/StudentsSection/AdminMyStudents.js';
import AdminAllStudents from '../Screens/Administrador/StudentsSection/AdminAllStudents.js';
import AdminStudentInfo from '../Screens/Administrador/StudentsSection/AdminStudentInfo.js';
import AdminStudentProfile from '../Screens/Administrador/StudentsSection/AdminStudentProfile.js';

// Map
import AdminMapScreen from '../Screens/Administrador/StudentsSection/AdminMapScreen.js';

// Cars
import AdminMyCars from '../Screens/Administrador/Cars/AdminCars.js';
import AdminCarInfo from '../Screens/Administrador/Cars/AdminCarInfo.js';

// Practice
import AdminPrePractice from '../Screens/Administrador/Practices/pre-practice.js';
import AdminStartRouteMap from '../Screens/Administrador/Practices/AdminStartRouteMap.js';
import AdminPostPractice from '../Screens/Administrador/Practices/post-practice.js';
import AdminViewWorker from '../Screens/Administrador/DashboardSection/Settings/Workers/AdminViewWorker.js'
// Categories
import AdminCategories from '../Screens/Administrador/StudentsSection/AdminCategories.js';
import AdminSelectedCategory from '../Screens/Administrador/StudentsSection/AdminSelectedCategory.js';

// Schools
import AdminCreateSchool from '../Screens/Administrador/DashboardSection/Settings/AdminCreateSchool.js';

import AdminNoPage from '../Screens/Administrador/DashboardSection/Settings/AdminNoPage.js';


/////////////////////////////////////// MAIN COMPONENET ///////////////////////////////////////

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashBoard"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*/////////////////////////////////////// PROFESSOR ///////////////////////////////////////  */}
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
        <Stack.Screen name="prePractice" component={PrePractice} />
        <Stack.Screen name="StartRouteMap" component={StartRouteMap} />
        <Stack.Screen name="PostPractice" component={PostPractice} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="SelectedCategory" component={SelectedCategory} />
        <Stack.Screen name="OneRouteScreen" component={OneRouteScreen} />


        {/*/////////////////////////////////////// ADMIN ///////////////////////////////////////  */}
        <Stack.Screen name="AdminCreateSchool" component={AdminCreateSchool} />
        <Stack.Screen name="AdminNoPage" component={AdminNoPage} />

        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="AdminNotificationsScreen" component={AdminNotificationsScreen} />
        <Stack.Screen name="AdminViewWorker" component={AdminViewWorker} />
        <Stack.Screen name="AdminSettings" component={AdminSettings} />
        <Stack.Screen name="AdminAllStudent" component={AdminAllStudent} />
        <Stack.Screen name="AdminRegisterStudent" component={AdminRegisterStudent} />
        <Stack.Screen name="AdminAllWorkers" component={AdminAllWorkers} />
        <Stack.Screen name="AdminRegisterPerson" component={AdminRegisterPerson} />
        <Stack.Screen name="AdminAllRoles" component={AdminAllRoles} />
        <Stack.Screen name="AdminEditRole" component={AdminEditRole} />
        <Stack.Screen name="AdminCreateRoles" component={AdminCreateRoles} />
        <Stack.Screen name="AdminAllVehicles" component={AdminAllVehicles} />
        <Stack.Screen name="AdminRegisterVehicle" component={AdminRegisterVehicle} />
        <Stack.Screen name="AdminChatBot" component={AdminChatBot} />
        <Stack.Screen name="AdminMyStudents" component={AdminMyStudents} />
        <Stack.Screen name="AdminAllStudents" component={AdminAllStudents} />
        <Stack.Screen name="AdminStudentInfo" component={AdminStudentInfo} />
        <Stack.Screen name="AdminStudentProfile" component={AdminStudentProfile} />
        <Stack.Screen name="AdminMapScreen" component={AdminMapScreen} />
        <Stack.Screen name="AdminMyCars" component={AdminMyCars} />
        <Stack.Screen name="AdminCarInfo" component={AdminCarInfo} />
        <Stack.Screen name="AdminprePractice" component={AdminPrePractice} />
        <Stack.Screen name="AdminStartRouteMap" component={AdminStartRouteMap} />
        <Stack.Screen name="AdminPostPractice" component={AdminPostPractice} />
        <Stack.Screen name="AdminCategories" component={AdminCategories} />
        <Stack.Screen name="AdminSelectedCategory" component={AdminSelectedCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
