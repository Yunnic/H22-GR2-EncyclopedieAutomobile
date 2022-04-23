# Encyclopédie Automobile - Une application mobile à propos des automobiles
Le but de cette application est d'aider les gens à apprendre davantages sur les automobiles sans devoir naviguer sur plusieurs différents sites.

L'application utilise React Native comme framework.

Ceci est un projet d'intégration en Informatique pour le Collège de Bois-De-Boulogne.


## Auteurs :
- ##### Yannick Lafontaine ([Yunnic](https://github.com/Yunnic))
- ##### Maxime Rainville ([MaXijo264](https://github.com/MaXijo264))
- ##### Severyn Tynkalyuk ([NuclearToilet2022](https://github.com/NuclearToilet2022))

## Installation du projet :
####Il y a deux façons différentes d'installer le projet
* ##### Installer le fichier .apk ou .ipa sur votre téléphone ou émulateur.
	(Les fichiers ne sont pas disponibles pour l'instant.)
	Ceci est la façon attendue d'installer l'application.
	Pour installer l'application, vous avez seulement besoin d'exécuter le fichier sur votre appareil.

* ##### Installer les fichiers qui se retrouvent sur la page GitHub.
	Ceci est la façon que vous devrez utilisez si vous pensez modifier l'application.
	
	Voici les étapes :
 ######1. Installer [Node.js](https://nodejs.org/en/download/).
######2. Ouvrir cmd.exe sur votre ordinateur Windows (ou l'équivalent sur l'OS utilisé)
######3. Écrire le chemin de l'endroit que vous voulez installer avec la commande "cd".
	 Par exemple : `cd C:\Program Files\Test\JePensesQueVousComprenezMaintenant`
	
	Si vous devez changez de disque, écrivez simplement sa lettre suivi de ":".
	Par exemple : `E:`
 ######4. Écrire `npm install -g expo-cli` pour installer Expo CLI.
######5. Installer les fichiers qui sont sur GitHub et indiquer le chemin des fichiers avec la commande cd.
 ######6. Installer les dépendances.
	Voici ceux que nous avons utilisé pour l'instant :
	`expo install expo-screen-orientation`
	`npm install @react-navigation/native`
	`npm install @react-navigation/native-stack`
	`npm install @react-navigation/drawer`
	`npm install @react-navigation/bottom-tabs`
	Si la commande avec expo ne fonctionne pas, réessayez la commande `npm install expo-cli` avec ce chemin.
	###### 7. Écrire `expo start`. Ceci va commencer un serveur LAN. Si vous êtes offert plusieurs options pour continuer et un QR code, l'installation du projet fonctionne.

 #####Une fois que vous avez fait tous ces étapes, il y a trois façons de tester.
 
 ######1. Tester avec votre téléphone.
 	Pour faire cela, vous devez installer l'application Expo Go sur votre téléphone.
	Sur Android, vous devez scanner le QR code avec l'application.
	Sur IOS, vous devez scanner le QR code avec l'application qui prend des photos.
	#####NOTE: Votre téléphone doit être connecté au même réseau internet que l'ordinateur.
######2. Tester avec un émulateur
Nous n'avions pas utilisé cette option pour le moment, mais nous pensons que c'est une très bonne option en cas qu'il n'y a pas d'internet.
######3. Tester avec un navigateur Internet.
Si possible, évitez de tester avec le navigateur Internet, car cette méthode cause souvent des problèmes qui n'existe pas dans les deux autres.
