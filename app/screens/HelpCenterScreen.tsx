import React, { FC, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle, FlatList } from "react-native"
import { AutoImage, Button, Icon, Screen, Text, TextField, Toggle } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { translate } from "../i18n"
import SelectDropdown from "react-native-select-dropdown"
import { TouchableOpacity } from "react-native-gesture-handler"
import MarketplaceCard from "app/components/MarketplaceCard"
import MyEscrowCard from "app/components/MyEscrowCard"
import escrows from "app/data/escrows"
import Fuse from "fuse.js"

const { width } = Dimensions.get("screen")

export const HelpCenterScreen: FC<DemoTabScreenProps<"HelpCenter">> = function HelpCenterScreen(
  _props,
) {
  const { navigation } = _props
  console.log(navigation)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const items = [
    { label: "¿Cómo podemos ayudarte?" },
    {
      title: "Restablecer contraseña de inicio de sesión",
      icon: require("../../assets/icons/help1.png"),
      sections: [
        {
          title: "Importancia de la Seguridad en las Contraseñas",
          description:
            "Restablecer una contraseña es una tarea que todos hemos tenido que hacer en algún momento. Sin embargo, es importante recordar que la seguridad de tus contraseñas es fundamental para proteger tus cuentas en línea. El restablecimiento de contraseñas es un último recurso cuando olvidas o sospechas que tu contraseña se ha comprometido. Por eso, es esencial crear contraseñas fuertes desde el principio y utilizar medidas de seguridad adicionales, como la autenticación de dos factores, para mantener tus cuentas seguras.",
        },
        {
          title: "Tendencias Actuales en el Restablecimiento de Contraseñas",
          description:
            "En la era digital actual, el restablecimiento de contraseñas se ha vuelto más eficiente y seguro gracias a las nuevas tendencias y tecnologías. Algunas plataformas ahora ofrecen métodos biométricos, como el reconocimiento facial o las huellas dactilares, para verificar la identidad de los usuarios al restablecer contraseñas. Además, se están implementando procesos de recuperación de cuentas más robustos que reducen la posibilidad de que terceros accedan a tus datos personales. Estas tendencias están diseñadas para hacer que el proceso de restablecimiento de contraseñas sea más seguro y conveniente.",
        },
        {
          title: "Consejos para Evitar el Restablecimiento Frecuente de Contraseñas",
          description:
            "Si te encuentras restableciendo contraseñas con frecuencia, es importante considerar algunas prácticas para evitarlo en el futuro. Primero, asegúrate de almacenar tus contraseñas de manera segura o utilizar un administrador de contraseñas confiable para gestionarlas. Además, evita utilizar información personal predecible, como nombres o fechas de nacimiento, en tus contraseñas. Cambia tus contraseñas de forma regular y utiliza la autenticación de dos factores siempre que esté disponible. Siguiendo estos consejos, puedes reducir la necesidad de restablecer tus contraseñas con frecuencia y mantener tus cuentas más seguras.",
        },
      ],
    },
    {
      title: "Desactivar cuenta",
      icon: require("../../assets/icons/help2.png"),
      sections: [
        {
          title: "Razones para Desactivar tu Cuenta",
          description:
            "Desactivar tu cuenta en una plataforma en línea puede ser una decisión importante. Puede haber varias razones para hacerlo, como preocupaciones sobre la privacidad, el deseo de desconectar de las redes sociales o simplemente la necesidad de un descanso digital. Antes de desactivar tu cuenta, es importante comprender por qué lo estás haciendo y si hay alternativas o ajustes de privacidad que puedan satisfacer tus necesidades.",
        },
        {
          title: "Cómo Desactivar tu Cuenta Paso a Paso",
          description:
            "El proceso para desactivar tu cuenta varía según la plataforma en la que estés registrado. En general, debes acceder a la configuración de tu cuenta, buscar la opción de desactivación o eliminación y seguir las instrucciones proporcionadas. A menudo, tendrás la opción de desactivar temporalmente la cuenta o eliminarla de forma permanente. Asegúrate de leer y entender las consecuencias de cada opción antes de tomar una decisión definitiva.",
        },
        {
          title: "Consideraciones Importantes al Desactivar tu Cuenta",
          description:
            "Antes de desactivar tu cuenta, considera las implicaciones que esto puede tener. Por ejemplo, es posible que pierdas el acceso a contenido o contactos que hayas almacenado en la plataforma. Además, algunas plataformas tienen períodos de espera antes de que la cuenta se desactive por completo. También es importante recordar que, en algunos casos, es posible que no puedas recuperar tu cuenta una vez que la hayas desactivado o eliminado. Asegúrate de tomar una decisión informada y respaldar cualquier información importante antes de proceder.",
        },
      ],
    },
    {
      title: "Cambiar correo electrónico",
      icon: require("../../assets/icons/help3.png"),
      sections: [
        {
          title: "Pasos para Cambiar tu Correo Electrónico",
          description:
            "Cambiar tu dirección de correo electrónico asociada a una cuenta en línea es un proceso que puede variar según la plataforma. En general, debes iniciar sesión en tu cuenta, acceder a la configuración o perfil de tu cuenta, y buscar la opción para cambiar la dirección de correo electrónico. A menudo, se te pedirá que ingreses la nueva dirección de correo electrónico y confirmes la contraseña de tu cuenta para verificar la identidad. Asegúrate de seguir cuidadosamente las instrucciones proporcionadas por la plataforma para completar el proceso.",
        },
        {
          title: "Informa a tus Contactos sobre el Cambio",
          description:
            "Una vez que hayas cambiado tu dirección de correo electrónico, es importante informar a tus contactos sobre este cambio. Esto asegurará que sigas recibiendo correos importantes y evites la pérdida de comunicación con amigos, familiares o colegas. Asegúrate de notificar a las personas clave sobre tu nueva dirección de correo electrónico y considera configurar una respuesta automática en tu antigua dirección para redirigir los correos entrantes hacia la nueva.",
        },
        {
          title: "Actualiza tu Nueva Dirección de Correo en Servicios y Suscripciones",
          description:
            "Recuerda que cambiar tu dirección de correo electrónico en una cuenta en línea también significa que debes actualizarla en otros lugares donde la uses. Esto incluye servicios de suscripción, cuentas en redes sociales y cualquier otro lugar donde hayas registrado tu dirección de correo electrónico. De esta manera, te asegurarás de que todos los servicios y notificaciones importantes lleguen a tu nueva dirección sin problemas.",
        },
      ],
    },
    {
      title: "Restablecer Google Authenticator",
      icon: require("../../assets/icons/help4.png"),
      sections: [
        {
          title: "¿Por qué Restablecer Google Authenticator?",
          description:
            "Restablecer Google Authenticator es un proceso necesario en casos de pérdida de acceso a la aplicación o cuando se cambia de dispositivo. Google Authenticator es una herramienta de autenticación de dos factores que agrega una capa adicional de seguridad a tus cuentas en línea. Si pierdes tu teléfono o cambias de dispositivo, es posible que necesites restablecer Google Authenticator para configurarlo en un nuevo dispositivo y asegurar el acceso seguro a tus cuentas.",
        },
        {
          title: "Pasos para Restablecer Google Authenticator",
          description:
            "Restablecer Google Authenticator generalmente implica desvincular la aplicación del dispositivo actual y volver a configurarla en uno nuevo. Los pasos exactos pueden variar según la plataforma o el servicio al que esté vinculado. En general, debes iniciar sesión en tu cuenta, acceder a la configuración de autenticación de dos factores y seleccionar la opción para restablecer o desvincular Google Authenticator. Luego, sigue las instrucciones para volver a configurar la aplicación en tu nuevo dispositivo.",
        },
        {
          title: "Consideraciones Importantes al Restablecer",
          description:
            "Antes de restablecer Google Authenticator, es importante tener en cuenta algunas consideraciones importantes. Asegúrate de tener acceso a tus códigos de respaldo o códigos de recuperación de autenticación de dos factores, si los has guardado previamente. Estos códigos son esenciales para restablecer la autenticación en caso de pérdida de acceso a la aplicación. Además, comunica a las cuentas y servicios a los que está vinculada la autenticación de dos factores que estás realizando un restablecimiento para evitar bloqueos de cuenta no deseados.",
        },
      ],
    },
    {
      title: "Recuperación de activo de depósito no acreditado",
      icon: require("../../assets/icons/help5.png"),
      sections: [
        {
          title: "¿Qué es un Depósito no Acreditado?",
          description:
            "Un depósito no acreditado se refiere a una transacción en la que se ha realizado un pago o depósito, pero el monto correspondiente no se ha reflejado en la cuenta o no se ha procesado correctamente. Esto puede ocurrir en diversas situaciones, como transferencias bancarias, pagos en línea o depósitos en cuentas de inversión. Es importante abordar este problema de manera oportuna para recuperar los activos o fondos que no se han acreditado correctamente.",
        },
        {
          title: "Pasos para la Recuperación de un Depósito no Acreditado",
          description:
            "La recuperación de un depósito no acreditado suele requerir una serie de pasos. En primer lugar, es importante recopilar toda la información relevante, como comprobantes de pago, detalles de la transacción y registros de cuenta. Luego, ponte en contacto con la institución financiera o plataforma involucrada para informar sobre el problema. Proporciona la documentación necesaria y sigue las instrucciones proporcionadas por la entidad para iniciar el proceso de investigación y recuperación.",
        },
        {
          title: "Plazos y Consideraciones Importantes",
          description:
            "Es importante actuar con prontitud cuando se trata de la recuperación de un depósito no acreditado, ya que algunos plazos pueden ser limitados. Además, ten en cuenta que las políticas y procedimientos pueden variar según la entidad financiera o plataforma de pago. Asegúrate de mantener un registro de todas las comunicaciones y transacciones relacionadas con la recuperación y, si es necesario, busca asesoramiento legal o financiero para garantizar una resolución adecuada del problema.",
        },
      ],
    },
    { label: "Preguntas frecuentes" },
    {
      title: "Funciones de la cuenta",
      icon: require("../../assets/icons/faqs1.png"),
      small: true,
      sections: [
        {
          title: "Gestión de Perfil",
          description:
            "Una de las principales funciones de una cuenta en línea es la gestión de perfil. Esto implica actualizar información personal, como nombre, dirección, número de teléfono y dirección de correo electrónico. Mantener tu perfil actualizado es esencial para garantizar que las comunicaciones y la información sean precisas y relevantes.",
        },
        {
          title: "Seguridad y Privacidad",
          description:
            "La seguridad y la privacidad son funciones críticas de una cuenta en línea. Los usuarios pueden configurar opciones de seguridad, como contraseñas fuertes y autenticación de dos factores, para proteger su cuenta contra accesos no autorizados. También pueden gestionar la privacidad de sus datos, controlando quién puede ver su información y cómo se comparte.",
        },
        {
          title: "Historial de Transacciones y Actividades",
          description:
            "Otra función importante es el acceso al historial de transacciones y actividades. Los usuarios pueden revisar y rastrear todas las actividades relacionadas con su cuenta, como compras, transferencias de fondos y registros de inicio de sesión. Esto proporciona una visión detallada de las interacciones pasadas y puede ser útil para fines de seguimiento y seguridad.",
        },
        {
          title: "Depositar/retirar cripto",
          sections: [
            {
              title: "Cómo Depositar Criptomonedas",
              description:
                "Para depositar criptomonedas en tu billetera digital o plataforma de intercambio, primero debes iniciar sesión en tu cuenta. Luego, busca la opción de depósito o depósito de criptomonedas. Se te proporcionará una dirección de billetera única o un código QR al que debes enviar tus fondos desde tu billetera existente. Asegúrate de verificar la dirección con cuidado antes de realizar la transacción para evitar errores.",
            },
            {
              title: "Retirar Criptomonedas de tu Cuenta",
              description:
                "Para retirar criptomonedas de tu cuenta, inicia sesión y busca la opción de retiro o retirada de criptomonedas. Deberás proporcionar la dirección de tu billetera externa donde deseas recibir los fondos. Asegúrate de que la dirección sea correcta, ya que las transacciones de criptomonedas son irreversibles. Luego, sigue las instrucciones para confirmar el retiro y verificar tu identidad, si es necesario.",
            },
            {
              title: "Consideraciones Importantes",
              description:
                "Al depositar y retirar criptomonedas, ten en cuenta que las tarifas de transacción pueden aplicarse dependiendo de la plataforma y la criptomoneda. Además, asegúrate de seguir buenas prácticas de seguridad, como habilitar la autenticación de dos factores y almacenar tus claves privadas de manera segura. Siempre verifica las políticas y límites de depósito y retiro de la plataforma que estás utilizando para evitar problemas.",
            },
          ],
        },
      ],
    },
    {
      title: "Depositar/retirar cripto",
      icon: require("../../assets/icons/faqs2.png"),
      small: true,
      sections: [
        {
          title: "Cómo Depositar Criptomonedas",
          description:
            "Para depositar criptomonedas en tu billetera digital o plataforma de intercambio, primero debes iniciar sesión en tu cuenta. Luego, busca la opción de depósito o depósito de criptomonedas. Se te proporcionará una dirección de billetera única o un código QR al que debes enviar tus fondos desde tu billetera existente. Asegúrate de verificar la dirección con cuidado antes de realizar la transacción para evitar errores.",
        },
        {
          title: "Retirar Criptomonedas de tu Cuenta",
          description:
            "Para retirar criptomonedas de tu cuenta, inicia sesión y busca la opción de retiro o retirada de criptomonedas. Deberás proporcionar la dirección de tu billetera externa donde deseas recibir los fondos. Asegúrate de que la dirección sea correcta, ya que las transacciones de criptomonedas son irreversibles. Luego, sigue las instrucciones para confirmar el retiro y verificar tu identidad, si es necesario.",
        },
        {
          title: "Consideraciones Importantes",
          description:
            "Al depositar y retirar criptomonedas, ten en cuenta que las tarifas de transacción pueden aplicarse dependiendo de la plataforma y la criptomoneda. Además, asegúrate de seguir buenas prácticas de seguridad, como habilitar la autenticación de dos factores y almacenar tus claves privadas de manera segura. Siempre verifica las políticas y límites de depósito y retiro de la plataforma que estás utilizando para evitar problemas.",
        },
      ],
    },
    {
      title: "Escrow",
      icon: require("../../assets/icons/faqs3.png"),
      small: true,
      sections: [
        {
          title: "¿Qué es un Escrow?",
          description:
            "Un Escrow es un acuerdo en el que una tercera parte de confianza, conocida como el agente de escrow, retiene y gestiona los fondos, bienes o documentos relacionados con una transacción hasta que se cumplan ciertas condiciones acordadas por las partes involucradas. El agente de escrow actúa como un intermediario imparcial que garantiza que ambas partes cumplan con sus obligaciones antes de que se libere el activo o el documento.",
        },
        {
          title: "Usos Comunes del Escrow",
          description:
            "El uso más común del escrow es en transacciones financieras, como la compra de bienes raíces. En una transacción inmobiliaria, el dinero del comprador se coloca en una cuenta de escrow y se libera al vendedor una vez que se cumplen las condiciones acordadas, como la aprobación de una inspección. También se utiliza en transacciones comerciales en línea, para garantizar que los compradores reciban los productos o servicios según lo acordado antes de que se liberen los fondos al vendedor.",
        },
        {
          title: "Beneficios del Escrow",
          description:
            "El uso de un servicio de escrow ofrece beneficios tanto a compradores como a vendedores. Proporciona un nivel adicional de seguridad y confianza en las transacciones, reduce el riesgo de fraude y garantiza que ambas partes cumplan con los términos acordados. Además, en situaciones donde las disputas surgen, el agente de escrow puede mediar y resolver conflictos de manera imparcial.",
        },
      ],
    },
    {
      title: "Seguridad",
      icon: require("../../assets/icons/faqs4.png"),
      small: true,
      sections: [
        {
          title: "Importancia de la Seguridad",
          description:
            "La seguridad es un aspecto fundamental en la vida cotidiana y en el mundo digital. Proteger tus datos personales, información financiera y la privacidad en línea es esencial para prevenir fraudes, robos de identidad y otros riesgos. La seguridad también es crucial en entornos físicos, como hogares y lugares de trabajo, para garantizar la seguridad de las personas y los activos.",
        },
        {
          title: "Medidas de Seguridad en Línea",
          description:
            "En el mundo digital, las medidas de seguridad incluyen la creación de contraseñas fuertes, el uso de autenticación de dos factores, la navegación segura por internet y la protección contra malware y virus. Es importante actualizar regularmente el software y aplicar parches de seguridad para mantener los dispositivos protegidos. La educación sobre ciberseguridad es esencial para reconocer y evitar amenazas en línea.",
        },
        {
          title: "Seguridad Física y Prevención de Accidentes",
          description:
            "La seguridad física implica mantener un entorno seguro tanto en el hogar como en el trabajo. Esto incluye la instalación de cerraduras seguras, sistemas de alarma y procedimientos de evacuación en caso de emergencia. La prevención de accidentes es otra faceta importante de la seguridad, como el uso de equipo de protección personal en el trabajo o practicar la seguridad vial en la carretera.",
        },
      ],
    },
    {
      title: "Términos de uso",
      icon: require("../../assets/icons/faqs5.png"),
      small: true,
      sections: [
        {
          title: "¿Qué son los Términos de Uso?",
          description:
            "Los Términos de Uso son un conjunto de reglas y pautas establecidas por una entidad o plataforma en línea que rigen la relación entre el usuario y el proveedor de servicios. Estos términos explican cómo se puede utilizar el servicio, las responsabilidades del usuario, las políticas de privacidad y otros aspectos importantes relacionados con la utilización de la plataforma.",
        },
        {
          title: "Contenido Común en los Términos de Uso",
          description:
            "Los Términos de Uso suelen incluir información sobre la propiedad intelectual, la privacidad, la seguridad de la cuenta, las restricciones de uso, las políticas de contenido, las limitaciones de responsabilidad y el proceso de resolución de disputas. Los usuarios deben leer y comprender estos términos antes de utilizar un servicio en línea, ya que aceptarlos implica el acuerdo con todas las condiciones establecidas.",
        },
        {
          title: "La Importancia de Leer los Términos de Uso",
          description:
            "Leer y entender los Términos de Uso es fundamental antes de utilizar un servicio en línea. Estos términos pueden tener un impacto significativo en tu experiencia en la plataforma, tus derechos y obligaciones. Si tienes alguna pregunta o inquietud sobre los Términos de Uso, es importante ponerse en contacto con el proveedor de servicios para aclarar cualquier duda antes de aceptarlos y utilizar la plataforma.",
        },
      ],
    },
  ]
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["title", "sections.title"],
  }
  const fuse = new Fuse(items, fuseOptions)
  useEffect(() => {
    setResult(fuse.search(search))
  }, [search])
  console.log(result)
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <AutoImage source={require("../../assets/images/logo.png")} style={$logo} />
      <Text preset="h3" style={{ marginTop: 32, marginBottom: 8, marginLeft: 16 }}>
        Busqueda
      </Text>
      <TextField
        inputWrapperStyle={{ height: 40, marginBottom: 16 }}
        style={{ fontSize: 18, marginTop: 0, marginBottom: 0 }}
        placeholder="Escriba lo que necesite saber"
        containerStyle={{ paddingHorizontal: 16 }}
        textAlignVertical="center"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {result?.length
        ? result.map(({ item }, i) => (
            <TouchableOpacity
              key={i}
              style={$item}
              onPress={() => navigation.navigate("HelpSingle", item)}
            >
              <AutoImage source={item.icon} style={$faqImage} />
              <Text preset="h4" style={$itemText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))
        : items.map((item, i) =>
            item?.label ? (
            <Text
            key={i}
                preset="h3"
                style={{
                  marginBottom: spacing.lg,
                  marginTop: spacing.lg, paddingHorizontal: 16
                }}
              >
                {item.label}
              </Text>
            ) : (
              <TouchableOpacity
                key={i}
                style={$item}
                onPress={() => navigation.navigate("HelpSingle", item)}
              >
                <AutoImage source={item.icon} style={item.small ? $faqImage : $itemImage} />
                <Text preset="h4" style={$itemText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ),
          )}
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingBottom: spacing.xxl,
}

const $item: ViewStyle = {
  flexDirection: "row",
  gap: spacing.md,
  paddingHorizontal: spacing.md,
  marginBottom: 8,
  alignItems: "center",
}
const $itemText: TextStyle = { textAlign: "left", maxWidth: "80%" }
const $itemImage: ImageStyle = { width: (width - 300) / 2, height: (width - 300) / 2 }

const $faq: ViewStyle = { width: (width - 80) / 2, alignItems: "center" }
const $faqText: TextStyle = { textAlign: "center", marginTop: spacing.md }
const $faqImage: ImageStyle = { width: 32, height: 32 }

const $cards: ViewStyle = {
  gap: spacing.md,
}

const $title: TextStyle = {
  marginBottom: spacing.md,
  paddingLeft: spacing.lg,
  marginTop: spacing.xl,
}

const $logo: ImageStyle = {
  marginTop: spacing.xxxl,
  width: (width * 140) / 360,
  height: (width * 62) / 360,
  marginLeft: "auto",
  marginRight: "auto",
}

{
  /* <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          paddingHorizontal: spacing.lg,
        }}
      >
        <TouchableOpacity
          style={$item}
          onPress={() =>
            navigation.navigate("HelpSingle", {
              title: "Restablecer contraseña",
              sections: [
                {
                  title: "Importancia de la Seguridad en las Contraseñas",
                  description:
                    "Restablecer una contraseña es una tarea que todos hemos tenido que hacer en algún momento. Sin embargo, es importante recordar que la seguridad de tus contraseñas es fundamental para proteger tus cuentas en línea. El restablecimiento de contraseñas es un último recurso cuando olvidas o sospechas que tu contraseña se ha comprometido. Por eso, es esencial crear contraseñas fuertes desde el principio y utilizar medidas de seguridad adicionales, como la autenticación de dos factores, para mantener tus cuentas seguras.",
                },
                {
                  title: "Tendencias Actuales en el Restablecimiento de Contraseñas",
                  description:
                    "En la era digital actual, el restablecimiento de contraseñas se ha vuelto más eficiente y seguro gracias a las nuevas tendencias y tecnologías. Algunas plataformas ahora ofrecen métodos biométricos, como el reconocimiento facial o las huellas dactilares, para verificar la identidad de los usuarios al restablecer contraseñas. Además, se están implementando procesos de recuperación de cuentas más robustos que reducen la posibilidad de que terceros accedan a tus datos personales. Estas tendencias están diseñadas para hacer que el proceso de restablecimiento de contraseñas sea más seguro y conveniente.",
                },
                {
                  title: "Consejos para Evitar el Restablecimiento Frecuente de Contraseñas",
                  description:
                    "Si te encuentras restableciendo contraseñas con frecuencia, es importante considerar algunas prácticas para evitarlo en el futuro. Primero, asegúrate de almacenar tus contraseñas de manera segura o utilizar un administrador de contraseñas confiable para gestionarlas. Además, evita utilizar información personal predecible, como nombres o fechas de nacimiento, en tus contraseñas. Cambia tus contraseñas de forma regular y utiliza la autenticación de dos factores siempre que esté disponible. Siguiendo estos consejos, puedes reducir la necesidad de restablecer tus contraseñas con frecuencia y mantener tus cuentas más seguras.",
                },
              ],
            })
          }
        >
          <AutoImage source={require("../../assets/icons/help1.png")} style={$itemImage} />
          <Text preset="h4" style={$itemText}>
            Restablecer contraseña
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={$item}
          onPress={() =>
            navigation.navigate("HelpSingle", {
              title: "Desactivar cuenta",
              sections: [
                {
                  title: "Razones para Desactivar tu Cuenta",
                  description:
                    "Desactivar tu cuenta en una plataforma en línea puede ser una decisión importante. Puede haber varias razones para hacerlo, como preocupaciones sobre la privacidad, el deseo de desconectar de las redes sociales o simplemente la necesidad de un descanso digital. Antes de desactivar tu cuenta, es importante comprender por qué lo estás haciendo y si hay alternativas o ajustes de privacidad que puedan satisfacer tus necesidades.",
                },
                {
                  title: "Cómo Desactivar tu Cuenta Paso a Paso",
                  description:
                    "El proceso para desactivar tu cuenta varía según la plataforma en la que estés registrado. En general, debes acceder a la configuración de tu cuenta, buscar la opción de desactivación o eliminación y seguir las instrucciones proporcionadas. A menudo, tendrás la opción de desactivar temporalmente la cuenta o eliminarla de forma permanente. Asegúrate de leer y entender las consecuencias de cada opción antes de tomar una decisión definitiva.",
                },
                {
                  title: "Consideraciones Importantes al Desactivar tu Cuenta",
                  description:
                    "Antes de desactivar tu cuenta, considera las implicaciones que esto puede tener. Por ejemplo, es posible que pierdas el acceso a contenido o contactos que hayas almacenado en la plataforma. Además, algunas plataformas tienen períodos de espera antes de que la cuenta se desactive por completo. También es importante recordar que, en algunos casos, es posible que no puedas recuperar tu cuenta una vez que la hayas desactivado o eliminado. Asegúrate de tomar una decisión informada y respaldar cualquier información importante antes de proceder.",
                },
              ],
            })
          }
        >
          <AutoImage source={require("../../assets/icons/help2.png")} style={$itemImage} />
          <Text preset="h4" style={$itemText}>
            Desactivar cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={$item}
          onPress={() =>
            navigation.navigate("HelpSingle", {
              title: "Cambiar correo electrónico",
              sections: [
                {
                  title: "Pasos para Cambiar tu Correo Electrónico",
                  description:
                    "Cambiar tu dirección de correo electrónico asociada a una cuenta en línea es un proceso que puede variar según la plataforma. En general, debes iniciar sesión en tu cuenta, acceder a la configuración o perfil de tu cuenta, y buscar la opción para cambiar la dirección de correo electrónico. A menudo, se te pedirá que ingreses la nueva dirección de correo electrónico y confirmes la contraseña de tu cuenta para verificar la identidad. Asegúrate de seguir cuidadosamente las instrucciones proporcionadas por la plataforma para completar el proceso.",
                },
                {
                  title: "Informa a tus Contactos sobre el Cambio",
                  description:
                    "Una vez que hayas cambiado tu dirección de correo electrónico, es importante informar a tus contactos sobre este cambio. Esto asegurará que sigas recibiendo correos importantes y evites la pérdida de comunicación con amigos, familiares o colegas. Asegúrate de notificar a las personas clave sobre tu nueva dirección de correo electrónico y considera configurar una respuesta automática en tu antigua dirección para redirigir los correos entrantes hacia la nueva.",
                },
                {
                  title: "Actualiza tu Nueva Dirección de Correo en Servicios y Suscripciones",
                  description:
                    "Recuerda que cambiar tu dirección de correo electrónico en una cuenta en línea también significa que debes actualizarla en otros lugares donde la uses. Esto incluye servicios de suscripción, cuentas en redes sociales y cualquier otro lugar donde hayas registrado tu dirección de correo electrónico. De esta manera, te asegurarás de que todos los servicios y notificaciones importantes lleguen a tu nueva dirección sin problemas.",
                },
              ],
            })
          }
        >
          <AutoImage source={require("../../assets/icons/help3.png")} style={$itemImage} />
          <Text preset="h4" style={$itemText}>
            Cambiar correo electrónico
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={$item}
          onPress={() =>
            navigation.navigate("HelpSingle", {
              title: "Restablecer Google Authenticator",
              sections: [
                {
                  title: "¿Por qué Restablecer Google Authenticator?",
                  description:
                    "Restablecer Google Authenticator es un proceso necesario en casos de pérdida de acceso a la aplicación o cuando se cambia de dispositivo. Google Authenticator es una herramienta de autenticación de dos factores que agrega una capa adicional de seguridad a tus cuentas en línea. Si pierdes tu teléfono o cambias de dispositivo, es posible que necesites restablecer Google Authenticator para configurarlo en un nuevo dispositivo y asegurar el acceso seguro a tus cuentas.",
                },
                {
                  title: "Pasos para Restablecer Google Authenticator",
                  description:
                    "Restablecer Google Authenticator generalmente implica desvincular la aplicación del dispositivo actual y volver a configurarla en uno nuevo. Los pasos exactos pueden variar según la plataforma o el servicio al que esté vinculado. En general, debes iniciar sesión en tu cuenta, acceder a la configuración de autenticación de dos factores y seleccionar la opción para restablecer o desvincular Google Authenticator. Luego, sigue las instrucciones para volver a configurar la aplicación en tu nuevo dispositivo.",
                },
                {
                  title: "Consideraciones Importantes al Restablecer",
                  description:
                    "Antes de restablecer Google Authenticator, es importante tener en cuenta algunas consideraciones importantes. Asegúrate de tener acceso a tus códigos de respaldo o códigos de recuperación de autenticación de dos factores, si los has guardado previamente. Estos códigos son esenciales para restablecer la autenticación en caso de pérdida de acceso a la aplicación. Además, comunica a las cuentas y servicios a los que está vinculada la autenticación de dos factores que estás realizando un restablecimiento para evitar bloqueos de cuenta no deseados.",
                },
              ],
            })
          }
        >
          <AutoImage source={require("../../assets/icons/help4.png")} style={$itemImage} />
          <Text preset="h4" style={$itemText}>
            Restablecer Google Authenticator
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={$item}
          onPress={() =>
            navigation.navigate("HelpSingle", {
              title: "Recuperación de activo de depósito no acreditado",
              sections: [
                {
                  title: "¿Qué es un Depósito no Acreditado?",
                  description:
                    "Un depósito no acreditado se refiere a una transacción en la que se ha realizado un pago o depósito, pero el monto correspondiente no se ha reflejado en la cuenta o no se ha procesado correctamente. Esto puede ocurrir en diversas situaciones, como transferencias bancarias, pagos en línea o depósitos en cuentas de inversión. Es importante abordar este problema de manera oportuna para recuperar los activos o fondos que no se han acreditado correctamente.",
                },
                {
                  title: "Pasos para la Recuperación de un Depósito no Acreditado",
                  description:
                    "La recuperación de un depósito no acreditado suele requerir una serie de pasos. En primer lugar, es importante recopilar toda la información relevante, como comprobantes de pago, detalles de la transacción y registros de cuenta. Luego, ponte en contacto con la institución financiera o plataforma involucrada para informar sobre el problema. Proporciona la documentación necesaria y sigue las instrucciones proporcionadas por la entidad para iniciar el proceso de investigación y recuperación.",
                },
                {
                  title: "Plazos y Consideraciones Importantes",
                  description:
                    "Es importante actuar con prontitud cuando se trata de la recuperación de un depósito no acreditado, ya que algunos plazos pueden ser limitados. Además, ten en cuenta que las políticas y procedimientos pueden variar según la entidad financiera o plataforma de pago. Asegúrate de mantener un registro de todas las comunicaciones y transacciones relacionadas con la recuperación y, si es necesario, busca asesoramiento legal o financiero para garantizar una resolución adecuada del problema.",
                },
              ],
            })
          }
        >
          <AutoImage source={require("../../assets/icons/help5.png")} style={$itemImage} />
          <Text preset="h4" style={$itemText}>
            Recuperación de activo de depósito no acreditado
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          preset="h3"
          style={{ marginTop: spacing.lg, marginBottom: spacing.md, paddingHorizontal: spacing.md }}
        >
          Preguntas frecuentes
        </Text>

        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 16 }}
            onPress={() =>
              navigation.navigate("HelpSingle", {
                title: "Funciones de la cuenta",
                sections: [
                  {
                    title: "Gestión de Perfil",
                    description:
                      "Una de las principales funciones de una cuenta en línea es la gestión de perfil. Esto implica actualizar información personal, como nombre, dirección, número de teléfono y dirección de correo electrónico. Mantener tu perfil actualizado es esencial para garantizar que las comunicaciones y la información sean precisas y relevantes.",
                  },
                  {
                    title: "Seguridad y Privacidad",
                    description:
                      "La seguridad y la privacidad son funciones críticas de una cuenta en línea. Los usuarios pueden configurar opciones de seguridad, como contraseñas fuertes y autenticación de dos factores, para proteger su cuenta contra accesos no autorizados. También pueden gestionar la privacidad de sus datos, controlando quién puede ver su información y cómo se comparte.",
                  },
                  {
                    title: "Historial de Transacciones y Actividades",
                    description:
                      "Otra función importante es el acceso al historial de transacciones y actividades. Los usuarios pueden revisar y rastrear todas las actividades relacionadas con su cuenta, como compras, transferencias de fondos y registros de inicio de sesión. Esto proporciona una visión detallada de las interacciones pasadas y puede ser útil para fines de seguimiento y seguridad.",
                  },
                ],
              })
            }
          >
            <AutoImage source={require("../../assets/icons/faqs1.png")} style={$faqImage} />
            <Text preset="h4">Funciones de la cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 16 }}
            onPress={() =>
              navigation.navigate("HelpSingle", {
                title: "Depositar/retirar cripto",
                sections: [
                  {
                    title: "Cómo Depositar Criptomonedas",
                    description:
                      "Para depositar criptomonedas en tu billetera digital o plataforma de intercambio, primero debes iniciar sesión en tu cuenta. Luego, busca la opción de depósito o depósito de criptomonedas. Se te proporcionará una dirección de billetera única o un código QR al que debes enviar tus fondos desde tu billetera existente. Asegúrate de verificar la dirección con cuidado antes de realizar la transacción para evitar errores.",
                  },
                  {
                    title: "Retirar Criptomonedas de tu Cuenta",
                    description:
                      "Para retirar criptomonedas de tu cuenta, inicia sesión y busca la opción de retiro o retirada de criptomonedas. Deberás proporcionar la dirección de tu billetera externa donde deseas recibir los fondos. Asegúrate de que la dirección sea correcta, ya que las transacciones de criptomonedas son irreversibles. Luego, sigue las instrucciones para confirmar el retiro y verificar tu identidad, si es necesario.",
                  },
                  {
                    title: "Consideraciones Importantes",
                    description:
                      "Al depositar y retirar criptomonedas, ten en cuenta que las tarifas de transacción pueden aplicarse dependiendo de la plataforma y la criptomoneda. Además, asegúrate de seguir buenas prácticas de seguridad, como habilitar la autenticación de dos factores y almacenar tus claves privadas de manera segura. Siempre verifica las políticas y límites de depósito y retiro de la plataforma que estás utilizando para evitar problemas.",
                  },
                ],
              })
            }
          >
            <AutoImage source={require("../../assets/icons/faqs2.png")} style={$faqImage} />
            <Text preset="h4">Depositar/retirar cripto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 16 }}
            onPress={() =>
              navigation.navigate("HelpSingle", {
                title: "Escrow",
                sections: [
                  {
                    title: "¿Qué es un Escrow?",
                    description:
                      "Un Escrow es un acuerdo en el que una tercera parte de confianza, conocida como el agente de escrow, retiene y gestiona los fondos, bienes o documentos relacionados con una transacción hasta que se cumplan ciertas condiciones acordadas por las partes involucradas. El agente de escrow actúa como un intermediario imparcial que garantiza que ambas partes cumplan con sus obligaciones antes de que se libere el activo o el documento.",
                  },
                  {
                    title: "Usos Comunes del Escrow",
                    description:
                      "El uso más común del escrow es en transacciones financieras, como la compra de bienes raíces. En una transacción inmobiliaria, el dinero del comprador se coloca en una cuenta de escrow y se libera al vendedor una vez que se cumplen las condiciones acordadas, como la aprobación de una inspección. También se utiliza en transacciones comerciales en línea, para garantizar que los compradores reciban los productos o servicios según lo acordado antes de que se liberen los fondos al vendedor.",
                  },
                  {
                    title: "Beneficios del Escrow",
                    description:
                      "El uso de un servicio de escrow ofrece beneficios tanto a compradores como a vendedores. Proporciona un nivel adicional de seguridad y confianza en las transacciones, reduce el riesgo de fraude y garantiza que ambas partes cumplan con los términos acordados. Además, en situaciones donde las disputas surgen, el agente de escrow puede mediar y resolver conflictos de manera imparcial.",
                  },
                ],
              })
            }
          >
            <AutoImage source={require("../../assets/icons/faqs3.png")} style={$faqImage} />
            <Text preset="h4">Escrow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 16 }}
            onPress={() =>
              navigation.navigate("HelpSingle", {
                title: "Seguridad",
                sections: [
                  {
                    title: "Importancia de la Seguridad",
                    description:
                      "La seguridad es un aspecto fundamental en la vida cotidiana y en el mundo digital. Proteger tus datos personales, información financiera y la privacidad en línea es esencial para prevenir fraudes, robos de identidad y otros riesgos. La seguridad también es crucial en entornos físicos, como hogares y lugares de trabajo, para garantizar la seguridad de las personas y los activos.",
                  },
                  {
                    title: "Medidas de Seguridad en Línea",
                    description:
                      "En el mundo digital, las medidas de seguridad incluyen la creación de contraseñas fuertes, el uso de autenticación de dos factores, la navegación segura por internet y la protección contra malware y virus. Es importante actualizar regularmente el software y aplicar parches de seguridad para mantener los dispositivos protegidos. La educación sobre ciberseguridad es esencial para reconocer y evitar amenazas en línea.",
                  },
                  {
                    title: "Seguridad Física y Prevención de Accidentes",
                    description:
                      "La seguridad física implica mantener un entorno seguro tanto en el hogar como en el trabajo. Esto incluye la instalación de cerraduras seguras, sistemas de alarma y procedimientos de evacuación en caso de emergencia. La prevención de accidentes es otra faceta importante de la seguridad, como el uso de equipo de protección personal en el trabajo o practicar la seguridad vial en la carretera.",
                  },
                ],
              })
            }
          >
            <AutoImage source={require("../../assets/icons/faqs4.png")} style={$faqImage} />
            <Text preset="h4">Seguridad</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 16 }}
            onPress={() =>
              navigation.navigate("HelpSingle", {
                title: "Términos de uso",
                sections: [
                  {
                    title: "¿Qué son los Términos de Uso?",
                    description:
                      "Los Términos de Uso son un conjunto de reglas y pautas establecidas por una entidad o plataforma en línea que rigen la relación entre el usuario y el proveedor de servicios. Estos términos explican cómo se puede utilizar el servicio, las responsabilidades del usuario, las políticas de privacidad y otros aspectos importantes relacionados con la utilización de la plataforma.",
                  },
                  {
                    title: "Contenido Común en los Términos de Uso",
                    description:
                      "Los Términos de Uso suelen incluir información sobre la propiedad intelectual, la privacidad, la seguridad de la cuenta, las restricciones de uso, las políticas de contenido, las limitaciones de responsabilidad y el proceso de resolución de disputas. Los usuarios deben leer y comprender estos términos antes de utilizar un servicio en línea, ya que aceptarlos implica el acuerdo con todas las condiciones establecidas.",
                  },
                  {
                    title: "La Importancia de Leer los Términos de Uso",
                    description:
                      "Leer y entender los Términos de Uso es fundamental antes de utilizar un servicio en línea. Estos términos pueden tener un impacto significativo en tu experiencia en la plataforma, tus derechos y obligaciones. Si tienes alguna pregunta o inquietud sobre los Términos de Uso, es importante ponerse en contacto con el proveedor de servicios para aclarar cualquier duda antes de aceptarlos y utilizar la plataforma.",
                  },
                ],
              })
            }
          >
            <AutoImage source={require("../../assets/icons/faqs5.png")} style={$faqImage} />
            <Text preset="h4">Términos de uso</Text>
          </TouchableOpacity>
        </View>
      </View> */
}
