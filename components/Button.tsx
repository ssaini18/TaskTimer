import { Pressable, Text } from "react-native"

interface ButtonProps {
    title: String,
    style?: String,
    onPress: () => void,

}

const Button = ({title, style, onPress}: ButtonProps) => {
    return <Pressable onPress={onPress} className="p-[10] bg-[#007AFF] rounded-lg">
        <Text className="text-center text-white">{title}</Text>
    </Pressable>
}

export default Button;