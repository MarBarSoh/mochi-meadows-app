import { Tabs } from 'expo-router';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import MochiCharacter from '@/components/MochiCharacter';

const tabGames = require('../../assets/images/tab-games.png');

function TabIconImg({ src, focused, size = 32 }: { src: any; focused: boolean; size?: number }) {
  return (
    <Image
      source={src}
      style={{ width: size, height: size, opacity: focused ? 1 : 0.45 }}
      resizeMode="contain"
    />
  );
}

function TabIconEmoji({ emoji, focused, size = 26 }: { emoji: string; focused: boolean; size?: number }) {
  return (
    <Text style={{ fontSize: size, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.centerIconWrapper, focused && styles.centerIconActive]}>
      <MochiCharacter size={38} />
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
          tabBarIcon: ({ focused }) => <TabIconEmoji emoji="📖" focused={focused} />,
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
          tabBarIcon: ({ focused }) => <TabIconEmoji emoji="🏆" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ focused }) => <TabIconEmoji emoji="👥" focused={focused} />,
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
