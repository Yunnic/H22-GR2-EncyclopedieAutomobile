# Encyclopédie Automobile - Une application mobile à propos des automobiles
Le but de cette application est d'aider les gens à apprendre davantages sur les automobiles sans devoir naviguer sur plusieurs différents sites.

L'application utilise React Native comme framework.

Ceci est un projet d'intégration en Informatique pour le Collège de Bois-De-Boulogne.


## Auteurs :
- ##### Yannick Lafontaine ([Yunnic](https://github.com/Yunnic))
- ##### Maxime Rainville ([MaXijo264](https://github.com/MaXijo264))
- ##### Severyn Tynkalyuk ([Sever2412](https://github.com/Sever2412))

## Installation de l'application.
Il y a deux façons d'installer l'application.

## Installer l'application avec le fichier .apk ou .ipa sur votre téléphone ou émulateur.
#### (Les fichiers ne sont pas disponibles pour l'instant.)
Ceci est la façon attendue d'installer l'application.
Pour installer l'application, vous avez seulement besoin d'exécuter le fichier sur votre appareil.

## Installer l'application avec les fichiers qui se retrouvent sur la page GitHub.
Ceci est la façon que vous devrez utilisez si vous pensez modifier l'application.

Voici les étapes :
#### 1. Installer [Node.js](https://nodejs.org/en/download/).
#### 2. Ouvrir cmd.exe sur votre ordinateur Windows (ou l'équivalent sur l'OS utilisé)
#### 3. Écrire `npm install -g expo-cli` pour installer Expo CLI.
#### 4. Installer les fichiers qui sont sur GitHub et indiquer le chemin des fichiers avec la commande "cd".
Par exemple : `cd C:\Program Files\Test\JePensesQueVousComprenezMaintenant`

Si vous devez changer de disque, écrivez simplement sa lettre suivie de ":".
Par exemple : `E:`
#### 5. Installer les dépendances.
Voici ceux que nous avons utilisé pour l'instant :
#### NOTE: Si les commandes avec expo ne fonctionnent pas, réessayez la commande `npm install expo-cli` avec le chemin contenant les fichiers venant de GitHub.
`expo install @react-native-async-storage/async-storage`

`expo install expo-linear-gradient`

`expo install expo-screen-orientation`

`npm install @react-navigation/native`

`npm install @react-navigation/native-stack`

`npm install @react-navigation/drawer`

`npm install @react-navigation/bottom-tabs`

`npm install react-native-table-component`

#### 6. Écrire `expo start`. Ceci va commencer un serveur LAN. Si l'écran affiche plusieurs options pour continuer, l'installation du projet fonctionne.

## Tester l'application avec Expo.

### Une fois que vous avez fait tous les étapes pour installer le projet avec les fichiers sur la page GitHub, il y a trois façons de tester.

#### 1. Tester avec votre téléphone.
Pour faire cela, vous devez installer l'application Expo Go sur votre téléphone.
Sur Android, vous devez scanner le QR code avec l'application.
Sur IOS, vous devez scanner le QR code avec la caméra.
#### NOTE: Votre téléphone doit être connecté au même réseau internet que l'ordinateur.
#### 2. Tester avec un émulateur
Nous n'avions pas utilisé cette option pour le moment, mais nous pensons que c'est une très bonne option en cas qu'il n'y a pas d'internet.
#### 3. Tester avec un navigateur Internet.
Si possible, évitez de tester avec le navigateur Internet, car cette méthode cause souvent des problèmes qui n'existent pas dans la version mobile.
