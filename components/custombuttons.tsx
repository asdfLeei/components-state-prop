import React from 'react';
import { StyleSheet, Pressable, TouchableOpacity, Text } from 'react-native';

// ─── Color Constants ──────────────────────────────────────────────────────────
const ORANGE = '#D4622A';
const LINE = '#F0A500';
const WHITE = '#FFF8EE';

// ─── Custom Button Props ──────────────────────────────────────────────────────
interface CustomButtonProps {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  icon: string;
  text: string;
  variant?: 'add' | 'minus' | 'reset';
}

// ─── Add Button (with Pressable for hold effect) ─────────────────────────────
export function AddButton({
  onPressIn,
  onPressOut,
  icon = '🏀',
  text = 'Add Count',
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, styles.btnAdd, pressed && styles.btnPressed]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Text style={styles.btnIcon}>{icon}</Text>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
}

// ─── Minus Button (with Pressable for hold effect) ────────────────────────
export function MinusButton({
  onPressIn,
  onPressOut,
  icon = '📉',
  text = 'Minus Count',
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, styles.btnMinus, pressed && styles.btnPressed]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Text style={styles.btnIcon}>{icon}</Text>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
}

// ─── Reset Button ─────────────────────────────────────────────────────────────
export function ResetButton({
  onPress,
  icon = '🔄',
  text = 'Reset Count',
}: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.btn, styles.btnReset]} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.btnIcon}>{icon}</Text>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

// ─── Button Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Buttons
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  btnAdd: {
    backgroundColor: ORANGE,
    borderWidth: 1,
    borderColor: LINE,
  },
  btnMinus: {
    backgroundColor: '#8B0000',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  btnReset: {
    backgroundColor: '#2C2C2E',
    borderWidth: 1,
    borderColor: '#555',
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  btnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnIcon: {
    fontSize: 16,
  },
});
