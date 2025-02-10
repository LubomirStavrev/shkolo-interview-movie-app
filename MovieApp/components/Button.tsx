import type React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"

interface ButtonProps {
  onPress: () => void
  style?: any
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
})

export default Button

