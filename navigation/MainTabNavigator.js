// import React from 'react';
// import { Platform } from 'react-native';
// import {
//   createStackNavigator,
//   createBottomTabNavigator
// } from 'react-navigation';

<<<<<<< HEAD
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SearchScreen from '../screens/SearchScreen'
import SettingsScreen from '../screens/SettingsScreen';
=======
// import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
>>>>>>> 487e45888a75f857edcfd2b48a8680c2339004a3

// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {}
// });

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen
//   },
//   config
// );

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   )
// };

// HomeStack.path = '';

<<<<<<< HEAD
const LinksStack = createStackNavigator(
  {
    Links: SearchScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
=======
// const LinksStack = createStackNavigator(
//   {
//     Links: LinksScreen
//   },
//   config
// );

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   )
// };
>>>>>>> 487e45888a75f857edcfd2b48a8680c2339004a3

// LinksStack.path = '';

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   )
// };

// SettingsStack.path = '';

// const tabNavigator = createBottomTabNavigator({
//   HomeStack,
//   LinksStack,
//   SettingsStack
// });

// tabNavigator.path = '';

// export default tabNavigator;
