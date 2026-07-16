import { Tabs } from 'expo-router';
import { Image, Platform, StyleSheet, View } from 'react-native';

const tabGames = require('../../assets/images/tab-games.png');
const tabShield = require('../../assets/images/tab-shield.png');
const tabHome = require('../../assets/images/tab-home.png');
const tabRewards = require('../../assets/images/tab-rewards.png');
const tabMessages = require('../../assets/images/tab-messages.png');

function TabIconImg({ src, focused, size = 32 }: { src: any; focused: boolean; size?: number }) {
  return (
    <Image
      source={src}
      style={{ width: size, height: size, opacity: focused ? 1 : 0.45 }}
      resizeMode="contain"
    />
  );
}

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.centerIconWrapper, focused && styles.centerIconActive]}>
      <Image source={tabHome} style={{ width: 38, height: 38 }} resizeMode="contain" />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIconImg src={tabGames} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          tabBarIcon: ({ focused }) => <TabIconImg src={tabShield} focused={focused} size={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarItemStyle: styles.centerTabItem,
          tabBarIcon: ({ focused }) => <CenterTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: ({ focused }) => <TabIconImg src={tabRewards} focused={focused} size={30} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ focused }) => <TabIconImg src={tabMessages} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#3D2B15',
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 10,
  },
  centerTabItem: {},
  centerIconWrapper: {
    backgroundColor: 'rgba(233,204,116,0.35)',
    borderRadius: 26,
    width: 56,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(233,204,116,0.3)',
  },
  centerIconActive: {
    backgroundColor: '#E9CC74',
    borderColor: '#9B7A14',
  },
});
