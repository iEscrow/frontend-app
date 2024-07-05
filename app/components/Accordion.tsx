import React, { useState } from "react"
import { Text } from "react-native"
import { TouchableOpacity, View } from "react-native"
import { palette, typography } from "app/theme"
import { Icon } from "./Icon"

const Accordion = ({ title, children, open }) => {
  const [expanded, setExpanded] = useState(open)

  const toggleAccordion = () => {
    setExpanded(!expanded)
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion} disabled={open}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: typography.primary.medium,
              fontSize: typography.sizes.p1,
              lineHeight: 21,
              color: palette.primary400,
              paddingLeft: 16,
            }}
          >
            {title.toUpperCase()}
          </Text>
          {!open ? (
            <Icon
              icon="details"
              size={20}
              containerStyle={{
                transform: [{ rotate: expanded ? "180deg" : "0deg" }],
                marginRight: 20,
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
      {expanded && <View>{children}</View>}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: palette.neutral600,
          marginVertical: 16,
        }}
      />
    </View>
  )
}

export default Accordion
