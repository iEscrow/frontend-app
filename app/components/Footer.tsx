import { api } from "app/services/api"
import { palette, typography } from "app/theme"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import Accordion from "./Accordion"
import { Icon } from "./Icon"

const FOOTER_CONTENT = [
  {
    title: "Sobre nosotros",
    items: [{ title: "Acerca" }, { title: "Términos" }, { title: "Privacidad" }],
  },
  {
    title: "Servicios",
    items: [
      { title: "Descargar" },
      { title: "Marketplace" },
      { title: "Escrow" },
      { title: "Programa de referidos" },
      { title: "Solicitud de listado" },
    ],
  },
  {
    title: "Soporte",
    items: [{ title: "Centro de ayuda" }, { title: "Seguridad" }],
  },
  {
    title: "Comunidad",
    groupedBy: 3,
    expanded: true,
    items: [
      { title: "/iescrow", icon: "facebook" },
      { title: "/iescrow", icon: "twitter" },
      { title: "/iescrow", icon: "instagram" },
      { title: "/iescrow", icon: "tiktok" },
      { title: "/iescrow", icon: "youtube" },
      { title: "/iescrow", icon: "telegram" },
    ],
  },
]

function agruparArray(array, numero) {
  if (!Array.isArray(array)) return []
  return array.reduce((grupos, elemento, indice) => {
    if (indice % numero === 0) {
      grupos.push([])
    }
    grupos[grupos.length - 1].push(elemento)
    return grupos
  }, [])
}

const BRAND_LABEL = "© 2024 iEscrow.crypto Derechos Reservados"
const Footer = () => {
  const [footer, setFooter] = useState([])
  useEffect(() => {
    api.getFooter().then((res) => setFooter(res.data))

    return () => {
      setFooter([])
    }
  }, [])

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 22,
        paddingBottom: 16,
        backgroundColor: palette.bottomTabsBackground,
        marginTop: 16,
      }}
    >
      {footer.map((content, idx) => {
        const mappedItems = agruparArray(content?.FooterItems, content.groupedBy || 1)
        return (
          <Accordion title={content.title} open={content.expanded} key={idx}>
            {mappedItems.map((items, index) => (
              <View
                key={index}
                style={{
                  flexDirection: content.groupedBy ? "row" : "column",
                  width: "100%",
                  gap: 29,
                  justifyContent: "center",
                  marginTop: content.groupedBy ? 21 : 10,
                }}
              >
                {items.map((item) =>
                  item.icon ? (
                    <Icon icon={item.icon} onPress={() => console.log("first")} />
                  ) : (
                    <TouchableOpacity style={{ width: "100%" }}>
                      <Text
                        style={{
                          paddingLeft: 40,
                          color: palette.white,
                          fontFamily: typography.primary.medium,
                          fontSize: typography.sizes.p2,
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            ))}
          </Accordion>
        )
      })}
      <Text
        style={{
          color: palette.primary400,
          fontFamily: typography.primary.normal,
          fontSize: typography.sizes.p2,
          textAlign: "center",
        }}
      >
        {BRAND_LABEL}
      </Text>
    </View>
  )
}

export default Footer
