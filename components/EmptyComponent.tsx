import { View, Text } from "react-native"

interface Props {
    title: string
}

const ListEmptyComponent = ({title}: Props) => {

    return <Text className="text-center mt-3">
            {title}
        </Text>
}

export default ListEmptyComponent;