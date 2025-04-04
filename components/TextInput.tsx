import { TextInput } from "react-native";

interface CustomTextInputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    placeholder?: string;
}
  

const CustomTextInput = ({value, placeholder, onChangeText, secureTextEntry = false}: CustomTextInputProps) => {

    return <TextInput
        className="px-2 py-3 mb-3 border border-gray-400 rounded-lg"
        value={value}
        onChangeText={onChangeText} 
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
    />
}

export default CustomTextInput;