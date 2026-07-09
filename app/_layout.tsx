import { Stack } from 'expo-router';
import { Platform, View, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';

const PHONE_W = 390;
const PHONE_H = 844;
const FRAME_W = PHONE_W + 20;  // phoneBorder width
const FRAME_H = PHONE_H + 40;  // phoneBorder height

const WEB_METRICS = {
  frame: { x: 0, y: 0, width: PHONE_W, height: PHONE_H },
  insets: { top: 52, bottom: 0, left: 0, right: 0 },
};

function WebShell({ children }: { children: React.ReactNode }) {
  const { height: winH, width: winW } = useWindowDimensions();
  // Scale to fit viewport with 20px margin on each axis
  const scale = Math.min(1, (winH - 40) / FRAME_H, (winW - 40) / FRAME_W);

  return (
    <View style={styles.webShell}>
      {/* Wrapper sized to the scaled visual footprint so nothing overflows */}
      <View style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
        <View
          style={[
            styles.phoneBorder,
            {
              transform: [{ scale }],
              // Anchor transform to top-left so the frame doesn't drift
              transformOrigin: '0 0' as any,
            },
          ]}
        >
          <View style={styles.notch} />
          <View style={styles.screen}>{children}</View>
          <View style={styles.homeBar} />
        </View>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const metrics = Platform.OS === 'web' ? WEB_METRICS : undefined;

  const content = (
    <SafeAreaProvider initialMetrics={metrics}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="activity/[id]"
          options={{ presentation: 'card', animation: 'slide_from_right' }}
        />
      </Stack>
    </SafeAreaProvider>
  );

  if (Platform.OS !== 'web') return content;

  return <WebShell>{content}</WebShell>;
}

const styles = StyleSheet.create({
  webShell: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh' as any,
    overflow: 'hidden' as any,
  },
  phoneBorder: {
    width: FRAME_W,
    height: FRAME_H,
    backgroundColor: '#1C1C1E',
    borderRadius: 56,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.7,
    shadowRadius: 60,
    alignItems: 'center',
    overflow: 'hidden',
  },
  notch: {
    width: 120,
    height: 34,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    zIndex: 10,
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
  screen: {
    width: PHONE_W,
    height: PHONE_H,
    backgroundColor: colors.dark,
    borderRadius: 48,
    overflow: 'hidden',
  },
  homeBar: {
    width: 130,
    height: 5,
    backgroundColor: '#444',
    borderRadius: 3,
    marginTop: 6,
  },
});
