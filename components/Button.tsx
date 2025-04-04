import { Pressable, Text } from "react-native"

interface ButtonProps {
    title: string,
    onPress: () => void,
    disabled?: boolean
}

const Button = ({title, disabled, onPress}: ButtonProps) => {
    return <Pressable disabled={disabled} onPress={onPress} className={`p-[10] rounded-lg ${disabled ? 'bg-gray-300' : 'bg-[#007AFF]'}`}>
        <Text className="text-center text-white">{title}</Text>
    </Pressable>
}

export default Button;