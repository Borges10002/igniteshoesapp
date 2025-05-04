# Projeto React Native TypeScript com Push Notifications (Expo)

Este projeto é um template para um aplicativo React Native desenvolvido com TypeScript e Expo, integrado com o serviço de push notifications OneSignal. Ele também utiliza o `expo-dev-client` para facilitar o desenvolvimento com funcionalidades nativas.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn**
- **Expo CLI:** `npm install -g expo-cli` ou `yarn global add expo-cli`
- **Expo Go** (em seu dispositivo físico ou emulador) ou um emulador/simulador Android/iOS configurado.

## Configuração do Projeto

1.  **Crie um novo projeto Expo com TypeScript:**

    ```bash
    npx create-expo-app MeuProjeto --template react-native-template-typescript
    cd MeuProjeto
    ```

2.  **Instale as dependências necessárias:**

    ```bash
    npx expo install onesignal-expo-plugin@2.0.2
    npm install react-native-onesignal@5.0.5
    npx expo install expo-dev-client
    ```

3.  **Configure o plugin do OneSignal para Expo:**

    Edite o arquivo `app.json` (ou `app.config.js`) para adicionar o plugin do OneSignal. Certifique-se de substituir `YOUR_ONESIGNAL_APP_ID` pelo ID do seu aplicativo OneSignal.

    ```json
    {
      "expo": {
        // ... outras configurações
        "plugins": [
          [
            "onesignal-expo-plugin",
            {
              "app_id": "YOUR_ONESIGNAL_APP_ID",
              "googleProjectNumber": "YOUR_GOOGLE_PROJECT_NUMBER" // Opcional, necessário para Android Standalone Builds
            }
          ]
        ]
        // ... outras configurações
      }
    }
    ```

    **Observações:**

    - Você precisará criar uma conta e um aplicativo no [OneSignal](https://onesignal.com/) para obter o `YOUR_ONESIGNAL_APP_ID`.
    - `YOUR_GOOGLE_PROJECT_NUMBER` é opcional, mas necessário para builds Android standalone para receber notificações. Você pode encontrá-lo nas configurações do seu projeto Firebase.

4.  **Configure o OneSignal no seu código React Native:**

    No seu componente principal (por exemplo, `App.tsx`), importe e inicialize o OneSignal:

    ```typescript jsx
    import React, { useEffect } from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import OneSignal from 'react-native-onesignal';

    const App: React.FC = () => {
      useEffect(() => {
        // Configuração do OneSignal
        OneSignal.setAppId("YOUR_ONESIGNAL_APP_ID");

        // Solicitar permissão para notificações (iOS)
        OneSignal.promptForPushNotificationsWithUserResponse();

        // Manipuladores de eventos para notificações
        OneSignal.setNotificationWillShowInForegroundHandler(notification => {
          console.log("Notificação recebida em foreground:", notification);
          notification.complete('visual");
        });

        OneSignal.setNotificationOpenedHandler(notification => {
          console.log("Notificação aberta:", notification);
          // Navegar para a tela apropriada, etc.
        });

        OneSignal.setSubscriptionChangeListener(subscription => {
          console.log("Status da assinatura de push:", subscription);
          // Salvar o ID do usuário do OneSignal no seu backend, se necessário
        });
      }, []);

      return (
        <View style={styles.container}>
          <Text>Bem-vindo ao seu aplicativo com Push Notifications!</Text>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    export default App;
    ```

    Substitua `"YOUR_ONESIGNAL_APP_ID"` pelo ID do seu aplicativo OneSignal.

## Executando o Aplicativo com `expo-dev-client`

O `expo-dev-client` permite testar funcionalidades nativas como push notifications diretamente no seu dispositivo de desenvolvimento.

1.  **Construa o `expo-dev-client`:**

    ```bash
    npx expo build:ios -t simulator # Para iOS Simulator
    npx expo build:android -t apk     # Para Android (gera um APK para instalar no dispositivo/emulador)
    ```

    Ou para construir para o seu dispositivo conectado:

    ```bash
    npx expo build:ios -t device
    npx expo build:android -t app-bundle
    ```

    Siga as instruções na tela para completar a construção. Isso pode levar algum tempo.

2.  **Inicie o servidor de desenvolvimento com o `expo-dev-client`:**

    ```bash
    npx expo start --dev-client
    ```

3.  **Execute o aplicativo no seu dispositivo/emulador:**

    - **iOS:** Abra o arquivo `.app` construído no seu simulador ou siga as instruções para instalar no seu dispositivo físico.
    - **Android:** Instale o APK construído no seu emulador ou dispositivo físico.

    O aplicativo deverá se conectar ao servidor de desenvolvimento.

## Testando Push Notifications

1.  **Obtenha o ID do usuário do OneSignal:**

    Quando o aplicativo for executado no seu dispositivo/emulador e a configuração do OneSignal for bem-sucedida, um ID de usuário será gerado para o seu dispositivo. Você pode ver esse ID nos logs do console (geralmente na função `setSubscriptionChangeListener`).

2.  **Envie uma notificação de teste:**

    Acesse o painel do seu aplicativo no [OneSignal](https://onesignal.com/). Vá para a seção "Messages" e clique em "New Push". Você pode segmentar a notificação para um usuário específico inserindo o ID do usuário obtido no passo anterior.

3.  **Verifique a notificação:**

    Você deverá receber a notificação no seu dispositivo/emulador. Verifique se os manipuladores de eventos (`setNotificationWillShowInForegroundHandler` e `setNotificationOpenedHandler`) estão funcionando conforme o esperado.

## Notas Adicionais

- Para builds standalone (aplicativos que você distribui nas lojas), você precisará configurar as chaves de API do Firebase (para Android) e os certificados APNs (para iOS) no painel do OneSignal.
- Consulte a documentação oficial do OneSignal para React Native Expo para obter informações mais detalhadas e configurações avançadas: [https://documentation.onesignal.com/docs/react-native-expo-sdk-setup](https://documentation.onesignal.com/docs/react-native-expo-sdk-setup)
- A documentação do `expo-dev-client` pode ser encontrada aqui: [https://docs.expo.dev/versions/latest/sdk/dev-client/](https://docs.expo.dev/versions/latest/sdk/dev-client/)

Este README fornece um guia básico para configurar um projeto React Native TypeScript com push notifications usando Expo e OneSignal, juntamente com o `expo-dev-client` para um melhor fluxo de desenvolvimento. Adapte e expanda este guia conforme as necessidades específicas do seu projeto.
