# Configuration UPS pour les frais de livraison

## Étapes de configuration

### 1. Création d'un compte développeur UPS

1. Allez sur https://developer.ups.com/
2. Créez un compte développeur
3. Créez une nouvelle application
4. Obtenez vos identifiants : `Client ID` et `Client Secret`
5. Notez votre numéro de compte UPS

### 2. Variables d'environnement à ajouter

Ajoutez ces variables à votre fichier `.env.local` :

```bash
# Configuration UPS
UPS_CLIENT_ID=your_ups_client_id
UPS_CLIENT_SECRET=your_ups_client_secret
UPS_ACCOUNT_NUMBER=your_ups_account_number

# Adresse de l'expéditeur (votre entreprise)
UPS_SHIPPER_ADDRESS_LINE1=123 Rue de votre entreprise
UPS_SHIPPER_CITY=Paris
UPS_SHIPPER_STATE=IDF
UPS_SHIPPER_POSTAL_CODE=75001
UPS_SHIPPER_COUNTRY=FR
```

### 3. Test de la configuration

Pour tester si la configuration fonctionne :

1. Ajoutez un article physique au panier
2. Allez sur la page checkout
3. Saisissez une adresse de livraison valide
4. Vérifiez que les options de livraison UPS s'affichent

### 4. Environnement de test vs Production

- **Test** : Utilisez `https://wwwcie.ups.com/api` (Customer Integration Environment)
- **Production** : Utilisez `https://onlinetools.ups.com/api`

Le code basculera automatiquement selon `NODE_ENV`.

### 5. Services UPS supportés

- UPS Standard (11)
- UPS Expedited (08)
- UPS Worldwide Express Plus (54)
- UPS Worldwide Express (07)
- UPS Worldwide Express Saver (65)

### 6. Problèmes courants

**Erreur d'authentification :**

- Vérifiez vos `CLIENT_ID` et `CLIENT_SECRET`
- Assurez-vous que votre application UPS est activée

**Aucun tarif retourné :**

- Vérifiez l'adresse de l'expéditeur (votre entreprise)
- Vérifiez que les dimensions et poids des œuvres sont corrects
- Vérifiez l'adresse de destination

**Erreur de calcul :**

- Vérifiez que votre compte UPS a accès aux API Rating
- Vérifiez les logs pour plus de détails

### 7. Données requises pour chaque œuvre

Dans votre base de données, assurez-vous que chaque `PhysicalItem` a :

- `weight` (en kg)
- `height` (en cm)
- `width` (en cm)

Si ces données manquent, des valeurs par défaut seront utilisées :

- Poids : 1 kg
- Dimensions : 30x30x5 cm
