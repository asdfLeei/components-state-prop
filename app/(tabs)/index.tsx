import { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { AddButton, MinusButton, ResetButton } from '../../components/custombuttons';

// ─── Basketball SVG lines (drawn with Views) ──────────────────────────────────
function CourtLines() {
  return (
    <View style={courtStyles.container} pointerEvents="none">
      {/* center circle */}
      <View style={courtStyles.centerCircle} />
      {/* left arc */}
      <View style={courtStyles.leftArc} />
      {/* right arc */}
      <View style={courtStyles.rightArc} />
      {/* half-court line */}
      <View style={courtStyles.halfLine} />
    </View>
  );
}

const courtStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  centerCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    top: '50%',
    left: '50%',
    marginLeft: -60,
    marginTop: -60,
  },
  halfLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.10)',
    top: '50%',
  },
  leftArc: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    top: 30,
    left: -30,
  },
  rightArc: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    bottom: 30,
    right: -30,
  },
});

// ─── Child Component ──────────────────────────────────────────────────────────
interface ShotClockDisplayProps {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
}

function ShotClockDisplay({ count, onAdd, onMinus, onReset }: ShotClockDisplayProps) {
  const addIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const minusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHoldAdd = useCallback(() => {
    onAdd();
    addIntervalRef.current = setInterval(() => { onAdd(); }, 150);
  }, [onAdd]);

  const stopHoldAdd = useCallback(() => {
    if (addIntervalRef.current) {
      clearInterval(addIntervalRef.current);
      addIntervalRef.current = null;
    }
  }, []);

  const startHoldMinus = useCallback(() => {
    onMinus();
    minusIntervalRef.current = setInterval(() => { onMinus(); }, 150);
  }, [onMinus]);

  const stopHoldMinus = useCallback(() => {
    if (minusIntervalRef.current) {
      clearInterval(minusIntervalRef.current);
      minusIntervalRef.current = null;
    }
  }, []);

  useEffect(() => () => {
    stopHoldAdd();
    stopHoldMinus();
  }, [stopHoldAdd, stopHoldMinus]);

  return (
    <View style={styles.childWrapper}>
      {/* Child label */}
      <View style={styles.childLabel}>
        <Text style={styles.childLabelText}>🏀 SHOT CLOCK 24 SECONDS</Text>
      </View>

      <Text style={styles.childSubtitle}>Hanggang 24 lang ang shot clock</Text>

      <Text style={styles.propsLabel}>⬇ PROPS DATA (Galing sa Parent State)</Text>
      <View style={styles.dividerLine} />

      {/* Scoreboard-style number */}
      <View style={styles.scoreboard}>
        <Text style={styles.clockNumber}>{count}</Text>
        <Text style={styles.clockMax}></Text>
      </View>
      

      

      <View style={styles.dividerLine} />
      <Text style={styles.propsLabel}>⬆ PROPS FUNCTION (Triggers Parent State)</Text>

      {/* Buttons */}
      <AddButton onPressIn={startHoldAdd} onPressOut={stopHoldAdd} icon="🏀" text="Add Count" />
      <MinusButton onPressIn={startHoldMinus} onPressOut={stopHoldMinus} icon="📉" text="Minus Count" />
      <ResetButton onPress={onReset} icon="🔄" text="Reset Count" />
    </View>
  );
}

// ─── Parent Component ─────────────────────────────────────────────────────────
export default function HomeScreen() {
  const SHOT_CLOCK_MAX = 24;
  const [count, setCount] = useState<number>(0);

  const handleAdd   = useCallback(() => setCount(prev => Math.min(prev + 1, SHOT_CLOCK_MAX)), []);
  const handleMinus = useCallback(() => setCount(prev => prev - 1), []);
  const handleReset = useCallback(() => setCount(0), []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.screen}>

        <View style={styles.parentWrapper}>
          {/* Parent label */}
          <View style={styles.parentLabel}>
            <Text style={styles.parentLabelText}>🏟 PARENT COMPONENT (index.tsx)</Text>
          </View>

          <Text style={styles.parentTitle}>Ako ang Parent Screen</Text>

          {/* State locker — green scoreboard strip */}
          <View style={styles.stateLocker}>
            <View style={styles.stateLockerInner}>
              <Text style={styles.stateLockerLabel}>STATE LOCKER</Text>
              <Text style={styles.stateLockerValue}>count: 🏀 {count}</Text>
            </View>
          </View>

          <ShotClockDisplay
            count={count}
            onAdd={handleAdd}
            onMinus={handleMinus}
            onReset={handleReset}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ORANGE  = '#D4622A';   // classic basketball leather
const DARK    = '#3B1A00';   // deep court brown
const COURT   = '#C17F3A';   // hardwood floor
const LINE    = '#F0A500';   // court line gold
const GREEN   = '#1DB954';   // scoreboard green
const WHITE   = '#FFF8EE';   // warm white

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  // Parent
  parentWrapper: {
    width: '100%',
    borderWidth: 3,
    borderColor: LINE,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(59,26,0,0.82)',
    position: 'relative',
  },
  parentLabel: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: LINE,
  },
  parentLabelText: {
    color: WHITE,
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  parentTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: WHITE,
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // State locker
  stateLocker: {
    borderRadius: 10,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: GREEN,
  },
  stateLockerInner: {
    backgroundColor: GREEN,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  stateLockerLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    opacity: 0.85,
  },
  stateLockerValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // Child
  childWrapper: {
    borderWidth: 2,
    borderColor: '#F0A500',
    borderRadius: 14,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    position: 'relative',
  },
  childLabel: {
    position: 'absolute',
    top: -13,
    alignSelf: 'center',
    backgroundColor: '#F0A500',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  childLabelText: {
    color: DARK,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  childSubtitle: {
    textAlign: 'center',
    color: 'rgba(255,248,238,0.5)',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 6,
  },

  // Props indicators
  propsLabel: {
    color: LINE,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 2,
    letterSpacing: 0.3,
  },
  dividerLine: {
    width: 2,
    height: 14,
    backgroundColor: LINE,
    alignSelf: 'center',
    marginVertical: 2,
  },

  // Scoreboard
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#1a0a00',
    borderRadius: 12,
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: ORANGE,
    shadowColor: ORANGE,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  clockNumber: {
    fontSize: 88,
    fontWeight: '900',
    color: '#f2f2f5',
    lineHeight: 96,
    letterSpacing: -2,
    textShadowColor: 'rgba(240,165,0,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  clockMax: {
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(240,165,0,0.5)',
    marginBottom: 10,
    marginLeft: 4,
  },

  // Progress bar
  progressBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: GREEN,
    borderRadius: 3,
  },
});